export const topics = [
	'Memory',
	'Traits & Types',
	'Concurrency',
	'Macros & Compiler',
	'Collections',
	'Systems & AI',
	'Fundamentals'
] as const;

export type Topic = (typeof topics)[number];
