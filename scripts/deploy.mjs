import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const TOKEN = process.env.VERCEL_TOKEN;
const TEAM = process.env.VERCEL_TEAM_ID;
const NAME = process.env.VERCEL_PROJECT_NAME || 'noel-portfolio';
const DIST = path.resolve(process.cwd(), 'dist');

if (!TOKEN || !TEAM) {
  console.error('Missing VERCEL_TOKEN or VERCEL_TEAM_ID');
  process.exit(1);
}
if (!fs.existsSync(DIST)) {
  console.error('No dist/ directory. Run `npm run build` first.');
  process.exit(1);
}

function walk(dir, root = dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, root, out);
    else out.push({ full, rel: path.relative(root, full) });
  }
  return out;
}

const items = walk(DIST).map(({ full, rel }) => {
  const buf = fs.readFileSync(full);
  const sha = crypto.createHash('sha1').update(buf).digest('hex');
  return {
    file: rel.split(path.sep).join('/'),
    sha,
    size: buf.length,
    buf,
  };
});

console.log(`Uploading ${items.length} files (${(items.reduce((a, f) => a + f.size, 0) / 1024).toFixed(1)} KB)…`);

async function uploadOne(f, attempt = 1) {
  try {
    const r = await fetch(`https://api.vercel.com/v2/files?teamId=${TEAM}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/octet-stream',
        'Content-Length': String(f.size),
        'x-vercel-digest': f.sha,
      },
      body: f.buf,
    });
    if (!r.ok) {
      const t = await r.text();
      throw new Error(`upload ${f.file}: ${r.status} ${t}`);
    }
  } catch (err) {
    if (attempt >= 5) throw err;
    const delay = 600 * Math.pow(2, attempt - 1);
    console.log(`  retry ${attempt} for ${f.file} in ${delay}ms (${err.message || err.code})`);
    await new Promise((r) => setTimeout(r, delay));
    return uploadOne(f, attempt + 1);
  }
}

// upload in parallel chunks
const chunkSize = 6;
for (let i = 0; i < items.length; i += chunkSize) {
  const slice = items.slice(i, i + chunkSize);
  await Promise.all(slice.map(uploadOne));
  process.stdout.write(`  ${Math.min(i + chunkSize, items.length)}/${items.length}\n`);
}

console.log('Creating deployment…');

const body = {
  name: NAME,
  target: 'production',
  files: items.map(({ file, sha, size }) => ({ file, sha, size })),
  projectSettings: {
    framework: null,
    devCommand: null,
    installCommand: null,
    buildCommand: null,
    outputDirectory: null,
  },
};

const r = await fetch(`https://api.vercel.com/v13/deployments?teamId=${TEAM}&forceNew=1`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

const j = await r.json();
if (!r.ok) {
  console.error('Deployment failed:', r.status, JSON.stringify(j, null, 2));
  process.exit(1);
}

console.log('\n✓ Deployment created');
console.log('  id        :', j.id);
console.log('  url       : https://' + j.url);
if (j.alias && j.alias.length) {
  console.log('  aliases   :');
  for (const a of j.alias) console.log('              https://' + a);
}
console.log('  inspector :', j.inspectorUrl);
console.log('  state     :', j.readyState);
