<script lang="ts">
	import { rng } from './random';

	let { lines = 7, seed = 4 }: { lines?: number; seed?: number } = $props();

	const W = 1200;
	const H = 500;

	// Each line is a sum of sines whose frequencies divide W, so the path repeats every W units
	// and can be translated by -W forever without a visible seam.
	const paths = $derived.by(() => {
		const r = rng(seed);
		return Array.from({ length: lines }, (_, i) => {
			const waves = Array.from({ length: 3 }, () => ({
				k: 1 + Math.floor(r() * 5),
				a: 8 + r() * 26,
				p: r() * Math.PI * 2
			}));
			const env = { k: 1 + Math.floor(r() * 2), p: r() * Math.PI * 2 };
			const mid = H / 2 + (i - (lines - 1) / 2) * 6;
			let d = '';
			for (let x = 0; x <= W * 2; x += 10) {
				const t = (x / W) * Math.PI * 2;
				const e = 0.55 + 0.45 * Math.sin(env.k * t + env.p);
				const y = mid + e * waves.reduce((s, w) => s + w.a * Math.sin(w.k * t + w.p), 0);
				d += `${x === 0 ? 'M' : 'L'}${x} ${y.toFixed(1)}`;
			}
			return {
				d,
				opacity: i === Math.floor(lines / 2) ? 0.9 : 0.12 + r() * 0.3,
				duration: 18 + r() * 22
			};
		});
	});
</script>

<svg class="wave" viewBox="0 0 {W} {H}" preserveAspectRatio="none" aria-hidden="true">
	<defs>
		<linearGradient id="wave-fade" x1="0" x2="1">
			<stop offset="0" stop-color="#fff" stop-opacity="0" />
			<stop offset="0.25" stop-color="#fff" stop-opacity="1" />
			<stop offset="0.75" stop-color="#fff" stop-opacity="1" />
			<stop offset="1" stop-color="#fff" stop-opacity="0" />
		</linearGradient>
		<mask id="wave-mask">
			<rect width={W} height={H} fill="url(#wave-fade)" />
		</mask>
	</defs>
	<g mask="url(#wave-mask)">
		<line class="axis" x1="0" x2={W} y1={H / 2} y2={H / 2} />
		{#each paths as p, i (i)}
			<path d={p.d} style:opacity={p.opacity} style:animation-duration="{p.duration}s" />
		{/each}
	</g>
</svg>

<style>
	.wave {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		pointer-events: none;
	}

	path {
		fill: none;
		stroke: var(--fg);
		stroke-width: 1.25;
		vector-effect: non-scaling-stroke;
		animation: flow linear infinite;
	}

	.axis {
		stroke: var(--line);
		stroke-dasharray: 2 6;
		vector-effect: non-scaling-stroke;
	}

	@keyframes flow {
		to {
			transform: translateX(-1200px);
		}
	}
</style>
