<script lang="ts">
	import { fixed, rng } from './random';

	let { count = 180, seed = 7 }: { count?: number; seed?: number } = $props();

	const stars = $derived.by(() => {
		const r = rng(seed);
		return Array.from({ length: count }, () => {
			const size = r();
			return {
				x: fixed(r() * 1600),
				y: fixed(r() * 1000),
				r: size > 0.97 ? 1.5 : size > 0.85 ? 1.05 : fixed(0.5 + r() * 0.35, 2),
				o: fixed(0.2 + r() * 0.7, 2),
				twinkle: r() < 0.3,
				delay: fixed(r() * 8, 2),
				dur: fixed(3.5 + r() * 5, 2)
			};
		});
	});
</script>

<svg class="stars" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
	{#each stars as s, i (i)}
		<circle
			cx={s.x}
			cy={s.y}
			r={s.r}
			opacity={s.o}
			class:twinkle={s.twinkle}
			style:animation-delay={s.twinkle ? `${s.delay}s` : undefined}
			style:animation-duration={s.twinkle ? `${s.dur}s` : undefined}
		/>
	{/each}
</svg>

<style>
	.stars {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		fill: var(--fg);
		pointer-events: none;
	}

	.twinkle {
		animation: twinkle 5s ease-in-out infinite;
	}

	@keyframes twinkle {
		50% {
			opacity: 0.1;
		}
	}
</style>
