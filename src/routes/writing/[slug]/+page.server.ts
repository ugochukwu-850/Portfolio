import { error } from '@sveltejs/kit';
import { getArticle, listArticles, localSlugs } from '#lib/server/articles.ts';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () => localSlugs().map((slug) => ({ slug }));

export const load: PageServerLoad = async ({ params }) => {
	const article = await getArticle(params.slug);
	if (!article) error(404, 'Article not found');

	const more = listArticles()
		.filter((a) => a.slug !== article.slug && a.topics.some((t) => article.topics.includes(t)))
		.slice(0, 3);

	return { article, more };
};
