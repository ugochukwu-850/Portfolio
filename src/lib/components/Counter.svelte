<script lang="ts">
	import { onMount } from 'svelte';

	let {
		value,
		suffix = '',
		duration = 1800
	}: { value: number; suffix?: string; duration?: number } = $props();

	let el: HTMLSpanElement;
	// Server-rendered HTML shows the final number; the count-up only runs for numbers scrolled into view.
	let current = $state<number | null>(null);

	onMount(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		if (el.getBoundingClientRect().top < innerHeight) return;

		current = 0;
		let frame = 0;
		const io = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				io.disconnect();
				const start = performance.now();
				const tick = (now: number) => {
					const p = Math.min(1, (now - start) / duration);
					current = p === 1 ? value : Math.round(value * (1 - Math.pow(2, -10 * p)));
					if (p < 1) frame = requestAnimationFrame(tick);
				};
				frame = requestAnimationFrame(tick);
			},
			{ threshold: 0.5 }
		);
		io.observe(el);
		return () => {
			io.disconnect();
			cancelAnimationFrame(frame);
		};
	});
</script>

<span bind:this={el} class="counter">{current ?? value}{suffix}</span>

<style>
	.counter {
		font-variant-numeric: tabular-nums;
	}
</style>
