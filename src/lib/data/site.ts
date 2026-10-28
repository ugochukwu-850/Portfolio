export const site = {
	name: 'Chizaram Ugochukwu',
	shortName: 'Chizaram',
	role: 'Lead Full-Stack Engineer · Rust',
	location: 'Lagos, Nigeria',
	timezone: 'WAT (UTC+1)',
	url: 'https://chizaram-ugochukwu.cv',
	email: 'ugochukwuchizaram850@gmail.com',
	description:
		'Chizaram Ugochukwu is a Rust and full-stack engineer in Lagos, Nigeria, building real-time systems, LLM pipelines and the APIs behind them.'
};

export const socials = [
	{ label: 'GitHub', href: 'https://github.com/ugochukwu-850' },
	{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/ugochukwu-chizaram' },
	{ label: 'Mastering Backend', href: 'https://blog.masteringbackend.com/authors/chizaram' },
	{ label: 'Medium', href: 'https://medium.com/@ugochukwuchizaramoku' },
	{ label: 'X', href: 'https://twitter.com/zara_tech006' }
];

export const nav = [
	{ label: 'Experience', href: '/experience' },
	{ label: 'Projects', href: '/projects' },
	{ label: 'Writing', href: '/writing' }
] as const;

export const stats = [
	{ value: 3, suffix: '+', label: 'Years shipping production code' },
	{ value: 400, suffix: '+', label: 'Commits to a production Rust platform' },
	{ value: 30, suffix: '', label: 'Articles on Rust, published' },
	{ value: null, display: '<1s', label: 'Time to first audio, in production' }
];
