import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy * 2.0, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uRes;

  // Simplex-style hash noise (cheap)
  vec3 hash3(vec2 p) {
    vec3 q = vec3(dot(p, vec2(127.1, 311.7)),
                  dot(p, vec2(269.5, 183.3)),
                  dot(p, vec2(419.2, 371.9)));
    return fract(sin(q) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash3(i + vec2(0.0, 0.0)).x;
    float b = hash3(i + vec2(1.0, 0.0)).x;
    float c = hash3(i + vec2(0.0, 1.0)).x;
    float d = hash3(i + vec2(1.0, 1.0)).x;
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= uRes.x / uRes.y;

    vec2 m = uMouse * 2.0 - 1.0;
    m.x *= uRes.x / uRes.y;
    float md = length(p - m * 0.6);

    float t = uTime * 0.06;
    vec2 q = vec2(
      fbm(p * 1.2 + t),
      fbm(p * 1.2 - t + 3.7)
    );
    float n = fbm(p * 1.4 + q * 1.8 + t);

    // Color palette: deep ink → violet → hot pink, with mouse halo
    vec3 col1 = vec3(0.024, 0.024, 0.039);  // ink
    vec3 col2 = vec3(0.486, 0.361, 1.000);  // accent violet
    vec3 col3 = vec3(1.000, 0.302, 0.427);  // accent hot
    vec3 col4 = vec3(0.498, 0.906, 1.000);  // ice

    vec3 col = mix(col1, col2, smoothstep(0.2, 0.85, n));
    col = mix(col, col3, smoothstep(0.55, 0.95, n) * 0.65);
    col += col4 * 0.18 * smoothstep(0.4, 0.0, md);

    // Subtle vertical gradient
    col *= mix(0.55, 1.05, uv.y);

    // Vignette
    float vig = smoothstep(1.4, 0.4, length(p));
    col *= mix(0.55, 1.0, vig);

    // Grain
    float g = hash3(uv * uRes + uTime).x;
    col += (g - 0.5) * 0.04;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function ShaderQuad() {
  const ref = useRef();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uRes: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
    }),
    []
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    const { x, y } = state.pointer;
    uniforms.uMouse.value.set((x + 1) / 2, (y + 1) / 2);
    uniforms.uRes.value.set(state.size.width, state.size.height);
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
      />
    </mesh>
  );
}

export default function HeroShader() {
  const wrapRef = useRef(null);
  const [visible, setVisible] = useState(true);

  // Pause the canvas (frameloop="never") when the hero is fully off-screen.
  // The shader is the heaviest GPU job in the page; running it while the
  // user is in the Experience section starves that scroll of compositor time.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        orthographic
        dpr={[1, 1.6]}
        frameloop={visible ? 'always' : 'never'}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 1], zoom: 1 }}
        className="!absolute inset-0"
      >
        <ShaderQuad />
      </Canvas>
    </div>
  );
}
