import amsHero from '#lib/assets/artmostsphere/hero.webp';
import amsHeroSm from '#lib/assets/artmostsphere/hero-sm.webp';
import amsEverything from '#lib/assets/artmostsphere/everything.webp';
import amsEverythingSm from '#lib/assets/artmostsphere/everything-sm.webp';
import amsPlanner from '#lib/assets/artmostsphere/planner.webp';
import amsPlannerSm from '#lib/assets/artmostsphere/planner-sm.webp';
import amsProcess from '#lib/assets/artmostsphere/process.webp';
import amsProcessSm from '#lib/assets/artmostsphere/process-sm.webp';
import jomHome from '#lib/assets/jomify/home.webp';
import jomHomeSm from '#lib/assets/jomify/home-sm.webp';
import jomSearch from '#lib/assets/jomify/search.webp';
import jomSearchSm from '#lib/assets/jomify/search-sm.webp';
import jomPlaylist from '#lib/assets/jomify/playlist.webp';
import jomPlaylistSm from '#lib/assets/jomify/playlist-sm.webp';
import jomArtist from '#lib/assets/jomify/artist.webp';
import jomArtistSm from '#lib/assets/jomify/artist-sm.webp';

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

export type Shot = { src: string; sm: string; title: string; alt: string };

export type Showcase = {
	id: string;
	name: string;
	label: string;
	tagline: string;
	summary: string;
	stack: string[];
	facts: { value: string; label: string }[];
	links: { label: string; href: string }[];
	shots: Shot[];
	/** Pixel size of the screenshots, so the page reserves their space before they load */
	shotSize: [number, number];
	/** RGB triplet used for the section's glow and screenshot shadows */
	accent: string;
	visual?: 'equalizer';
};

export const showcases: Showcase[] = [
	{
		id: 'artmostsphere',
		name: 'ArtMostSphere',
		label: 'Live product · Lead FDE, frontend',
		tagline: 'The production ecosystem for Africa',
		summary:
			'One place for a shoot’s locations, gear, cast and planning, starting in Nigeria. I lead the frontend as FDE: the marketplace search, provider listings and the Production Planner that turns a brief into a production plan.',
		stack: ['Next.js', 'TypeScript'],
		facts: [
			{ value: 'Lead', label: 'FDE, frontend' },
			{ value: '4', label: 'Marketplaces in one' },
			{ value: 'NG', label: 'Launch market' }
		],
		links: [
			{ label: 'Visit site', href: 'https://artmostsphere.vercel.app' },
			{ label: 'Source', href: 'https://github.com/ugochukwu-850/Atmosphere' }
		],
		shots: [
			{
				src: amsHero,
				sm: amsHeroSm,
				title: 'Landing',
				alt: 'ArtMostSphere landing page: “Find what your next shoot needs” with a search for locations, cast, rental and purchase gear'
			},
			{
				src: amsEverything,
				sm: amsEverythingSm,
				title: 'Marketplaces',
				alt: 'ArtMostSphere section showing location, gear and cast & talent marketplaces as image cards'
			},
			{
				src: amsPlanner,
				sm: amsPlannerSm,
				title: 'Planner',
				alt: 'ArtMostSphere Production Planner showing a Fashion Hall event with location, camera, lenses, lighting, audio and cast requirements'
			},
			{
				src: amsProcess,
				sm: amsProcessSm,
				title: 'How it works',
				alt: 'ArtMostSphere four-step process from describing a shoot to connecting with providers'
			}
		],
		shotSize: [1424, 890],
		accent: '196 92 56'
	},
	{
		id: 'jomify',
		name: 'Jomify',
		label: 'Featured · Open source',
		tagline: 'Your music, offline, everywhere',
		summary:
			'A cross-platform offline music player with Spotify and YouTube integration, track downloads and multi-threaded async playback on Rodio, across Windows, macOS and Linux.',
		stack: ['Rust', 'Tauri', 'React', 'TypeScript', 'Rodio', 'ffmpeg'],
		facts: [
			{ value: '17', label: 'GitHub stars' },
			{ value: '3', label: 'Desktop platforms' },
			{ value: '2', label: 'Streaming sources' }
		],
		links: [
			{ label: 'View source', href: 'https://github.com/ugochukwu-850/Jomify' },
			{ label: 'Releases', href: 'https://github.com/ugochukwu-850/Jomify/releases' }
		],
		shots: [
			{
				src: jomHome,
				sm: jomHomeSm,
				title: 'Home',
				alt: 'Jomify home screen with featured Spotify playlists and a gallery of albums'
			},
			{
				src: jomSearch,
				sm: jomSearchSm,
				title: 'Search',
				alt: 'Jomify search results for an artist, listing tracks with album and duration'
			},
			{
				src: jomPlaylist,
				sm: jomPlaylistSm,
				title: 'Playlists',
				alt: 'Jomify playlist page with download, favourite and play-next actions'
			},
			{
				src: jomArtist,
				sm: jomArtistSm,
				title: 'Artists',
				alt: 'Jomify artist page with discography and follower count'
			}
		],
		shotSize: [1600, 858],
		accent: '118 166 255',
		visual: 'equalizer'
	}
];

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
