<script lang="ts">
	import 'lenis/dist/lenis.css';
	import '../app.css';
	import { onMount } from 'svelte';
	import { afterNavigate, onNavigate } from '$app/navigation';
	import { startSmoothScroll } from '#lib/smooth-scroll.ts';
	import Nav from '#lib/components/Nav.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import fontRegular from '#lib/assets/fonts/D-DIN-PRO-400-Regular.woff2';
	import fontBold from '#lib/assets/fonts/D-DIN-PRO-700-Bold.woff2';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
	let main: HTMLElement;

	onMount(startSmoothScroll);

	const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

	// Pages hand over with the View Transitions API: the old page sinks and blurs out,
	// the new one rises in. Browsers without it get a CSS entrance on <main> instead.
	onNavigate((navigation) => {
		if (navigation.from?.url.pathname === navigation.to?.url.pathname) return;
		if (reducedMotion() || document.visibilityState === 'hidden') return;
		if (!document.startViewTransition) {
			navigation.complete.then(() => {
				main.classList.remove('page-enter');
				void main.offsetWidth; // restart the animation
				main.classList.add('page-enter');
			});
			return;
		}

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
	// Masked headings start fully clipped, which IntersectionObserver reads as zero area,
	// so those are watched through their parent instead.
	let observer: IntersectionObserver | undefined;
	const watched = new Map<Element, Element[]>();

	afterNavigate(() => {
		observer ??= new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					for (const el of watched.get(entry.target) ?? []) el.classList.add('in');
					watched.delete(entry.target);
					observer?.unobserve(entry.target);
				}
			},
			{ rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
		);
		// Elements from the previous page are gone; start fresh.
		observer.disconnect();
		watched.clear();
		for (const el of document.querySelectorAll('[data-reveal]:not(.in)')) {
			const target = el.matches('.title, .display') && el.parentElement ? el.parentElement : el;
			const group = watched.get(target);
			if (group) {
				if (!group.includes(el)) group.push(el);
			} else {
				watched.set(target, [el]);
				observer.observe(target);
			}
		}
		document.documentElement.classList.add('reveal-ready');
	});
</script>

<svelte:head>
	<link rel="preload" href={fontRegular} as="font" type="font/woff2" crossorigin="anonymous" />
	<link rel="preload" href={fontBold} as="font" type="font/woff2" crossorigin="anonymous" />
</svelte:head>

<a class="skip" href="#main">Skip to content</a>
<Nav />
<main id="main" bind:this={main}>
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
