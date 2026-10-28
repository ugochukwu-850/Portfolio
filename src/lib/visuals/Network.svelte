<script lang="ts">
	import { fixed, rng } from './random';

	let { nodes = 34, seed = 21 }: { nodes?: number; seed?: number } = $props();

	const W = 1200;
	const H = 720;

	const graph = $derived.by(() => {
		const r = rng(seed);
		const points = Array.from({ length: nodes }, () => ({
			x: fixed(60 + r() * (W - 120)),
			y: fixed(60 + r() * (H - 120)),
			hub: r() > 0.84
		}));

		// Link every node to its two nearest neighbours.
		const seen = new Set<string>();
		const edges: {
			a: (typeof points)[number];
			b: (typeof points)[number];
			packet: boolean;
			dur: number;
		}[] = [];
		points.forEach((p, i) => {
			points
				.map((q, j) => ({ j, d: (p.x - q.x) ** 2 + (p.y - q.y) ** 2 }))
				.filter((n) => n.j !== i)
				.sort((m, n) => m.d - n.d)
				.slice(0, 2)
				.forEach(({ j }) => {
					const key = i < j ? `${i}-${j}` : `${j}-${i}`;
					if (seen.has(key)) return;
					seen.add(key);
					edges.push({ a: p, b: points[j], packet: r() > 0.7, dur: fixed(2.4 + r() * 3.6, 2) });
				});
		});
		return { points, edges };
	});
</script>

<svg class="network" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
	{#each graph.edges as e, i (i)}
		<line class="edge" x1={e.a.x} y1={e.a.y} x2={e.b.x} y2={e.b.y} />
		{#if e.packet}
			<line
				class="packet"
				x1={e.a.x}
				y1={e.a.y}
				x2={e.b.x}
				y2={e.b.y}
				pathLength="100"
				style:animation-duration="{e.dur}s"
				style:animation-delay="-{e.dur / 2}s"
			/>
		{/if}
	{/each}
	{#each graph.points as p, i (i)}
		{#if p.hub}
			<circle class="halo" cx={p.x} cy={p.y} r="12" />
		{/if}
		<circle class="node" cx={p.x} cy={p.y} r={p.hub ? 3.5 : 2} />
	{/each}
</svg>

<style>
	.network {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.edge {
		stroke: var(--line);
		stroke-width: 1;
	}

	.packet {
		stroke: var(--fg);
		stroke-width: 1.5;
		stroke-linecap: round;
		stroke-dasharray: 5 95;
		animation: travel linear infinite;
	}

	.node {
		fill: var(--fg);
		opacity: 0.75;
	}

	.halo {
		fill: none;
		stroke: var(--line-2);
		animation: pulse 4s var(--ease-io) infinite;
		transform-box: fill-box;
		transform-origin: center;
	}

	@keyframes travel {
		from {
			stroke-dashoffset: 100;
		}
		to {
			stroke-dashoffset: 0;
		}
	}

	@keyframes pulse {
		50% {
			transform: scale(1.6);
			opacity: 0.2;
		}
	}
</style>
