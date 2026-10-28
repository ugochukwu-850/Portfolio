import { listArticles } from '#lib/server/articles.ts';
import { masteringBackend } from '#lib/data/mastering-backend.ts';

export function load() {
	return {
		articles: listArticles(),
		likes: masteringBackend.reduce((sum, a) => sum + a.likes, 0)
	};
}
