<script lang="ts">
	import { page } from '$app/state';
	import Starfield from '#lib/visuals/Starfield.svelte';
	import Horizon from '#lib/visuals/Horizon.svelte';
</script>

<svelte:head>
	<title>{page.status} — Chizaram Ugochukwu</title>
</svelte:head>

<section class="lost">
	<div class="lost__bg" aria-hidden="true">
		<Starfield count={200} seed={404} />
		<Horizon />
	</div>
	<div class="container lost__inner">
		<p class="label">Error {page.status}</p>
		<h1 class="display">{page.status === 404 ? 'Signal lost' : 'Mission anomaly'}</h1>
		<p class="lead">
			{page.status === 404
				? 'This page drifted out of range. Head back to base and try another heading.'
				: page.error?.message}
		</p>
		<div class="btn-row">
			<a class="btn" href="/">Return home <span class="arrow" aria-hidden="true">→</span></a>
		</div>
	</div>
</section>

<style>
	.lost {
		position: relative;
		display: grid;
		align-content: end;
		min-height: 100svh;
		padding: var(--nav-h) 0 clamp(96px, 14vh, 150px);
		overflow: hidden;
		isolation: isolate;
	}

	.lost__bg {
		position: absolute;
		inset: 0;
		z-index: -1;
	}

	.lost__inner {
		display: grid;
		gap: 24px;
	}
</style>
