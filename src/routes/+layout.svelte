<script lang="ts">
	import '../app.css';
	import { afterNavigate, onNavigate } from '$app/navigation';
	import Nav from '#lib/components/Nav.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import fontRegular from '#lib/assets/fonts/D-DIN-PRO-400-Regular.woff2';
	import fontBold from '#lib/assets/fonts/D-DIN-PRO-700-Bold.woff2';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	// Cross-fade between pages with the View Transitions API where the browser supports it.
	onNavigate((navigation) => {
		if (!document.startViewTransition || document.visibilityState === 'hidden') return;
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		if (navigation.from?.url.pathname === navigation.to?.url.pathname) return;

		return new Promise((resolve) => {
			const transition = document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
			// A skipped transition rejects `ready`; the navigation itself still completes.
			transition.ready.catch(() => {});
		});
	});

	// One observer reveals every [data-reveal] element as it scrolls into view.
	let observer: IntersectionObserver | undefined;

	afterNavigate(() => {
		observer ??= new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					entry.target.classList.add('in');
					observer?.unobserve(entry.target);
				}
			},
			{ rootMargin: '0px 0px -6% 0px', threshold: 0.06 }
		);
		document.querySelectorAll('[data-reveal]:not(.in)').forEach((el) => observer?.observe(el));
	});
</script>

<svelte:head>
	<link rel="preload" href={fontRegular} as="font" type="font/woff2" crossorigin="anonymous" />
	<link rel="preload" href={fontBold} as="font" type="font/woff2" crossorigin="anonymous" />
</svelte:head>

<a class="skip" href="#main">Skip to content</a>
<Nav />
<main id="main">
	{@render children()}
</main>
<Footer />

<style>
	.skip {
		position: fixed;
		top: 12px;
		left: 12px;
		z-index: 200;
		padding: 10px 16px;
		background: var(--fg);
		color: #000;
		font-size: 13px;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		transform: translateY(-200%);
	}

	.skip:focus {
		transform: none;
	}
</style>
