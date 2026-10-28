import { site } from '#lib/data/site.ts';
import { localSlugs } from '#lib/server/articles.ts';

export const prerender = true;

export function GET() {
	const paths = [
		'/',
		'/experience',
		'/projects',
		'/writing',
		...localSlugs().map((s) => `/writing/${s}`)
	];
	const urls = paths.map((p) => `<url><loc>${new URL(p, site.url).href}</loc></url>`).join('');
	const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

	return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
