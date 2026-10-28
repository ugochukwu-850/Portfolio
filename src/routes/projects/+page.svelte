<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import Seo from '#lib/components/Seo.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Network from '#lib/visuals/Network.svelte';
	import Equalizer from '#lib/visuals/Equalizer.svelte';
	import ShotGallery from '#lib/components/ShotGallery.svelte';
	import {
		categories,
		openSource,
		projects,
		showcases,
		type Category
	} from '#lib/data/projects.ts';
	import { pad } from '#lib/format.ts';

	let filter = $state<Category | 'All'>('All');
	const visible = $derived(
		filter === 'All' ? projects : projects.filter((p) => p.categories.includes(filter as Category))
	);
	const count = (c: Category) => projects.filter((p) => p.categories.includes(c)).length;
</script>

<Seo
	title="Projects — Chizaram Ugochukwu"
	description="Products, desktop apps, AI tools and systems software by Chizaram Ugochukwu: ArtMostSphere, Jomify, DocConvo, Inspector and more."
	path="/projects"
/>

<PageHero
	label="Built & shipped"
	title="Projects"
	lead="Live products, desktop apps, AI tools and systems software — always shipped."
	seed={14}
>
	{#snippet visual()}<div class="hero-network"><Network seed={44} nodes={30} /></div>{/snippet}
</PageHero>

{#each showcases as show (show.id)}
	<section id={show.id} class="featured" style:--accent={show.accent} data-rule>
		<div class="featured__glow" aria-hidden="true" data-drift></div>
		{#if show.visual === 'equalizer'}
			<div class="featured__visual" aria-hidden="true" data-drift>
				<Equalizer bars={72} seed={9} />
			</div>
		{/if}
		<div class="container featured__inner">
			<div class="featured__copy">
				<p class="label" data-reveal>{show.label}</p>
				<h2 class="display" data-reveal style="--d: 80ms">{show.name}</h2>
				<p class="subtitle" data-reveal style="--d: 140ms">{show.tagline}</p>
				<p class="lead" data-reveal style="--d: 200ms">{show.summary}</p>
				<div class="btn-row" data-reveal style="--d: 260ms">
					{#each show.links as l, i (l.href)}
						<a
							class="btn"
							class:btn--ghost={i > 0}
							href={l.href}
							target="_blank"
							rel="noopener noreferrer">{l.label} <span class="arrow" aria-hidden="true">↗</span></a
						>
					{/each}
				</div>
			</div>
			<dl class="featured__metrics" data-reveal style="--d: 320ms">
				{#each show.facts as m (m.label)}
					<div>
						<dt>{m.label}</dt>
						<dd>{m.value}</dd>
					</div>
				{/each}
				<div class="featured__stack">
					<dt>Stack</dt>
					<dd>{show.stack.join(' · ')}</dd>
				</div>
			</dl>
		</div>
		<div class="featured__gallery" data-reveal style="--d: 120ms">
			<ShotGallery shots={show.shots} size={show.shotSize} label="{show.name} screenshots" />
		</div>
	</section>
{/each}

<section class="section container" aria-labelledby="all-title">
	<header class="list__head">
		<h2 id="all-title" class="title" data-reveal>Selected work</h2>
		<div class="filters" role="group" aria-label="Filter projects" data-reveal style="--d: 80ms">
			<button aria-pressed={filter === 'All'} onclick={() => (filter = 'All')}>
				All <span>{projects.length}</span>
			</button>
			{#each categories as c (c)}
				<button aria-pressed={filter === c} onclick={() => (filter = c)}>
					{c} <span>{count(c)}</span>
				</button>
			{/each}
		</div>
	</header>

	<ul class="rows" role="list">
		{#each visible as p, i (p.id)}
			<li id={p.id} class="row" animate:flip={{ duration: 500 }} in:fade={{ duration: 300 }}>
				<span class="mono row__index">{pad(i + 1)}</span>
				<div class="row__main">
					<h3 class="row__name">
						{p.name}
						{#if p.status}<span class="chip">{p.status}</span>{/if}
					</h3>
					<p class="row__summary">{p.summary}</p>
				</div>
				<p class="row__stack">{p.stack.join(' · ')}</p>
				<div class="row__end">
					<span class="mono row__year">{p.year}</span>
					{#each p.links ?? [] as l (l.href)}
						<a class="row__link" href={l.href} target="_blank" rel="noopener noreferrer"
							>{l.label} <span aria-hidden="true">↗</span><span class="visually-hidden">
								for {p.name}</span
							></a
						>
					{/each}
				</div>
			</li>
		{/each}
	</ul>
</section>

<section class="section container oss" aria-labelledby="oss-title">
	<div class="oss__grid" data-rule>
		<div class="oss__head">
			<p class="label" data-reveal>Open source</p>
			<h2 id="oss-title" class="title" data-reveal style="--d: 80ms">{openSource.project}</h2>
			<p class="lead" data-reveal style="--d: 160ms">{openSource.summary}</p>
			<a
				class="btn btn--ghost"
				href={openSource.href}
				target="_blank"
				rel="noopener noreferrer"
				data-reveal
				style="--d: 240ms">Repository <span class="arrow" aria-hidden="true">↗</span></a
			>
		</div>
		<ul class="prs" role="list" data-reveal style="--d: 160ms">
			{#each openSource.prs as pr (pr.href)}
				<li>
					<a href={pr.href} target="_blank" rel="noopener noreferrer">
						<span class="mono pr__ref">{pr.ref} · Merged</span>
						<span class="pr__title">{pr.title}</span>
						<span class="mono pr__date">{pr.date}</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.hero-network {
		position: absolute;
		inset: 0 0 0 32%;
		opacity: 0.85;
		mask-image: linear-gradient(to right, transparent, #000 40%);
		-webkit-mask-image: linear-gradient(to right, transparent, #000 40%);
	}

	.featured {
		position: relative;
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		align-content: center;
		gap: clamp(56px, 7vw, 96px);
		padding-block: clamp(96px, 12vw, 160px);
		border-top: 1px solid var(--line);
		overflow: hidden;
		isolation: isolate;
		scroll-margin-top: 0;
	}

	/* Equalizer sits behind the copy, rising from the gallery line */
	/* A soft wash of the project's own colour behind its section */
	.featured__glow {
		position: absolute;
		inset: -10% -20% 30%;
		z-index: -2;
		background: radial-gradient(
			ellipse 50% 45% at 70% 35%,
			rgb(var(--accent) / 0.16),
			transparent 70%
		);
		pointer-events: none;
	}

	.featured__visual {
		position: absolute;
		inset: 8% 0 52% 0;
		z-index: -1;
		opacity: 0.3;
	}

	.featured__inner {
		display: grid;
		grid-template-columns: minmax(0, 7fr) minmax(0, 4fr);
		align-items: end;
		gap: 48px clamp(32px, 6vw, 96px);
	}

	.featured__copy {
		display: grid;
		gap: 22px;
	}

	.featured__copy .btn-row {
		margin-top: 10px;
	}

	.featured__metrics {
		margin: 0;
		border-top: 1px solid var(--line-2);
		background: rgb(0 0 0 / 0.55);
		-webkit-backdrop-filter: blur(6px);
		backdrop-filter: blur(6px);
	}

	.featured__metrics div {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 16px;
		padding-block: 16px;
		border-bottom: 1px solid var(--line);
	}

	.featured__metrics dt {
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
	}

	.featured__metrics dd {
		margin: 0;
		font-size: 36px;
		font-weight: 700;
		line-height: 1;
	}

	.featured__metrics .featured__stack {
		flex-direction: column;
		align-items: start;
		gap: 8px;
	}

	.featured__metrics .featured__stack dd {
		font-size: 16px;
		font-weight: 400;
		line-height: 1.5;
		color: var(--fg-2);
	}

	.list__head {
		display: flex;
		flex-wrap: wrap;
		align-items: end;
		justify-content: space-between;
		gap: 28px;
		margin-bottom: 40px;
	}

	.rows {
		border-top: 1px solid var(--line-2);
	}

	.row {
		display: grid;
		grid-template-columns: 56px minmax(0, 6fr) minmax(0, 3fr) minmax(120px, 2fr);
		gap: 12px 28px;
		align-items: baseline;
		padding: 28px 0;
		border-bottom: 1px solid var(--line);
		position: relative;
		isolation: isolate;
		scroll-margin-top: calc(var(--nav-h) + 24px);
	}

	.row::before {
		content: '';
		position: absolute;
		inset: 0 calc(var(--gutter) * -0.5);
		z-index: -1;
		background: var(--bg-raise);
		opacity: 0;
		transition: opacity 0.4s ease;
	}

	.row:hover::before {
		opacity: 1;
	}

	.row__index,
	.row__year {
		color: var(--fg-3);
	}

	.row__main {
		display: grid;
		gap: 8px;
	}

	.row__name {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 12px;
		font-size: clamp(22px, 2.2vw, 30px);
		font-weight: 700;
		line-height: 1.1;
		text-transform: uppercase;
	}

	.row__summary {
		color: var(--fg-2);
		max-width: 60ch;
	}

	.row__stack {
		font-size: 14px;
		color: var(--fg-3);
		line-height: 1.6;
	}

	.row__end {
		display: flex;
		flex-direction: column;
		align-items: end;
		gap: 10px;
	}

	.row__link {
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		border-bottom: 1px solid var(--line-2);
		padding-bottom: 3px;
		transition: border-color 0.3s ease;
	}

	.row__link:hover {
		border-color: var(--fg);
	}

	.oss {
		padding-top: 0;
	}

	.oss__grid {
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
		gap: 40px clamp(32px, 6vw, 96px);
		padding-top: clamp(48px, 7vw, 88px);
		border-top: 1px solid var(--line);
	}

	.oss__head {
		display: grid;
		align-content: start;
		justify-items: start;
		gap: 20px;
	}

	.prs {
		align-self: start;
		border-top: 1px solid var(--line-2);
	}

	.prs a {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 6px 16px;
		padding: 22px 0;
		border-bottom: 1px solid var(--line);
		transition: padding 0.5s var(--ease);
	}

	.prs a:hover {
		padding-left: 10px;
	}

	.pr__ref {
		grid-column: 1 / -1;
		color: var(--fg-3);
		text-transform: uppercase;
	}

	.pr__title {
		font-size: 20px;
		font-weight: 500;
	}

	.pr__date {
		color: var(--fg-3);
		text-transform: uppercase;
		align-self: center;
	}

	@media (max-width: 960px) {
		.featured__inner,
		.oss__grid {
			grid-template-columns: 1fr;
		}

		.row {
			grid-template-columns: 40px minmax(0, 1fr);
		}

		.row__stack,
		.row__end {
			grid-column: 2;
		}

		.row__end {
			flex-direction: row;
			align-items: center;
			gap: 20px;
		}

		.hero-network {
			inset: 0;
			opacity: 0.5;
		}
	}
</style>
