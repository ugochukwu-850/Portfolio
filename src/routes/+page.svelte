<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import Stats from '#lib/components/Stats.svelte';
	import MissionPanel from '#lib/components/MissionPanel.svelte';
	import ArticleCard from '#lib/components/ArticleCard.svelte';
	import Starfield from '#lib/visuals/Starfield.svelte';
	import Horizon from '#lib/visuals/Horizon.svelte';
	import Waveform from '#lib/visuals/Waveform.svelte';
	import Equalizer from '#lib/visuals/Equalizer.svelte';
	import ShootingStars from '#lib/visuals/ShootingStars.svelte';
	import { parallax } from '#lib/actions/parallax.ts';
	import ShotStage from '#lib/components/ShotStage.svelte';
	import { showcases } from '#lib/data/projects.ts';
	import Network from '#lib/visuals/Network.svelte';
	import { site, socials, stats } from '#lib/data/site.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const [ams, jomify] = showcases;

	const person = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: site.name,
		jobTitle: 'Lead Full-Stack Engineer',
		url: site.url,
		email: `mailto:${site.email}`,
		address: { '@type': 'PostalAddress', addressLocality: 'Lagos', addressCountry: 'NG' },
		sameAs: socials.map((s) => s.href)
	};
	const jsonLd = `<script type="application/ld+json">${JSON.stringify(person)}</` + 'script>';
</script>

<Seo title="{site.name} — Rust & Full-Stack Engineer" path="/" />

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html jsonLd}
</svelte:head>

<section class="hero" use:parallax>
	<div class="hero__bg" aria-hidden="true">
		<div class="layer layer--stars">
			<Starfield count={240} seed={11} />
			<ShootingStars />
		</div>
		<div class="layer layer--planet"><Horizon /></div>
	</div>

	<div class="container hero__inner" data-hero-out>
		<p class="label intro">{site.name} — {site.location}</p>
		<h1 class="display intro" style="--d: 100ms">Engineering real-time systems in Rust</h1>
		<p class="lead intro" style="--d: 200ms">
			Lead full-stack engineer shipping streaming pipelines, LLM systems and the APIs behind them —
			in Rust, Python and TypeScript.
		</p>
		<div class="btn-row intro" style="--d: 300ms">
			<a class="btn" href="/experience"
				>View experience <span class="arrow" aria-hidden="true">→</span></a
			>
			<a class="btn btn--ghost" href="/writing">Read the log</a>
		</div>
	</div>

	<a class="scroll-cue" href="#record" aria-label="Scroll to track record"><span></span></a>
</section>

<section id="record" class="container record">
	<Stats items={stats} />
</section>

<MissionPanel
	id="current"
	label="Current mission · 2025 — Present"
	title="Commerce meets social"
	text="At Trenqit I lead full-stack development of an e-commerce marketplace with a built-in social feed — Django REST, PostgreSQL and Celery underneath, React and TypeScript on top."
	actions={[{ label: 'Mission details', href: '/experience#trenqit' }]}
>
	{#snippet visual()}<Network />{/snippet}
</MissionPanel>

<MissionPanel
	label="Searchless · 2025 — 2026"
	title="Real-time voice, under one second"
	text="Streaming WebM demuxing in Rust that decodes Opus to PCM for live voice synthesis, Google Chirp 3 speech-to-text over gRPC, and LLM scoring moved into deterministic Rust."
	actions={[{ label: 'Mission details', href: '/experience#searchless' }]}
	align="right"
>
	{#snippet visual()}<Waveform />{/snippet}
</MissionPanel>

<MissionPanel
	label="Live product · Lead FDE, frontend"
	title="The production ecosystem for Africa"
	text="ArtMostSphere puts a shoot’s locations, gear, cast and planning in one place, starting in Nigeria. I lead its Next.js and TypeScript frontend as FDE — from marketplace search to the Production Planner."
	actions={[
		{ label: 'View project', href: '/projects#artmostsphere' },
		{ label: 'Visit site', href: 'https://artmostsphere.vercel.app', external: true }
	]}
>
	{#snippet visual()}
		<ShotStage shot={ams.shots[0]} size={ams.shotSize} accent={ams.accent} />
	{/snippet}
</MissionPanel>

<MissionPanel
	label="Flagship project"
	title="Your music, offline, everywhere"
	text="Jomify is a cross-platform music player in Rust and Tauri, with Spotify and YouTube integration and multi-threaded playback on Rodio — the audio library I contribute to."
	actions={[
		{ label: 'View project', href: '/projects#jomify' },
		{ label: 'Source', href: 'https://github.com/ugochukwu-850/Jomify', external: true }
	]}
	align="right"
>
	{#snippet visual()}
		<ShotStage shot={jomify.shots[0]} size={jomify.shotSize} accent={jomify.accent} tilt="right">
			<div class="stage-eq"><Equalizer seed={31} bars={84} /></div>
		</ShotStage>
	{/snippet}
</MissionPanel>

<section class="section log">
	<div class="container">
		<header class="log__head">
			<div>
				<p class="label" data-reveal>From the log</p>
				<h2 class="title" data-reveal style="--d: 80ms">Writing on Rust</h2>
			</div>
			<a class="btn btn--ghost" href="/writing" data-reveal style="--d: 160ms">
				All articles <span class="arrow" aria-hidden="true">→</span>
			</a>
		</header>
		<div class="log__grid">
			{#each data.latest as article, i (article.href)}
				<div data-reveal style="--d: {i * 100}ms"><ArticleCard {article} /></div>
			{/each}
		</div>
	</div>
</section>

<section id="contact" class="contact" data-rule>
	<div class="contact__bg" aria-hidden="true">
		<Starfield count={120} seed={3} />
	</div>
	<div class="container contact__inner">
		<p class="label" data-reveal>Open to new missions</p>
		<h2 class="display" data-reveal style="--d: 80ms">Let’s build something that ships</h2>
		<p class="lead" data-reveal style="--d: 160ms">
			Rust backend, full-stack and real-time systems roles — remote, hybrid or relocation.
		</p>
		<div class="btn-row" data-reveal style="--d: 240ms">
			<a class="btn" href="mailto:{site.email}"
				>Email me <span class="arrow" aria-hidden="true">→</span></a
			>
			<a class="btn btn--ghost" href={socials[1].href} target="_blank" rel="noopener noreferrer">
				LinkedIn <span class="arrow" aria-hidden="true">↗</span>
			</a>
			<a class="btn btn--ghost" href={socials[0].href} target="_blank" rel="noopener noreferrer">
				GitHub <span class="arrow" aria-hidden="true">↗</span>
			</a>
		</div>
		<a class="contact__mail mono link" href="mailto:{site.email}" data-reveal style="--d: 320ms"
			>{site.email}</a
		>
	</div>
</section>

<style>
	.hero {
		position: relative;
		display: grid;
		align-content: end;
		min-height: 100svh;
		padding-top: var(--nav-h);
		padding-bottom: clamp(96px, 14vh, 150px);
		overflow: hidden;
		isolation: isolate;
	}

	.hero__bg {
		position: absolute;
		inset: 0;
		z-index: -1;
	}

	/* Layers drift a few pixels against the pointer; the oversize hides their edges. */
	.layer {
		position: absolute;
		inset: -24px;
		will-change: translate;
	}

	.layer--stars {
		translate: calc(var(--px, 0) * -7px) calc(var(--py, 0) * -5px);
		animation: star-drift 120s linear infinite alternate;
	}

	.layer--planet {
		translate: calc(var(--px, 0) * -16px) calc(var(--py, 0) * -9px);
	}

	@keyframes star-drift {
		to {
			transform: translate3d(-18px, 10px, 0);
		}
	}

	.hero__bg::after {
		content: '';
		position: absolute;
		inset: auto 0 0;
		height: 22%;
		background: linear-gradient(to bottom, transparent, var(--bg));
	}

	.hero__inner {
		display: grid;
		gap: 26px;
	}

	.hero .display {
		max-width: 12ch;
	}

	.intro {
		animation: intro 1.4s var(--ease) both;
		animation-delay: var(--d, 0ms);
	}

	@keyframes intro {
		from {
			opacity: 0;
			transform: translateY(28px);
		}
	}

	.hero .btn-row {
		margin-top: 8px;
	}

	.scroll-cue {
		position: absolute;
		left: 50%;
		bottom: 28px;
		width: 1px;
		height: 56px;
		background: var(--line);
		overflow: hidden;
	}

	.scroll-cue span {
		position: absolute;
		inset: 0;
		background: var(--fg);
		animation: cue 2.4s var(--ease-io) infinite;
	}

	@keyframes cue {
		0% {
			transform: translateY(-100%);
		}
		60%,
		100% {
			transform: translateY(100%);
		}
	}

	.record {
		padding-block: clamp(72px, 10vw, 140px);
	}

	.log__head {
		display: flex;
		flex-wrap: wrap;
		align-items: end;
		justify-content: space-between;
		gap: 28px;
		margin-bottom: clamp(40px, 6vw, 72px);
	}

	.log__head > div {
		display: grid;
		gap: 18px;
	}

	.log__grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 40px 32px;
	}

	.contact {
		position: relative;
		display: grid;
		align-items: center;
		min-height: min(100svh, 900px);
		padding-block: clamp(96px, 12vw, 160px);
		border-top: 1px solid var(--line);
		overflow: hidden;
		isolation: isolate;
	}

	.contact__bg {
		position: absolute;
		inset: 0;
		z-index: -1;
	}

	.contact__bg::after {
		content: '';
		position: absolute;
		left: 50%;
		bottom: -60%;
		width: 140%;
		aspect-ratio: 2.2;
		transform: translateX(-50%);
		background: radial-gradient(closest-side, rgb(var(--glow) / 0.22), transparent);
	}

	.contact__inner {
		display: grid;
		gap: 26px;
		justify-items: center;
		text-align: center;
	}

	.contact .display {
		max-width: 14ch;
	}

	.contact .btn-row {
		justify-content: center;
		margin-top: 8px;
	}

	.contact__mail {
		color: var(--fg-3);
		font-size: 13px;
	}

	.stage-eq {
		position: absolute;
		inset: 52% 0 0 0;
		opacity: 0.55;
	}

	@media (max-width: 960px) {
		.log__grid {
			grid-template-columns: 1fr;
		}
	}
</style>
