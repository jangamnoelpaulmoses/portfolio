// All developer content sourced from the existing React portfolio + LinkedIn.
// Verbatim where possible.

export const profile = {
  name: 'Noel Paul Moses Jangam',
  shortName: 'Noel Paul',
  role: 'AI Software Engineer',
  tagline:
    'AI Software Engineer with over 4 years of experience and a Master’s in Computer Science from Arizona State University — building agentic systems and production software that ships.',
  summary:
    'Software Engineer with over 4 years of experience building scalable web applications, cloud platforms, and AI/agentic systems. Holds a Master’s in Computer Science from Arizona State University, with expertise in full-stack development, AWS infrastructure, and performance-focused engineering. Proven success across Omada.AI, Amazon, TCS, and startups — delivering impactful solutions in healthcare tech, developer tooling, agentic AI, and large-scale software.',
  email: 'jangamnoelpaulmoses@gmail.com',
  resume: '/Resume_Noel_Paul.pdf',
  portrait: '/noel.jpeg',
  socials: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/noel-paul-moses-j',
    },
    { label: 'GitHub', href: 'https://github.com/jangamnoelpaulmoses' },
    { label: 'Book a call', href: 'https://topmate.io/noel_paul_moses_j' },
    { label: 'Email', href: 'mailto:jangamnoelpaulmoses@gmail.com' },
    { label: 'HireHack', href: 'https://hirehack.ai' },
    { label: 'Naviget', href: 'https://naviget.com' },
  ],
  highlights: [
    { label: 'Years', value: '4+', sub: 'building production software' },
    { label: 'Education', value: 'MS', sub: 'Computer Science, ASU' },
    { label: 'Past', value: 'AMZN', sub: 'AWS Software Developer' },
    { label: 'Now', value: 'OMDA', sub: 'Founding Engineer — Omada.AI' },
  ],
};

// Consultation / 1:1 — positioned for when the site matures into a booking funnel.
export const consult = {
  available: true,
  bookHref: 'https://topmate.io/noel_paul_moses_j',
  newsletterHref: 'https://noelpaulmoses.substack.com',
  blurb:
    'I take a small number of 1:1 sessions each month with engineers and founders shipping AI into production — agentic systems, retrieval, and the system design that keeps them from melting at scale.',
  offerings: [
    {
      title: 'AI Architecture Review',
      duration: '45 min',
      desc: 'Bring your agent / RAG / LLM system. We pressure-test the design for cost, latency, failure isolation, and the queueing traps that surface at scale.',
      accent: '#7c5cff',
    },
    {
      title: 'Agentic AI, Done Safely',
      duration: '30 min',
      desc: 'Loops, tools, and permissions — how to give an agent enough power to be useful without opening a blast radius you can’t close.',
      accent: '#7fe7ff',
    },
    {
      title: 'Ship It: 0 → 1 Product',
      duration: '30 min',
      desc: 'For builders going from idea to live users — stack choices, what to skip, and how to get something real in front of people fast.',
      accent: '#c6ff3d',
    },
  ],
};

export const services = [
  { title: 'Founding AI Software Engineer @ Omada.AI', icon: 'spark' },
  { title: 'Ex-SWE at Amazon (AWS) & TCS', icon: 'briefcase' },
  { title: 'Full-Stack + Agentic AI Specialization', icon: 'code' },
  { title: 'Master’s in Computer Science, ASU', icon: 'cap' },
];

export const skills = {
  Frontend: [
    'TypeScript',
    'React',
    'Next.js',
    'Redux Toolkit',
    'Tailwind CSS',
    'Framer Motion',
    'Three.js',
    'React Native',
  ],
  Backend: [
    'Node.js',
    'Java',
    'C++',
    'Python',
    'PostgreSQL',
    'MongoDB',
    'Supabase',
  ],
  'AI & Agents': [
    'LLM Orchestration',
    'RAG / Vector Search',
    'Knowledge Graphs',
    'Multi-Agent Systems',
    'vLLM',
    'PyTorch',
  ],
  'Cloud & DevOps': [
    'AWS Lambda',
    'AWS S3',
    'AWS Kinesis',
    'AWS SQS / SNS',
    'Docker',
    'Vercel',
    'Git',
  ],
};

export const techIcons = [
  { name: 'TypeScript', src: '/tech/typescript.png' },
  { name: 'React', src: '/tech/reactjs.png' },
  { name: 'Redux', src: '/tech/redux.png' },
  { name: 'Tailwind', src: '/tech/tailwind.png' },
  { name: 'JavaScript', src: '/tech/javascript.png' },
  { name: 'HTML5', src: '/tech/html.png' },
  { name: 'CSS3', src: '/tech/css.png' },
  { name: 'Node.js', src: '/tech/nodejs.png' },
  { name: 'MongoDB', src: '/tech/mongodb.png' },
  { name: 'Three.js', src: '/tech/threejs.svg' },
  { name: 'Git', src: '/tech/git.png' },
  { name: 'Figma', src: '/tech/figma.png' },
  { name: 'Docker', src: '/tech/docker.png' },
];

export const experience = [
  {
    company: 'Omada.AI',
    role: 'Founding Software Engineer',
    location: 'San Jose, United States',
    dates: 'May 2026 — Present',
    color: '#7c5cff',
    logo: '/companies/omada.svg',
    bullets: [
      'Founding engineer building the core product and AI/agentic systems from the ground up.',
      'Designing the architecture for reliable, observable LLM-powered workflows — bounded, reversible, and built to survive real traffic.',
      'Working across the full stack: product, infrastructure, and the model-facing layer that turns raw capability into something users trust.',
    ],
  },
  {
    company: 'Naviget',
    role: 'Founding Full Stack Developer',
    location: 'San Jose, United States',
    dates: 'Feb 2025 — May 2026',
    color: '#7fe7ff',
    logo: '/companies/naviget.png',
    bullets: [
      'Built Naviget’s medical imaging platform using AWS, Next.js, and Supabase for scalable, secure processing.',
      'Developed an AI-powered video slider that enables real-time comparison of MRI scans with interactive before-and-after overlays.',
      'Shipped a cloud-based DICOM upload system using AWS S3 and Lambda to handle 500+ image uploads daily.',
    ],
  },
  {
    company: 'RoomieHub, LLC',
    role: 'Software Engineer (Full Stack)',
    location: 'Phoenix, United States',
    dates: 'Jun 2024 — Nov 2024',
    color: '#ff9f43',
    logo: '/companies/roomiehub.png',
    bullets: [
      'Built 2 primary modules — User Profile Navigation and Progress Tracking — using React Native, AWS, and Redux.',
      'Deployed the User Profile module and its components, enhancing state management with Redux.',
      'Created 4 intuitive navigation components for the User Profile dashboard using React Navigation.',
      'Developed home screen and birthday functionalities, supporting image uploads up to 10 MB.',
    ],
  },
  {
    company: 'Amazon',
    role: 'AWS Software Developer (Contract)',
    location: 'Hyderabad, India',
    dates: 'Dec 2021 — Jul 2023',
    color: '#c6ff3d',
    logo: '/companies/amazon.png',
    bullets: [
      'Created a low-code / no-code environment, developing 50+ AWS APIs and backend services in Java & C++.',
      'Initiated and monitored real-time data ingestion via AWS Kinesis, handling up to 10,000 events per minute.',
      'Produced a Subscription Notification Service (SNS) with AWS SQS & Lambda managing 4000+ notifications daily.',
      'Spearheaded an AWS application analyzing 1000+ PDF documents daily using AWS Textract.',
    ],
  },
  {
    company: 'Tata Consultancy Services',
    role: 'Software Engineer',
    location: 'Hyderabad, India',
    dates: 'Oct 2021 — Jul 2023',
    color: '#ff4d6d',
    logo: '/companies/tcs.png',
    bullets: [
      'Reduced response times from 500ms to 300ms for the User Authentication micro-service, improving performance and stability.',
      'Earned an “On-the-Spot” award for mitigating application-level bugs by 12% through strategic code refactoring.',
      'Acquired deep expertise in Java and analytics, driving proficient development and data-driven insights.',
    ],
  },
  {
    company: 'Verzeo',
    role: 'Software Engineer Intern',
    location: 'Hyderabad, India',
    dates: 'Jun 2019 — Nov 2019',
    color: '#7fe7ff',
    logo: '/companies/verzeo.png',
    bullets: [
      'Used Azure Cache for Redis to build an E-commerce solution, decreasing load times by 5 seconds.',
      'Implemented real-time inventory management for 40,000+ products with Azure Functions to drop stock-outs by 800 annually.',
    ],
  },
];

export const projects = [
  {
    title: 'DeskTrack: Screen-Aware Productivity Tracker',
    year: '2026',
    tags: ['Electron', 'AI Vision', 'macOS'],
    image: '/projects/desktrack.jpg',
    link: 'https://github.com/jangamnoelpaulmoses/desktrack',
    blurb:
      'A Mac app that understands your day by watching your screen. No integrations to connect. It builds your timeline, spots tasks, nudges you when you drift, and writes a review of your evening. Works with OpenAI, a fully local model, or no AI at all.',
  },
  {
    title: 'BrainOS — Knowledge Layer for AI Agents',
    year: '2026',
    tags: ['Knowledge Graph', 'vLLM', 'Multi-Agent'],
    image: '/projects/brainos.svg',
    link: 'https://github.com/jangamnoelpaulmoses',
    blurb:
      'A living “company brain” for agents — pulls knowledge from scattered sources, reconciles changes into a real knowledge graph, reads diagrams with multimodal models, and exports skills agents can run. Pitched at lablab.ai × AMD on a single MI300X.',
  },
  {
    title: 'HireHack.ai — Chrome Extension',
    year: '2025',
    tags: ['Next.js', 'TypeScript', 'Chrome Extension'],
    image: '/projects/extension.png',
    link: 'https://chromewebstore.google.com/detail/hirehack-ai/pgjgjjkabhhjkaiaeofjfdelplcablbj',
    blurb:
      'Smart Chrome extension that automates job applications on LinkedIn — detects Easy Apply jobs, auto-fills forms, manages flow, and applies to 50+ jobs in minutes.',
  },
  {
    title: 'HireHack.ai — Personalized Dashboard',
    year: '2025',
    tags: ['Next.js', 'Supabase', 'PostgreSQL'],
    image: '/projects/dashboard.png',
    link: 'https://app.hirehack.ai',
    blurb:
      'Full-stack dashboard tracking usage, job stats, and form preferences. Includes subscriptions, secure auth, user feedback, and resume analysis — now serving 200+ real users.',
  },
  {
    title: 'Naviget — Medical Imaging Platform',
    year: '2025',
    tags: ['Next.js', 'AWS', 'Supabase'],
    image: '/projects/naviget.png',
    link: 'https://naviget.com',
    blurb:
      'Built Naviget’s web app — patients upload DICOM scans and receive HIPAA-compliant 3D visualizations of MRI and CT studies.',
  },
  {
    title: 'CodeWhisperer — Amazon (via TCS)',
    year: '2021—2023',
    tags: ['Java', 'C++', 'AWS'],
    image: '/projects/tcs_amazon.png',
    link: 'https://aws.amazon.com/codewhisperer/',
    blurb:
      'Helped develop and maintain Amazon’s AI-powered coding assistant CodeWhisperer — built 50+ AWS APIs and real-time data pipelines.',
  },
  {
    title: 'Covid Detection — Deep Learning',
    year: '2021',
    tags: ['Python', 'PyTorch', 'CNN / VGG-16'],
    image: '/projects/covid.jpg',
    link: 'https://github.com/jangamnoelpaulmoses',
    blurb:
      'CNN model (VGG-16) detecting COVID-19 from chest X-rays. Trained over 160 epochs and reached 86% accuracy. Top recognition among 48 undergrad projects.',
  },
  {
    title: 'MindFul Life — Vital Signs App',
    year: '2020',
    tags: ['Android', 'Java', 'MySQL'],
    image: '/projects/health.jpg',
    link: 'https://github.com/jangamnoelpaulmoses/Context-Aware-Application',
    blurb:
      'Android app tracking heart and respiratory rates via flash-enabled video and accelerometer sensors with on-device storage.',
  },
];

export const testimonials = [
  {
    quote:
      'Noel’s willingness to take on tasks with complex code issues and successfully deliver them makes him a standout developer.',
    name: 'Enrique Melendez',
    title: 'Founder, RoomieHub',
    image: '/people/enrique.jpg',
    href: 'https://www.linkedin.com/in/enrique-caceres-melendez-331489151/',
  },
  {
    quote:
      'Collaborating with Noel has been both fun and learning. Besides being a great team player, he is quick at adapting to new technologies.',
    name: 'Vamsi Manyam',
    title: 'SDE-2, Amazon',
    image: '/people/vamsi.jpg',
    href: 'https://www.linkedin.com/in/vamsi-manyam-816792134/',
  },
  {
    quote:
      'Noel was our team’s point of contact for anything related to the front end and integrations for our ML and Web based project.',
    name: 'Shefali Saini',
    title: 'System Development Engineer, Amazon',
    image: '/people/shefali.jpg',
    href: 'https://www.linkedin.com/in/shefali-saini-5a056617b/',
  },
];

export const navLinks = [
  { label: 'Index', href: '#top', no: '00' },
  { label: 'About', href: '#about', no: '01' },
  { label: 'Work', href: '#work', no: '02' },
  { label: 'Stack', href: '#stack', no: '03' },
  { label: 'Projects', href: '#projects', no: '04' },
  { label: 'Journal', to: '/journal', no: '05' },
  { label: 'Contact', href: '#contact', no: '06' },
];
