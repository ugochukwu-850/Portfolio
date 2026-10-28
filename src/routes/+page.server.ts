import { listArticles } from '#lib/server/articles.ts';

export function load() {
	return { latest: listArticles().slice(0, 3) };
}
