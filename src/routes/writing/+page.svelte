<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Stats from '#lib/components/Stats.svelte';
	import Horizon from '#lib/visuals/Horizon.svelte';
	import { topics, type Topic } from '#lib/data/topics.ts';
	import { socials } from '#lib/data/site.ts';
	import { formatDate } from '#lib/format.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let topic = $state<Topic | 'All'>('All');
	const visible = $derived(
		topic === 'All' ? data.articles : data.articles.filter((a) => a.topics.includes(topic as Topic))
	);
	const count = (t: Topic) => data.articles.filter((a) => a.topics.includes(t)).length;
	const external = $derived(data.articles.filter((a) => a.external).length);
	const mastering = socials.find((s) => s.label === 'Mastering Backend')!;
</script>

<Seo
	title="Writing — Chizaram Ugochukwu"
	description="Articles on Rust by Chizaram Ugochukwu, published on Mastering Backend: ownership and memory, traits and types, concurrency, macros and building real systems."
	path="/writing"
/>

<PageHero
	label="The log"
	title="Writing"
	lead="Articles on Rust for Mastering Backend — memory, traits, concurrency and the systems underneath."
	seed={17}
>
	{#snippet visual()}<Horizon variant="eclipse" />{/snippet}
</PageHero>

<section class="container summary">
	<Stats
		size="md"
		items={[
			{ value: external, label: 'Articles on Mastering Backend' },
			{ value: Math.floor(data.likes / 100) * 100, suffix: '+', label: 'Reader likes' },
			{ value: topics.length, label: 'Topics covered' }
		]}
	/>
</section>

<section class="container index" aria-labelledby="index-title">
	<header class="index__head">
		<h2 id="index-title" class="label">Index · {visible.length} articles</h2>
		<div class="filters" role="group" aria-label="Filter by topic">
			<button aria-pressed={topic === 'All'} onclick={() => (topic = 'All')}>
				All <span>{data.articles.length}</span>
			</button>
			{#each topics as t (t)}
				<button aria-pressed={topic === t} onclick={() => (topic = t)}>
					{t} <span>{count(t)}</span>
				</button>
			{/each}
		</div>
	</header>

	<ol class="list" role="list">
		{#each visible as a (a.href)}
			<li>
				<a
					class="entry"
					href={a.href}
					target={a.external ? '_blank' : undefined}
					rel={a.external ? 'noopener noreferrer' : undefined}
				>
					<time class="mono entry__date" datetime={a.date}>{formatDate(a.date)}</time>
					<span class="entry__main">
						<span class="entry__title">{a.title}</span>
						<span class="entry__desc">{a.description}</span>
					</span>
					<span class="entry__topics">
						{#each a.topics as t (t)}<span class="chip">{t}</span>{/each}
					</span>
					<span class="entry__source">
						{a.source}
						<span class="entry__arrow" aria-hidden="true">{a.external ? '↗' : '→'}</span>
					</span>
				</a>
			</li>
		{/each}
	</ol>

	<p class="index__foot">
		<a class="btn btn--ghost" href={mastering.href} target="_blank" rel="noopener noreferrer">
			Author page on Mastering Backend <span class="arrow" aria-hidden="true">↗</span>
		</a>
	</p>
</section>

<style>
	.summary {
		padding-block: clamp(48px, 7vw, 96px);
	}

	.index {
		padding-bottom: clamp(80px, 12vw, 160px);
	}

	.index__head {
		display: grid;
		gap: 20px;
		margin-bottom: 28px;
	}

	.list {
		border-top: 1px solid var(--line-2);
	}

	.entry {
		position: relative;
		isolation: isolate;
		display: grid;
		grid-template-columns: 120px minmax(0, 1fr) minmax(0, 220px) 170px;
		gap: 10px 28px;
		align-items: baseline;
		padding: 24px 0;
		border-bottom: 1px solid var(--line);
	}

	.entry::before {
		content: '';
		position: absolute;
		inset: 0 calc(var(--gutter) * -0.5);
		z-index: -1;
		background: var(--bg-raise);
		opacity: 0;
		transition: opacity 0.4s ease;
	}

	.entry:hover::before {
		opacity: 1;
	}

	.entry__date {
		color: var(--fg-3);
		text-transform: uppercase;
	}

	.entry__main {
		display: grid;
		gap: 6px;
	}

	.entry__title {
		font-size: clamp(19px, 1.7vw, 22px);
		font-weight: 700;
		line-height: 1.2;
	}

	.entry__desc {
		color: var(--fg-3);
		font-size: 15px;
		line-height: 1.5;
		max-width: 70ch;
	}

	.entry__topics {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.entry__source {
		justify-self: end;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--fg-2);
		white-space: nowrap;
	}

	.entry__arrow {
		display: inline-block;
		margin-left: 6px;
		transition: transform 0.5s var(--ease);
	}

	.entry:hover .entry__arrow {
		transform: translate(3px, -3px);
	}

	.index__foot {
		margin-top: 48px;
	}

	@media (max-width: 960px) {
		.entry {
			grid-template-columns: 1fr;
			gap: 12px;
		}

		.entry__source {
			justify-self: start;
		}
	}
</style>
