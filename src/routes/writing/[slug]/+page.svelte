<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import ArticleCard from '#lib/components/ArticleCard.svelte';
	import Starfield from '#lib/visuals/Starfield.svelte';
	import { formatDate } from '#lib/format.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const article = $derived(data.article);
</script>

<Seo
	title="{article.title} — Chizaram Ugochukwu"
	description={article.description}
	path={article.href}
	type="article"
/>

<article>
	<header class="head">
		<div class="head__bg" aria-hidden="true"><Starfield count={90} seed={23} /></div>
		<div class="container head__inner">
			<a class="back link" href="/writing">← The log</a>
			<p class="label">
				<time datetime={article.date}>{formatDate(article.date)}</time> · {article.readingMinutes} min
				read
			</p>
			<h1 class="title head__title">{article.title}</h1>
			<p class="lead">{article.description}</p>
			<p class="head__topics">
				{#each article.topics as t (t)}<span class="chip">{t}</span>{/each}
			</p>
		</div>
	</header>

	<div class="container">
		<!-- Rendered at build time from Markdown in src/content/articles -->
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<div class="prose">{@html article.html}</div>
	</div>
</article>

{#if data.more.length}
	<section class="section container more" aria-labelledby="more-title">
		<h2 id="more-title" class="label">Keep reading</h2>
		<div class="more__grid">
			{#each data.more as a (a.href)}
				<ArticleCard article={a} />
			{/each}
		</div>
	</section>
{/if}

<style>
	.head {
		position: relative;
		padding: calc(var(--nav-h) + clamp(64px, 10vw, 140px)) 0 clamp(48px, 6vw, 72px);
		border-bottom: 1px solid var(--line);
		overflow: hidden;
		isolation: isolate;
	}

	.head__bg {
		position: absolute;
		inset: 0;
		z-index: -1;
		opacity: 0.7;
	}

	.head__inner {
		display: grid;
		gap: 22px;
		max-width: calc(var(--max) * 0.72);
	}

	.back {
		justify-self: start;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--fg-2);
	}

	.head__title {
		font-size: clamp(36px, 5vw, 68px);
	}

	.head__topics {
		display: flex;
		gap: 6px;
	}

	.prose {
		max-width: 70ch;
		padding-block: clamp(48px, 7vw, 96px);
		font-size: 19px;
		line-height: 1.75;
		color: rgb(240 240 250 / 0.84);
	}

	.prose :global(> * + *) {
		margin-top: 1.25em;
	}

	.prose :global(h2) {
		margin-top: 2.4em;
		font-size: 28px;
		line-height: 1.15;
		font-weight: 700;
		text-transform: uppercase;
		color: var(--fg);
		scroll-margin-top: calc(var(--nav-h) + 24px);
	}

	.prose :global(h3) {
		margin-top: 2em;
		font-size: 21px;
		font-weight: 700;
		color: var(--fg);
	}

	.prose :global(a) {
		color: var(--fg);
		text-decoration: underline;
		text-decoration-color: var(--line-2);
		text-underline-offset: 4px;
		transition: text-decoration-color 0.3s ease;
	}

	.prose :global(a:hover) {
		text-decoration-color: var(--fg);
	}

	.prose :global(ul),
	.prose :global(ol) {
		padding-left: 1.3em;
	}

	.prose :global(li + li) {
		margin-top: 0.5em;
	}

	.prose :global(li::marker) {
		color: var(--fg-3);
	}

	.prose :global(strong) {
		color: var(--fg);
	}

	.prose :global(blockquote) {
		padding-left: 24px;
		border-left: 2px solid var(--fg);
		color: var(--fg);
	}

	.prose :global(:not(pre) > code) {
		font-family: var(--mono);
		font-size: 0.82em;
		padding: 0.15em 0.4em;
		background: var(--bg-raise-2);
		border: 1px solid var(--line);
	}

	.prose :global(pre) {
		margin-top: 1.6em;
		margin-bottom: 1.6em;
		padding: 24px 26px;
		overflow-x: auto;
		background: var(--bg-raise) !important;
		border: 1px solid var(--line);
		border-left: 2px solid var(--fg-3);
		font-family: var(--mono);
		font-size: 14px;
		line-height: 1.7;
	}

	.more {
		border-top: 1px solid var(--line);
	}

	.more__grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 40px 32px;
		margin-top: 32px;
	}

	@media (max-width: 960px) {
		.more__grid {
			grid-template-columns: 1fr;
		}
	}
</style>
