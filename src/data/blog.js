import generated from './generated-posts.json';

// Journal — long-form writing.
// Articles adapted and expanded from Noel's field notes & LinkedIn essays.
//
// Each post is a list of content blocks rendered by <ArticleBody/>.
// Block types: lead | p | h2 | ul | ol | quote | callout | code | divider
//   - { t: 'callout', label?, text }
//   - { t: 'code', lang?, code }
//   - { t: 'ul' | 'ol', items: [] }
//   - { t: 'image', src, alt }   (auto-generated posts; hero also set as post.cover)

export const blogMeta = {
  title: 'Journal',
  dek: 'Field notes on agentic AI, system design, and shipping software that survives contact with the real world.',
};

const handWritten = [
  {
    slug: 'building-desktrack',
    title: 'I Built a Mac App That Tracks My Day by Watching the Screen',
    dek: 'Every productivity tracker wants you to connect Slack, Notion, and your email first. DeskTrack skips all of that. It looks at the screen the way you do and figures the rest out.',
    date: '2026-07-07',
    readMins: 4,
    category: 'Shipping',
    accent: '#3987e5',
    featured: false,
    cover: '/journal/desktrack-dashboard.jpg',
    excerpt:
      'The screen is the one integration every app already supports. I built a tracker around that idea, shipped it as a DMG, and learned more about macOS in two days than in two years.',
    content: [
      {
        t: 'lead',
        text: 'Routine trackers all share the same first screen: connect your calendar, connect Slack, connect Notion, paste three API keys. I wanted the opposite. DeskTrack watches the screen itself, so every app is supported on day one, including the ones with no API at all.',
      },
      { t: 'image', src: '/journal/desktrack-dashboard.jpg', alt: 'DeskTrack dashboard with focus stats, time by category, tasks, and a timeline' },
      { t: 'h2', text: 'What it does' },
      {
        t: 'ul',
        items: [
          'Builds a timeline of your day, grouped into clean sessions.',
          'Scores your focus and shows where the hours actually went.',
          'Spots tasks sitting on your screen, like a todo in Notes or an email waiting for a reply.',
          'Nudges you when you drift into entertainment for too long.',
          'Writes a short review of your day every evening: wins, leaks, and what to try tomorrow.',
        ],
      },
      { t: 'image', src: '/journal/desktrack-timeline.jpg', alt: 'DeskTrack timeline showing focus and drift entries with app names and summaries' },
      { t: 'h2', text: 'How it stays cheap and private' },
      {
        t: 'p',
        text: 'The trick is separating watching from understanding. Watching is free: every few seconds the app takes a tiny local fingerprint of the screen and listens for app switches through a small Swift helper. Understanding costs money, so the AI only sees a screenshot when something meaningfully changed. A full day of tracking costs a few cents.',
      },
      {
        t: 'callout',
        label: 'Privacy first',
        text: 'Screenshots are analyzed and thrown away, never stored. All data stays on the Mac. There is a fully local mode powered by Ollama and a no-AI mode that tracks by app name alone.',
      },
      { t: 'image', src: '/journal/desktrack-tiles.jpg', alt: 'DeskTrack stat tiles showing time tracked, focus percent, context switches, and longest focus block' },
      { t: 'h2', text: 'What shipping it taught me' },
      {
        t: 'ul',
        items: [
          'macOS ties screen permissions to the exact app signature. Rebuild the app and the permission silently dies. The fix was trusting real capture results instead of the permission API.',
          'Unsigned apps downloaded from the internet show a scary "damaged" error unless you sign them properly, even with a throwaway signature. Found that one by testing as a fresh user.',
          'My router corrupts large uploads over IPv6. Every git push of the installers failed until I forced IPv4. The error had nothing to do with git.',
          'The best test plan is pretending you are a stranger who just downloaded the app.',
        ],
      },
      {
        t: 'p',
        text: 'DeskTrack is free to download for macOS, with the build and install steps documented in the repo. If you try it, I would love to hear what it gets wrong about your day.',
      },
      {
        t: 'callout',
        label: 'Try it',
        text: 'Download DeskTrack for Mac at github.com/jangamnoelpaulmoses/desktrack. Bring an OpenAI key, run it fully local, or skip AI entirely.',
      },
    ],
  },
  {
    slug: 'loop-engineering',
    title: 'Loop Engineering: Stop Prompting, Start Delegating',
    dek: 'The shift from chatting with AI to deploying it as a worker that runs while you walk away — and the one rule that separates a useful loop from a disaster.',
    date: '2026-06-27',
    readMins: 6,
    category: 'Agentic AI',
    accent: '#7c5cff',
    featured: true,
    excerpt:
      'Prompt engineering taught us how to talk to AI. Loop engineering teaches us how to hand off the work — without handing off the keys.',
    content: [
      {
        t: 'lead',
        text: 'The person who built Claude Code doesn’t really prompt it anymore. Boris Cherny, who leads Claude Code at Anthropic, put it bluntly: "I don’t prompt Claude anymore. My job is to write loops." That sentence reframes how I think about working with AI.',
      },
      {
        t: 'p',
        text: 'A Zapier-style automation is a light switch: one trigger, one action, done. A loop is a guard dog. It watches, remembers what it already saw, and only barks when something actually matters. The difference isn’t the model — it’s the harness you wrap around it.',
      },
      { t: 'h2', text: 'A loop answers five questions' },
      {
        t: 'p',
        text: 'You don’t need a framework to build one. You need to answer five questions honestly:',
      },
      {
        t: 'ol',
        items: [
          'What should it watch?',
          'How often should it check?',
          'What exact change is it hunting for?',
          'What does it do the moment that happens?',
          'When should it stop and tap a human?',
        ],
      },
      {
        t: 'p',
        text: 'That last question is the one most people skip, and it’s the one that decides whether you’ve built something useful or something dangerous.',
      },
      { t: 'h2', text: 'A concrete example: the job-hunter loop' },
      {
        t: 'p',
        text: 'Say you’re job searching. Feed a loop your target companies and filters. It spawns sub-agents to scan the boards in parallel a few times a day, remembers what it already showed you so there are no duplicates, drafts a tailored cover letter for each real match, and hands you a dashboard to approve. It runs in the cloud, so your laptop can be off. You wake up to a shortlist, not a chore.',
      },
      {
        t: 'callout',
        label: 'The Human Gate',
        text: 'The more powerful the loop, the stricter its boundaries. Anything touching your money, reputation, or customers freezes and waits for a human click. The loop watches and drafts. It does not buy the shoes, send the cold email, or submit the application on its own.',
      },
      { t: 'h2', text: 'Why this matters' },
      {
        t: 'p',
        text: 'Prompt engineering was about getting one good answer out of one good question. Loop engineering is about designing a system that produces good outcomes repeatedly, unsupervised, with a clear line where human judgment re-enters. The skill is no longer phrasing — it’s boundaries, memory, and knowing when to stop.',
      },
      {
        t: 'quote',
        text: 'Prompt engineering taught us how to talk to AI. Loop engineering teaches us how to hand off the work.',
      },
      {
        t: 'p',
        text: 'If you’re building with agents right now, the most valuable thing you can design isn’t a cleverer prompt. It’s the gate that decides what the loop is never allowed to do alone.',
      },
    ],
  },

  {
    slug: 'dependencies-are-your-threat-model',
    title: 'Your Dependencies Are Now Part of Your Threat Model',
    dek: 'Two supply-chain attacks in one quarter — LiteLLM and Axios — and what they reveal about the layer we stopped questioning.',
    date: '2026-04-25',
    readMins: 7,
    category: 'Security',
    accent: '#ff4d6d',
    featured: true,
    excerpt:
      'Your system doesn’t break at the model layer. It breaks at the layer you don’t question — the one quietly executing on install.',
    content: [
      {
        t: 'lead',
        text: 'In AI, your system doesn’t break at the model layer. It breaks at the layer you stopped questioning. Two attacks this quarter made that painfully clear — and neither needed a prompt injection or a jailbreak. Just a dependency update.',
      },
      { t: 'h2', text: 'LiteLLM: installed = executed' },
      {
        t: 'p',
        text: 'LiteLLM, a library many teams run in production, was compromised through a malicious package shipped directly through PyPI. Not a vulnerability. Not a bad config. A poisoned release.',
      },
      {
        t: 'p',
        text: 'The mechanism is the scary part. A .pth file was injected into the package, and in Python, .pth files execute automatically on startup. No import. No function call. Installed equals executed.',
      },
      {
        t: 'p',
        text: 'Inside it was a base64-encoded payload that collected environment variables and API keys, read SSH keys, cloud credentials, and kube configs, grabbed CI/CD secrets, docker configs, even shell history — encrypted everything, and exfiltrated it to an attacker-controlled endpoint. Within 45 minutes, the compromised versions were downloaded roughly 47,000 times.',
      },
      { t: 'h2', text: 'Axios: one small dependency' },
      {
        t: 'p',
        text: 'Then Axios — used in over 100M projects weekly. An attacker gained access to a maintainer’s npm account using a long-lived token, giving full control over releases. Instead of touching core code, they added a single dependency designed to run a postinstall script.',
      },
      {
        t: 'p',
        text: 'On install, the script detected the OS, downloaded a Remote Access Trojan in about a second, and deleted itself to remove traces. No errors. No visible signals.',
      },
      {
        t: 'callout',
        label: 'If you suspect exposure',
        text: 'Treat the machine as fully compromised. Rotate all credentials immediately, revoke access, audit logs, and rebuild affected environments. Don’t auto-install brand-new releases — npm config set min-release-age can buy you a quarantine window.',
      },
      { t: 'h2', text: 'The real takeaway' },
      {
        t: 'p',
        text: 'The lesson isn’t "don’t use LiteLLM" or "don’t use Axios." It’s that dependencies are no longer just utilities. They’re part of your threat model. The more access and permissions we hand to AI systems to make them useful, the larger the attack surface becomes — and every layer you add is a layer someone else can poison.',
      },
      {
        t: 'quote',
        text: 'We spent two years asking how powerful the model is. The real question now is how secure everything around it is.',
      },
      {
        t: 'p',
        text: 'AI infrastructure needs to be treated like critical infrastructure. Version pinning, isolation, and least-privilege access aren’t optional hardening steps you get to later. They’re baseline.',
      },
    ],
  },

  {
    slug: 'the-queue-always-wins',
    title: 'The Queue Always Wins: Real-Time AI That Survives Scale',
    dek: 'The production horror story nobody mentions about real-time AI — and the three-lane architecture that keeps it from melting at 9am Monday.',
    date: '2026-02-25',
    readMins: 8,
    category: 'System Design',
    accent: '#7fe7ff',
    featured: true,
    excerpt:
      'At low traffic the naive flow looks fine. At 10k+ RPS it becomes a queueing nightmare. What fixed it wasn’t a better model — it was better system design.',
    content: [
      {
        t: 'lead',
        text: 'Here’s a scaling problem I keep running into. You build an AI Insights feature — "summarize the last hour," "alert me when anomalies happen." At low traffic, the naive flow looks completely fine.',
      },
      { t: 'code', lang: 'text', code: 'API → DB query → build prompt → LLM call → response' },
      {
        t: 'p',
        text: 'Then it scales. Multi-tenant, 10k+ RPS, and that tidy little chain turns into a queueing nightmare. The database gets hammered by fan-out reads. LLM latency causes request pileups. Retries multiply the load. Costs explode because the same "summary" gets recomputed a hundred times.',
      },
      {
        t: 'p',
        text: 'What fixed it for me wasn’t a better model. It was better system design — splitting the work into three lanes that each do one job well.',
      },
      { t: 'h2', text: 'Lane 1 — Ingestion' },
      {
        t: 'p',
        text: 'Push events into Kafka or any pub/sub system. Let consumers normalize them and store raw data in S3 or GCS. The goal is to keep the firehose out of your request/response path so your API isn’t doing heavy lifting under load. The API should never be the thing absorbing a traffic spike.',
      },
      { t: 'h2', text: 'Lane 2 — Precompute' },
      {
        t: 'p',
        text: 'Don’t generate insights from scratch on every request. Precompute rolling aggregates per tenant and time window — 5 minute, 1 hour, 1 day: top issues, deltas, spikes, and representative samples. This keeps the eventual prompt structured, bounded, and cheap. You’re turning an open-ended question into a lookup plus a small, predictable LLM call.',
      },
      { t: 'h2', text: 'Lane 3 — Serving' },
      {
        t: 'p',
        text: 'When a user requests insights, serve cached features and cached insights first. Only call the LLM when it’s truly needed. Cache with a key like tenant + timeframe + insightType, and match the TTL to the window so it stays fresh without thrashing.',
      },
      {
        t: 'callout',
        label: 'The pattern underneath',
        text: 'Keep the firehose off the request path, precompute anything bounded, and make the LLM the last resort instead of the first step. The model is the most expensive, least predictable component you have — treat it that way.',
      },
      {
        t: 'quote',
        text: 'This is the difference between a cool demo and a production system that doesn’t melt at 9am Monday.',
      },
      {
        t: 'p',
        text: 'Real-time AI isn’t a model problem. It’s a queueing problem wearing a model’s clothes. Design for the queue and the model gets to do its best work.',
      },
    ],
  },

  {
    slug: 'building-brainos',
    title: 'Building BrainOS: A Knowledge Layer for AI Agents',
    dek: 'Company knowledge lives in Slack, docs, diagrams, and people’s heads — and agents can’t reliably use any of it. Here’s what we built to change that.',
    date: '2026-05-28',
    readMins: 7,
    category: 'Agentic AI',
    accent: '#c6ff3d',
    featured: false,
    excerpt:
      'Less "yet another AI tool," more the beginning of a real company brain layer for agents — running on open-weight models on a single AMD MI300X.',
    content: [
      {
        t: 'lead',
        text: 'We kept running into the same problem: company knowledge is scattered everywhere — Slack threads, docs, architecture diagrams, and just people’s heads — and AI agents can’t really use any of it reliably. So with Vamshi and Rajveer, we tried to turn that mess into something structured and living. We call it BrainOS.',
      },
      { t: 'h2', text: 'What it actually does' },
      {
        t: 'ul',
        items: [
          'Pulls knowledge from fragmented sources instead of assuming it lives in one place.',
          'Keeps it updated by reconciling changes — old, superseded facts get retired rather than lingering and lying.',
          'Builds a real knowledge graph instead of "search over a pile of docs."',
          'Understands diagrams and whiteboards using multimodal models.',
          'Figures out what the system doesn’t know yet — the gaps, not just the answers.',
          'Exports skills that agents like Claude Code or Cursor can actually run with.',
        ],
      },
      { t: 'h2', text: 'Why a graph, not a vector pile' },
      {
        t: 'p',
        text: 'Plain retrieval over documents gives you fragments that sound relevant. It doesn’t give you the relationships — what supersedes what, what causes what, who owns what. Domain and causal knowledge is the real blocker to AI automation inside companies, and a graph is how you represent it honestly. Reconciliation matters just as much as ingestion: stale knowledge confidently retrieved is worse than no knowledge at all.',
      },
      { t: 'h2', text: 'Running it the hard way' },
      {
        t: 'p',
        text: 'Everything runs on open-weight models on a single AMD MI300X. We pitched it live at lablab.ai with AMD, and showcased it again at Vector Space Day in San Francisco — a genuinely technical, single-track room full of people thinking seriously about retrieval infra, memory, and agentic systems.',
      },
      {
        t: 'callout',
        label: 'The thesis',
        text: 'Agents don’t fail because the model is weak. They fail because they’re reasoning over a company’s knowledge that is fragmented, stale, and unstructured. Fix the knowledge layer and the agent gets dramatically more useful — without a single change to the model.',
      },
      {
        t: 'quote',
        text: 'It feels less like yet another AI tool and more like the beginning of a real company brain layer for agents.',
      },
    ],
  },

  {
    slug: 'agentic-ai-needs-permissions',
    title: 'Agentic AI Needs Broad Permissions — That’s the Hard Part',
    dek: 'Running a real, executing agent on my own VPS made the core tradeoff impossible to ignore: to be useful, agents need power. Power is attack surface.',
    date: '2026-02-20',
    readMins: 5,
    category: 'AI Safety',
    accent: '#ff9f43',
    featured: false,
    excerpt:
      'We’re moving from chatbots to systems that act — and the security model hasn’t fully caught up yet.',
    content: [
      {
        t: 'lead',
        text: 'I spent a stretch running a real, executing agent on my own VPS — not a demo, an actual process that lives on the hardware, connects over WebSockets, and orchestrates real actions: LLM calls, browser automation, filesystem access, cron jobs, external APIs.',
      },
      {
        t: 'p',
        text: 'It’s genuinely a glimpse of where assistants are heading. It’s also the clearest illustration I’ve seen of the central tradeoff of agentic AI.',
      },
      {
        t: 'quote',
        text: 'To be useful, an agent needs broad permissions. Broad permissions are a massive attack surface. That tension is the whole problem.',
      },
      { t: 'h2', text: 'This isn’t one tool’s problem' },
      {
        t: 'p',
        text: 'It’s a core challenge of the category. We’re moving from chatbots — which only talk — to systems that act. The moment an assistant can touch your filesystem, your shell, and your credentials, the security model has to be as serious as the capability. Right now it usually isn’t.',
      },
      { t: 'h2', text: 'What I’d tell anyone experimenting' },
      {
        t: 'ul',
        items: [
          'Run it on a VPS or an isolated machine — never your daily-driver laptop.',
          'Practice credential hygiene as if the agent will be compromised, because someday one will be.',
          'Default to least privilege and widen access deliberately, not preemptively.',
          'Keep a human gate on anything irreversible — money, sends, deletes, deploys.',
        ],
      },
      {
        t: 'p',
        text: 'The future of AI assistants is clearly agent-based. The hard part now isn’t capability — it’s making them safe enough to trust by default. That’s an engineering problem, and it’s the one worth working on.',
      },
    ],
  },

  {
    slug: 'shipping-in-silence',
    title: 'From Zero to 200+ Users, Quietly',
    dek: 'No marketing push. No launch post. Just people finding something I built and actually using it — and what that taught me about why I build.',
    date: '2026-02-15',
    readMins: 4,
    category: 'Building in Public',
    accent: '#7c5cff',
    featured: false,
    excerpt:
      'Seeing real users interact with something you designed, built, and deployed is the moment the work stops being a project and starts being real.',
    content: [
      {
        t: 'lead',
        text: 'One morning I checked a production dashboard and realized something I’d built quietly from scratch was being used by 200+ real people. No marketing push. No launch post. Just people finding value and using it.',
      },
      {
        t: 'p',
        text: 'The snapshot was from Supabase — close to 4,000 REST requests against APIs I’d built. Real auth requests, real database traffic, real usage. And getting the accompanying Chrome extension approved by Google for public use made it feel official in a way a localhost demo never does.',
      },
      { t: 'h2', text: 'What it actually took' },
      {
        t: 'ul',
        items: [
          'An AI-integrated, full production system — not a prototype.',
          'Secure authentication and careful data handling.',
          'Backend APIs that scale to thousands of requests.',
          'Monitoring, metrics, and stability under real-world conditions.',
        ],
      },
      {
        t: 'callout',
        label: 'The lesson',
        text: 'Shipping in silence works when the product earns its own word of mouth. Build the boring parts — auth, monitoring, stability — and let real usage be the launch.',
      },
      {
        t: 'quote',
        text: 'Seeing real users interact with something you designed, built, and deployed makes the work feel truly real.',
      },
      {
        t: 'p',
        text: 'Still learning. Still shipping. But that morning was a clean reminder of why I build in the first place.',
      },
    ],
  },
];

// Hand-written essays + auto-generated posts (from the Portfolio Journal Sync
// n8n workflow) merged into one feed, newest first.
export const posts = [...handWritten, ...generated].sort((a, b) =>
  b.date.localeCompare(a.date)
);

// Convenience lookups
export const getPost = (slug) => posts.find((p) => p.slug === slug);

export const getAdjacent = (slug) => {
  const i = posts.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? posts[i - 1] : null,
    next: i >= 0 && i < posts.length - 1 ? posts[i + 1] : null,
  };
};

export const allTags = [
  'All',
  ...Array.from(new Set(posts.map((p) => p.category))),
];

export const formatDate = (iso) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
