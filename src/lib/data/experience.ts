export type Metric = { value: string; label: string };

export type Role = {
	id: string;
	company: string;
	url?: string;
	role: string;
	type: string;
	location: string;
	start: string;
	end: string;
	current?: boolean;
	headline: string;
	metrics?: Metric[];
	stack: string[];
	highlights: string[];
};

export const roles: Role[] = [
	{
		id: 'trenqit',
		company: 'Trenqit',
		role: 'Lead Full-Stack Engineer',
		type: 'Full-time',
		location: 'India · Remote',
		start: '2025',
		end: 'Present',
		current: true,
		headline:
			'Leading full-stack development of an e-commerce marketplace with a built-in social posting feed, owning architecture and delivery from the database to the UI.',
		stack: [
			'Python',
			'Django',
			'DRF',
			'PostgreSQL',
			'Celery',
			'Docker',
			'React',
			'TypeScript',
			'Zustand'
		],
		highlights: [
			'Own architecture and delivery across backend and frontend for a marketplace that combines commerce with a social feed.',
			'Built the backend on Django and Django REST Framework over PostgreSQL, with Celery workers for asynchronous background jobs.',
			'Built the React + TypeScript frontend with Zustand slice-based state for products, posts and user data.',
			'Containerised services with Docker for reproducible local development and deployment.'
		]
	},
	{
		id: 'searchless',
		company: 'Searchless',
		url: 'https://searchless.ai',
		role: 'Software Engineer',
		type: 'Full-time',
		location: 'Canada · Remote',
		start: 'Apr 2025',
		end: 'Jul 2026',
		headline:
			'Core engineer on an AI video-interview platform: real-time speech pipelines, LLM analysis and multi-region data on a Rust (Axum, Tokio) backend with a SvelteKit frontend.',
		metrics: [
			{ value: '400+', label: 'Commits' },
			{ value: '35+', label: 'Merged PRs' },
			{ value: '<1s', label: 'Time to first audio' },
			{ value: '4', label: 'Languages shipped' }
		],
		stack: [
			'Rust',
			'Axum',
			'Tokio',
			'gRPC',
			'Utoipa',
			'WebSockets',
			'Neo4j',
			'PostgreSQL',
			'AWS',
			'Gemini',
			'Prometheus',
			'SvelteKit'
		],
		highlights: [
			'Built streaming WebM demuxing and muxing in Rust: decoded Opus frames to PCM for real-time voice synthesis, reaching sub-second time-to-first-audio in production.',
			'Integrated Google Chirp 3 streaming speech-to-text over gRPC (tonic/prost) and refactored the STT router to stream raw Opus/WebM bytes to Chirp and OpenAI handlers.',
			'Built an evidence-based resume analysis pipeline (claim extraction → Gemini with Search grounding → evidence mapping) and moved scores and outcomes from the LLM into deterministic Rust.',
			'Designed UUIDv8 region encoding for multi-region data: PostgreSQL triggers embed a region byte in new keys, decoded by a Rust RegionCache before any database call.',
			'Built an S3-backed, multi-region AWS Polly speech cache so static interview prompts skip re-synthesis, removing live-interview lag.',
			'Added Prometheus metrics and Altcha proof-of-work bot protection to the API, and fixed a Neo4j connection-pool leak.',
			'Migrated ~30 SvelteKit pages to a type-safe client generated from the Rust OpenAPI spec, and shipped i18n in English, Spanish, Portuguese and Thai.',
			'Wrote Inspector, a Rust CLI that validates multi-stage backend pipelines and generates multi-sheet Excel reports.'
		]
	},
	{
		id: 'risevest',
		company: 'Rise Academy',
		url: 'https://risevest.com',
		role: 'Backend Engineering Intern',
		type: 'Part-time · 28-week programme',
		location: 'Lagos · Remote',
		start: 'Jan 2025',
		end: 'Dec 2025',
		headline:
			'Shipped backend features across real products in Risevest’s engineering programme, and led the backend for an NDA-protected startup affiliated with Risevest.',
		metrics: [{ value: '28', label: 'Week programme' }],
		stack: [
			'NestJS',
			'Express',
			'TypeScript',
			'PostgreSQL',
			'Redis',
			'Kafka',
			'WebSockets',
			'JWT',
			'OpenAPI'
		],
		highlights: [
			'Built a restaurant delivery platform in NestJS with custom RBAC, WebSocket and Kafka notifications, idempotent payment flows and Google Maps rider ETA.',
			'Hardened APIs against MITM attacks, geo-spoofing, fake payment injection and delivery fraud using multi-factor validation on critical operations.',
			'Designed the ERD and data models for a classified-ads platform; implemented JWT auth, sessions, CORS, CI/CD and Swagger docs.',
			'Lead backend engineer for an NDA-protected startup affiliated with Risevest, owning backend design and implementation.'
		]
	},
	{
		id: 'ayomide',
		company: 'Ayomide Foundation',
		role: 'Software Engineer Intern',
		type: 'Internship',
		location: 'Nigeria · Remote',
		start: 'Jul 2023',
		end: 'Dec 2023',
		headline:
			'Built an AI calendar from scratch on a Rust backend, integrating four applications through PostgreSQL and OAuth 2.0.',
		metrics: [{ value: '4', label: 'Apps integrated' }],
		stack: ['Rust', 'JavaScript', 'PostgreSQL', 'OAuth 2.0', 'CI/CD'],
		highlights: [
			'Built an AI calendar integrating four applications via PostgreSQL and OAuth 2.0, implemented from scratch on a Rust backend.',
			'Wrote a custom decision-tree algorithm in Rust for dynamic schedule generation.',
			'Shipped full-stack features in vanilla JS and Rust and set up the CI/CD pipeline.'
		]
	},
	{
		id: 'index-ui',
		company: 'Index UI',
		role: 'Full Stack Engineer',
		type: 'Freelance',
		location: 'China · Remote',
		start: 'Nov 2023',
		end: 'Dec 2023',
		headline:
			'Sole developer of an Excel index-search web app, with a Rust search engine at its core.',
		metrics: [{ value: '~1 GB', label: 'Parsed in under 5 s' }],
		stack: ['Rust', 'Async', 'Multithreading', 'JavaScript', 'SCSS', 'Render'],
		highlights: [
			'Built the core search engine in Rust with async and multi-threaded processing, parsing ~1 GB of data in under 5 seconds.',
			'Built the full web experience with browser APIs and SCSS, and deployed it on Render.',
			'Presented 5+ demos and proofs of concept to the client and turned feedback into iterations.'
		]
	}
];

export const capabilities = [
	{ label: 'Languages', items: ['Rust', 'TypeScript', 'Python', 'JavaScript', 'SQL', 'C'] },
	{
		label: 'Rust',
		items: [
			'Tokio',
			'Axum',
			'Tower',
			'tonic / gRPC',
			'Serde',
			'Utoipa',
			'Tauri',
			'Leptos',
			'Rodio',
			'WebAssembly'
		]
	},
	{
		label: 'Real-time',
		items: ['WebSockets', 'gRPC / Protobuf', 'Opus', 'WebM muxing', 'Streaming STT / TTS']
	},
	{
		label: 'Backend',
		items: [
			'REST',
			'OpenAPI',
			'Django / DRF',
			'Celery',
			'NestJS',
			'FastAPI',
			'Kafka',
			'Redis',
			'OAuth 2.0'
		]
	},
	{
		label: 'Data',
		items: ['PostgreSQL', 'Neo4j / Cypher', 'MongoDB', 'SQLite', 'Vector databases']
	},
	{ label: 'Frontend', items: ['SvelteKit', 'React', 'TypeScript', 'Zustand'] },
	{ label: 'AI', items: ['LLM pipelines', 'RAG', 'Gemini', 'OpenAI', 'Google Chirp 3'] },
	{
		label: 'Infrastructure',
		items: ['Docker', 'AWS (S3, Polly, CDK)', 'GitHub Actions', 'Prometheus', 'Linux', 'Vercel']
	}
];

export const education = [
	{
		title: 'B.Sc. Computer Science',
		org: 'Covenant University · Distance learning',
		date: '2025 – 2029'
	}
];

export const certifications = [
	{ title: 'CS50x: Introduction to Computer Science', org: 'Harvard / edX', date: 'Dec 2023' },
	{ title: 'CS50W: Web Programming', org: 'Harvard / edX', date: 'Mar 2023' },
	{ title: 'CS50P: Programming with Python', org: 'Harvard / edX', date: 'Feb 2023' },
	{ title: 'Problem Solving (Basic)', org: 'HackerRank', date: 'Jan 2025' },
	{ title: 'Professional Foundations', org: 'ALX Africa', date: 'Sep 2024' }
];

export const awards = [
	{ title: 'Winner, STEMist Hacks 2.0', org: 'STEMist Education', date: 'Aug 2023' },
	{ title: 'Winner, High School Hacks', org: 'Quiz Burst', date: '' }
];
