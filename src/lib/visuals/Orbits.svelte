<script lang="ts">
	import { onMount } from 'svelte';

	const rings = [
		{ rx: 150, dur: 14, r: 3.5, phase: 0.1 },
		{ rx: 250, dur: 26, r: 4.5, phase: 0.55 },
		{ rx: 360, dur: 40, r: 3, phase: 0.3 },
		{ rx: 480, dur: 62, r: 5, phase: 0.8 }
	];
	const tilt = 0.32;

	// An ellipse as two arcs, starting at the rightmost point, for <animateMotion>.
	const ellipse = (rx: number, ry: number) =>
		`M ${rx} 0 A ${rx} ${ry} 0 1 1 ${-rx} 0 A ${rx} ${ry} 0 1 1 ${rx} 0`;

	let svg: SVGSVGElement;

	onMount(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) svg.pauseAnimations();
	});
</script>

<svg bind:this={svg} class="orbits" viewBox="-560 -320 1120 640" aria-hidden="true">
	<defs>
		<radialGradient id="orbit-core" cx="0.35" cy="0.3" r="0.75">
			<stop offset="0" stop-color="#1a2232" />
			<stop offset="0.55" stop-color="#05070c" />
			<stop offset="1" stop-color="#000" />
		</radialGradient>
	</defs>
	<g transform="rotate(-14)">
		{#each rings as ring, i (i)}
			<path class="ring" d={ellipse(ring.rx, ring.rx * tilt)} />
		{/each}
		<circle class="core" r="64" fill="url(#orbit-core)" />
		{#each rings as ring, i (i)}
			<circle class="body" r={ring.r}>
				<animateMotion
					dur="{ring.dur}s"
					begin="-{ring.dur * ring.phase}s"
					repeatCount="indefinite"
					path={ellipse(ring.rx, ring.rx * tilt)}
				/>
			</circle>
		{/each}
	</g>
</svg>

<style>
	.orbits {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.ring {
		fill: none;
		stroke: var(--line-2);
		stroke-width: 1;
		vector-effect: non-scaling-stroke;
	}

	.core {
		stroke: rgb(var(--glow) / 0.45);
		stroke-width: 1;
		filter: drop-shadow(0 0 24px rgb(var(--glow) / 0.25));
	}

	.body {
		fill: var(--fg);
		filter: drop-shadow(0 0 6px rgb(240 240 250 / 0.8));
	}
</style>
