export type Category = 'Rust' | 'AI' | 'Desktop' | 'Web' | 'Tooling';

export type Project = {
	id: string;
	name: string;
	year: string;
	summary: string;
	stack: string[];
	categories: Category[];
	status?: 'In progress';
	links?: { label: string; href: string }[];
};

const gh = (repo: string) => ({
	label: 'Source',
	href: `https://github.com/ugochukwu-850/${repo}`
});

export const featured = {
	id: 'jomify',
	name: 'Jomify',
	tagline: 'Your music, offline, everywhere',
	summary:
		'A cross-platform offline music player with Spotify and YouTube integration, track downloads and multi-threaded async playback on Rodio, across Windows, macOS and Linux.',
	stack: ['Rust', 'Tauri', 'React', 'TypeScript', 'Rodio', 'ffmpeg'],
	metrics: [
		{ value: '17', label: 'GitHub stars' },
		{ value: '3', label: 'Desktop platforms' },
		{ value: '2', label: 'Streaming sources' }
	],
	links: [
		{ label: 'View source', href: 'https://github.com/ugochukwu-850/Jomify' },
		{ label: 'Releases', href: 'https://github.com/ugochukwu-850/Jomify/releases' }
	]
};

export const projects: Project[] = [
	{
		id: 'docconvo',
		name: 'DocConvo',
		year: '2025',
		summary: 'Desktop app for chatting with your documents, powered by Gemini through Rig.rs.',
		stack: ['Rust', 'Tauri', 'Rig.rs', 'Gemini', 'TypeScript'],
		categories: ['Rust', 'AI', 'Desktop'],
		links: [gh('DocConvo')]
	},
	{
		id: 'cu-mcp',
		name: 'CU LMS MCP Server',
		year: '2026',
		summary:
			'Model Context Protocol server that lets Covenant University distance-learning students work with the university LMS through AI assistants.',
		stack: ['MCP', 'LLM tooling'],
		categories: ['AI', 'Tooling']
	},
	{
		id: 'inspector',
		name: 'Inspector',
		year: '2025',
		summary:
			'CLI that validates multi-stage backend pipelines end to end and generates multi-sheet Excel reports.',
		stack: ['Rust', 'CLI', 'rust_xlsxwriter'],
		categories: ['Rust', 'Tooling']
	},
	{
		id: 'etagere',
		name: 'Etagère',
		year: '2026',
		summary:
			'Desktop book library that uses on-device AI to detect and organise PDF and DOCX books.',
		stack: ['Rust', 'Tauri', 'Leptos', 'On-device AI'],
		categories: ['Rust', 'AI', 'Desktop'],
		status: 'In progress',
		links: [gh('Etagere')]
	},
	{
		id: 'pump',
		name: 'Pump',
		year: '2025',
		summary:
			'Offline water-tank management for desktop and Android — calibration, level estimation and smart timers. Built in 24 hours.',
		stack: ['Tauri', 'React', 'TypeScript', 'Kotlin'],
		categories: ['Desktop'],
		links: [gh('Pump')]
	},
	{
		id: 'fuse',
		name: 'Fuse',
		year: '2026',
		summary: 'A free cloud-storage extender built on FUSE, with a Tauri desktop shell.',
		stack: ['Tauri', 'SvelteKit', 'Rust'],
		categories: ['Rust', 'Desktop'],
		links: [gh('Fuse')]
	},
	{
		id: 'geminihealth',
		name: 'GeminiHealth',
		year: '2024',
		summary:
			'Health and catering platform with medical profiles, AI health insights, recipe generation and AI market orders.',
		stack: ['Django', 'React', 'PostgreSQL', 'Gemini'],
		categories: ['AI', 'Web'],
		links: [gh('GeminiHealth')]
	},
	{
		id: 'zapbot',
		name: 'ZapBot',
		year: '2025',
		summary:
			'Lightning-powered Discord bot for wallets, balances and payments — including buying MTN airtime with sats.',
		stack: ['Python', 'Discord', 'Bitcoin Lightning'],
		categories: ['Tooling'],
		links: [gh('ZapBot')]
	},
	{
		id: 'index-ui',
		name: 'Index UI',
		year: '2023',
		summary: 'Batch Excel merger and index searcher with a multi-threaded Rust core.',
		stack: ['Rust', 'JavaScript', 'SCSS'],
		categories: ['Rust', 'Web'],
		links: [gh('Index-UI')]
	},
	{
		id: 'falcon',
		name: 'Falcon',
		year: '2023',
		summary:
			'Generates CBT exams and Google Forms quizzes from a teacher’s notes. Built solo, front to back.',
		stack: ['Python', 'OpenAI', 'Auth0', 'Google Drive API'],
		categories: ['AI', 'Web'],
		links: [gh('Falcon')]
	}
];

export const categories: Category[] = ['Rust', 'AI', 'Desktop', 'Web', 'Tooling'];

export const openSource = {
	project: 'RustAudio / rodio',
	href: 'https://github.com/RustAudio/rodio',
	summary:
		'Contributor to Rust’s most widely used audio playback library — fixes, documentation, accessibility and issue triage.',
	prs: [
		{
			title: 'Fix total_duration after speed mutation',
			ref: '#631',
			date: 'Oct 2024',
			href: 'https://github.com/RustAudio/rodio/pull/631'
		},
		{
			title: 'Document how speed.rs achieves its speed-up',
			ref: '#630',
			date: 'Oct 2024',
			href: 'https://github.com/RustAudio/rodio/pull/630'
		}
	]
};
