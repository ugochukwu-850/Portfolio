<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Shot } from '#lib/data/projects.ts';

	let {
		shot,
		size,
		accent,
		tilt = 'left',
		children
	}: {
		shot: Shot;
		size: [number, number];
		accent: string;
		tilt?: 'left' | 'right';
		children?: Snippet;
	} = $props();
</script>

<!-- A product screenshot on a slight 3D tilt that straightens on hover. -->
<div class="stage {tilt}" style:--accent={accent}>
	{@render children?.()}
	<img
		src={shot.src}
		srcset="{shot.sm} {Math.round(size[0] / 2)}w, {shot.src} {size[0]}w"
		sizes="(max-width: 860px) 90vw, 52vw"
		width={size[0]}
		height={size[1]}
		alt={shot.alt}
		loading="lazy"
		decoding="async"
	/>
</div>

<style>
	.stage {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		perspective: 1600px;
	}

	.stage::before {
		content: '';
		position: absolute;
		inset: 15% 10%;
		background: radial-gradient(closest-side, rgb(var(--accent) / 0.22), transparent);
		filter: blur(20px);
	}

	img {
		position: relative;
		width: min(86%, 840px);
		height: auto;
		border: 1px solid var(--line-2);
		box-shadow: 0 40px 120px -30px rgb(var(--accent) / 0.4);
		transform: rotateY(-14deg) rotateX(4deg) rotate(1deg);
		transition: transform 1.2s var(--ease);
	}

	.right img {
		transform: rotateY(14deg) rotateX(4deg) rotate(-1deg);
	}

	.stage:hover img {
		transform: rotateY(-6deg) rotateX(2deg) rotate(0.5deg);
	}

	.right:hover img {
		transform: rotateY(6deg) rotateX(2deg) rotate(-0.5deg);
	}
</style>
