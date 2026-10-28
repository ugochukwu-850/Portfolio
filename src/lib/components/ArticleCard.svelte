<script lang="ts">
	import type { ArticleSummary } from '#lib/types.ts';
	import { formatDate } from '#lib/format.ts';

	let { article }: { article: ArticleSummary } = $props();
</script>

<a
	class="card"
	href={article.href}
	target={article.external ? '_blank' : undefined}
	rel={article.external ? 'noopener noreferrer' : undefined}
>
	<p class="card__meta mono">
		<time datetime={article.date}>{formatDate(article.date)}</time>
		<span>{article.source}</span>
	</p>
	<h3 class="card__title">{article.title}</h3>
	<p class="card__text">{article.description}</p>
	<p class="card__foot">
		<span class="card__topics">
			{#each article.topics as t (t)}<span class="chip">{t}</span>{/each}
		</span>
		<span class="card__cta"
			>Read <span aria-hidden="true">{article.external ? '↗' : '→'}</span></span
		>
	</p>
</a>

<style>
	.card {
		display: flex;
		flex-direction: column;
		gap: 16px;
		height: 100%;
		padding: 28px 0 8px;
		border-top: 1px solid var(--line-2);
		position: relative;
	}

	.card::before {
		content: '';
		position: absolute;
		top: -1px;
		left: 0;
		right: 0;
		height: 1px;
		background: var(--fg);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.8s var(--ease);
	}

	.card:hover::before {
		transform: scaleX(1);
	}

	.card__meta {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		color: var(--fg-3);
		text-transform: uppercase;
	}

	.card__title {
		font-size: clamp(20px, 1.8vw, 24px);
		line-height: 1.15;
		font-weight: 700;
		text-transform: uppercase;
		text-wrap: balance;
	}

	.card__text {
		color: var(--fg-2);
		font-size: 16px;
		line-height: 1.55;
	}

	.card__foot {
		margin-top: auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding-top: 8px;
	}

	.card__topics {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.card__cta {
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		white-space: nowrap;
	}

	.card__cta span {
		display: inline-block;
		transition: transform 0.5s var(--ease);
	}

	.card:hover .card__cta span {
		transform: translate(3px, -3px);
	}
</style>
