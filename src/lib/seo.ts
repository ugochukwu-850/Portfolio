// Structured data (schema.org JSON-LD) shared across pages.
// Search engines use it for rich results; answer engines (ChatGPT, Perplexity,
// Gemini, Claude) use it to resolve "who is Chizaram Ugochukwu" to one entity.
import { site, socials } from '#lib/data/site.ts';
import { roles, education } from '#lib/data/experience.ts';

const abs = (path: string) => new URL(path, site.url).href;

export const PERSON_ID = abs('/#person');
export const WEBSITE_ID = abs('/#website');

const current = roles.find((r) => r.current);

export const person = {
	'@type': 'Person',
	'@id': PERSON_ID,
	name: site.name,
	givenName: 'Chizaram',
	familyName: 'Ugochukwu',
	alternateName: ['Chizaram', 'Ugochukwu Chizaram'],
	description: site.description,
	jobTitle: current?.role ?? 'Lead Full-Stack Engineer',
	...(current && { worksFor: { '@type': 'Organization', name: current.company } }),
	url: site.url,
	image: abs('/og.png'),
	email: `mailto:${site.email}`,
	address: {
		'@type': 'PostalAddress',
		addressLocality: 'Lagos',
		addressCountry: 'NG'
	},
	nationality: { '@type': 'Country', name: 'Nigeria' },
	alumniOf: education.map((e) => ({
		'@type': 'CollegeOrUniversity',
		name: e.org.split(' · ')[0]
	})),
	knowsAbout: [
		'Rust',
		'Tokio',
		'Axum',
		'Real-time audio streaming',
		'WebSockets',
		'gRPC',
		'LLM pipelines',
		'Retrieval-augmented generation',
		'Backend engineering',
		'Full-stack web development',
		'SvelteKit',
		'React',
		'TypeScript',
		'Python',
		'Django',
		'PostgreSQL',
		'AWS',
		'Tauri desktop apps'
	],
	sameAs: socials.map((s) => s.href)
};

export const website = {
	'@type': 'WebSite',
	'@id': WEBSITE_ID,
	url: site.url,
	name: site.name,
	description: site.description,
	inLanguage: 'en',
	publisher: { '@id': PERSON_ID }
};

/** Wraps nodes in one @graph so they share ids. */
export const graph = (...nodes: object[]) => ({
	'@context': 'https://schema.org',
	'@graph': nodes
});

export function breadcrumbs(...trail: { name: string; path: string }[]) {
	return {
		'@type': 'BreadcrumbList',
		itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((c, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: c.name,
			item: abs(c.path)
		}))
	};
}

export function webPage(path: string, name: string, description: string, type = 'WebPage') {
	return {
		'@type': type,
		'@id': `${abs(path)}#webpage`,
		url: abs(path),
		name,
		description,
		isPartOf: { '@id': WEBSITE_ID },
		about: { '@id': PERSON_ID },
		inLanguage: 'en'
	};
}

export { abs };
