<script lang="ts">
	import type { Snippet } from 'svelte';
	import Starfield from '#lib/visuals/Starfield.svelte';

	let {
		label,
		title,
		lead,
		seed = 5,
		visual,
		children
	}: {
		label: string;
		title: string;
		lead?: string;
		seed?: number;
		visual?: Snippet;
		children?: Snippet;
	} = $props();
</script>

<section class="hero">
	<div class="hero__bg" aria-hidden="true">
		<Starfield {seed} count={140} />
		{@render visual?.()}
	</div>
	<div class="container hero__inner">
		<p class="label intro">{label}</p>
		<h1 class="display intro" style="--d: 90ms">{title}</h1>
		{#if lead}
			<p class="lead intro" style="--d: 180ms">{lead}</p>
		{/if}
		{#if children}
			<div class="intro" style="--d: 270ms">{@render children()}</div>
		{/if}
	</div>
</section>

<style>
	.hero {
		position: relative;
		display: grid;
		align-content: end;
		min-height: clamp(560px, 84svh, 920px);
		padding-top: var(--nav-h);
		padding-bottom: clamp(56px, 8vw, 96px);
		overflow: hidden;
		isolation: isolate;
	}

	.hero__bg {
		position: absolute;
		inset: 0;
		z-index: -1;
	}

	.hero__bg::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(to bottom, transparent 55%, var(--bg));
	}

	.hero__inner {
		display: grid;
		gap: 24px;
	}

	.intro {
		animation: intro 1.3s var(--ease) both;
		animation-delay: var(--d, 0ms);
	}

	@keyframes intro {
		from {
			opacity: 0;
			transform: translateY(24px);
		}
	}
</style>
