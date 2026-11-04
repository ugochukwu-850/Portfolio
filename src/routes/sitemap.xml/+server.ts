import { site } from '#lib/data/site.ts';
import { listArticles } from '#lib/server/articles.ts';

export const prerender = true;

export function GET() {
	const articles = listArticles();
	const latest = articles[0]?.date;
	const built = new Date().toISOString().slice(0, 10);

	const pages: { path: string; lastmod?: string; priority: string }[] = [
		{ path: '/', lastmod: built, priority: '1.0' },
		{ path: '/experience', lastmod: built, priority: '0.9' },
		{ path: '/projects', lastmod: built, priority: '0.9' },
		{ path: '/writing', lastmod: latest, priority: '0.8' },
		...articles
			.filter((a) => !a.external)
			.map((a) => ({ path: a.href, lastmod: a.date, priority: '0.6' }))
	];

	const urls = pages
		.map(
			(p) =>
				`<url><loc>${new URL(p.path, site.url).href}</loc>${p.lastmod ? `<lastmod>${p.lastmod}</lastmod>` : ''}<priority>${p.priority}</priority></url>`
		)
		.join('');
	const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

	return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
