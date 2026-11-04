// /llms.txt — a plain-Markdown summary of the site for answer engines and LLM
// crawlers (llmstxt.org). Built from the same data as the pages, so it never drifts.
import { site, socials } from '#lib/data/site.ts';
import { roles, capabilities, education, awards } from '#lib/data/experience.ts';
import { showcases, projects, openSource } from '#lib/data/projects.ts';
import { listArticles } from '#lib/server/articles.ts';
import { masteringBackend } from '#lib/data/mastering-backend.ts';

export const prerender = true;

const abs = (p: string) => new URL(p, site.url).href;

export function GET() {
	const articles = listArticles();
	const likes = masteringBackend.reduce((sum, a) => sum + a.likes, 0);

	const lines = [
		`# ${site.name}`,
		'',
		`> ${site.description}`,
		'',
		'## Quick facts',
		'',
		`- Name: ${site.name}`,
		`- Role: ${site.role}`,
		`- Location: ${site.location} · ${site.timezone}`,
		`- Open to: remote Rust, backend and full-stack engineering roles`,
		`- Contact: ${site.email}`,
		...socials.map((s) => `- ${s.label}: ${s.href}`),
		'',
		'## Experience',
		'',
		...roles.map(
			(r) =>
				`- **${r.role}, ${r.company}** (${r.start} – ${r.end}, ${r.location}): ${r.headline} Stack: ${r.stack.join(', ')}.`
		),
		`- More: ${abs('/experience')}`,
		'',
		'## Open source',
		'',
		`- ${openSource.summary} (${openSource.href})`,
		...openSource.prs.map((pr) => `  - ${pr.title} — ${pr.href}`),
		'',
		'## Featured projects',
		'',
		...showcases.map(
			(p) =>
				`- **${p.name}** — ${p.tagline}. ${p.summary} Stack: ${p.stack.join(', ')}. ${p.links.map((l) => l.href).join(' ')}`
		),
		'',
		'## Other projects',
		'',
		...projects.map(
			(p) =>
				`- **${p.name}** (${p.year}): ${p.summary}${p.links?.length ? ` ${p.links.map((l) => l.href).join(' ')}` : ''}`
		),
		`- More: ${abs('/projects')}`,
		'',
		'## Skills',
		'',
		...capabilities.map((c) => `- ${c.label}: ${c.items.join(', ')}`),
		'',
		'## Writing',
		'',
		`${articles.length} articles on Rust, mostly on Mastering Backend (${likes.toLocaleString('en-US')}+ likes in total).`,
		'',
		...articles.map((a) => `- [${a.title}](${abs(a.href)}) (${a.date}): ${a.description}`),
		'',
		'## Education and awards',
		'',
		...education.map((e) => `- ${e.title}, ${e.org} (${e.date})`),
		...awards.map((a) => `- ${a.title}, ${a.org}${a.date ? ` (${a.date})` : ''}`),
		''
	];

	return new Response(lines.join('\n'), {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
}
