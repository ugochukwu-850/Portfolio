import { Marked, type Tokens } from 'marked';
import { createHighlighter, type Highlighter } from 'shiki';
import { masteringBackend, MB_BASE } from '#lib/data/mastering-backend.ts';
import { topics as allTopics, type Topic } from '#lib/data/topics.ts';
import type { Article, ArticleSummary } from '#lib/types.ts';

type LocalFile = { meta: Record<string, string>; body: string };

const files = import.meta.glob<string>('/src/content/articles/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
});

// Front matter is a flat `key: value` block between `---` fences.
function parseFile(raw: string): LocalFile {
	const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
	if (!match) return { meta: {}, body: raw };
	const meta: Record<string, string> = {};
	for (const line of match[1].split(/\r?\n/)) {
		const i = line.indexOf(':');
		if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
	}
	return { meta, body: raw.slice(match[0].length) };
}

function toTopics(value = ''): Topic[] {
	return value
		.split(',')
		.map((t) => t.trim())
		.filter((t): t is Topic => (allTopics as readonly string[]).includes(t));
}

const local = Object.entries(files).map(([path, raw]) => {
	const slug = path.split('/').pop()!.replace(/\.md$/, '');
	return { slug, ...parseFile(raw) };
});

function localSummary({ slug, meta }: (typeof local)[number]): ArticleSummary {
	return {
		slug,
		title: meta.title ?? slug,
		date: meta.date ?? '',
		description: meta.description ?? '',
		topics: toTopics(meta.topics),
		href: `/writing/${slug}`,
		external: false,
		source: 'This site'
	};
}

export function listArticles(): ArticleSummary[] {
	const external: ArticleSummary[] = masteringBackend.map((a) => ({
		slug: a.slug,
		title: a.title,
		date: a.date,
		description: a.excerpt,
		topics: a.topics,
		href: `${MB_BASE}/${a.slug}`,
		external: true,
		source: 'Mastering Backend'
	}));
	return [...local.map(localSummary), ...external].sort((a, b) => b.date.localeCompare(a.date));
}

export function localSlugs(): string[] {
	return local.map((a) => a.slug);
}

let highlighter: Promise<Highlighter> | undefined;

function getHighlighter() {
	highlighter ??= createHighlighter({
		themes: ['vitesse-black'],
		langs: ['rust', 'typescript', 'javascript', 'bash', 'toml', 'json', 'python', 'sql']
	});
	return highlighter;
}

const slugify = (text: string) =>
	text
		.toLowerCase()
		.replace(/<[^>]+>/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');

export async function getArticle(slug: string): Promise<Article | undefined> {
	const file = local.find((a) => a.slug === slug);
	if (!file) return undefined;

	const hl = await getHighlighter();
	const loaded = hl.getLoadedLanguages();
	const marked = new Marked({
		renderer: {
			code({ text, lang }: Tokens.Code) {
				const language = lang && loaded.includes(lang) ? lang : 'text';
				return hl.codeToHtml(text, { lang: language, theme: 'vitesse-black' });
			},
			heading({ tokens, depth }: Tokens.Heading) {
				const inner = this.parser.parseInline(tokens);
				return `<h${depth} id="${slugify(inner)}">${inner}</h${depth}>\n`;
			},
			link({ href, title, tokens }: Tokens.Link) {
				const inner = this.parser.parseInline(tokens);
				const external = /^https?:\/\//.test(href);
				const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : '';
				const t = title ? ` title="${title}"` : '';
				return `<a href="${href}"${t}${attrs}>${inner}</a>`;
			}
		}
	});

	const words = file.body.split(/\s+/).filter(Boolean).length;
	return {
		...localSummary(file),
		html: await marked.parse(file.body),
		readingMinutes: Math.max(1, Math.round(words / 220))
	};
}
