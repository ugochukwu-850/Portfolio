<script lang="ts">
	import { fixed, rng } from './random';

	let { bars = 56, seed = 12 }: { bars?: number; seed?: number } = $props();

	const items = $derived.by(() => {
		const r = rng(seed);
		return Array.from({ length: bars }, (_, i) => {
			// A soft hill across the bars so the middle breathes more than the edges.
			const hill = 0.45 + 0.55 * Math.sin((i / (bars - 1)) * Math.PI);
			return {
				min: fixed(0.08 + r() * 0.12, 2),
				max: fixed((0.3 + r() * 0.55) * hill, 2),
				dur: fixed(1.8 + r() * 2.2, 2),
				delay: fixed(-r() * 4, 2)
			};
		});
	});
</script>

<div class="eq" aria-hidden="true">
	{#each items as b, i (i)}
		<i
			style:--min={b.min}
			style:--max={b.max}
			style:animation-duration="{b.dur}s"
			style:animation-delay="{b.delay}s"
		></i>
	{/each}
</div>

<style>
	.eq {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: flex-end;
		gap: clamp(3px, 0.5vw, 7px);
		padding-inline: 4%;
		pointer-events: none;
		mask-image: linear-gradient(to right, transparent, #000 18%, #000 82%, transparent);
		-webkit-mask-image: linear-gradient(to right, transparent, #000 18%, #000 82%, transparent);
	}

	i {
		flex: 1;
		height: 100%;
		background: linear-gradient(to top, rgb(var(--glow) / 0.5), rgb(240 240 250 / 0.12));
		transform-origin: bottom;
		transform: scaleY(var(--min));
		animation: eq ease-in-out infinite alternate;
	}

	@keyframes eq {
		to {
			transform: scaleY(var(--max));
		}
	}
</style>
