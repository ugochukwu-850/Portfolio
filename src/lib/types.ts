import type { Topic } from '#lib/data/topics.ts';

export type ArticleSummary = {
	slug: string;
	title: string;
	date: string;
	description: string;
	topics: Topic[];
	href: string;
	external: boolean;
	source: string;
};

export type Article = ArticleSummary & { html: string; readingMinutes: number };

export type Stat = { value: number | null; suffix?: string; display?: string; label: string };
