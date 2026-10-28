<script lang="ts">
	// 'limb': a planet's edge rising from the bottom. 'eclipse': a planet in the upper corner, lit from behind.
	let { variant = 'limb' }: { variant?: 'limb' | 'eclipse' } = $props();
</script>

<div class="horizon {variant}" aria-hidden="true">
	<div class="planet"></div>
	<div class="flare"></div>
</div>

<style>
	.horizon {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
		animation: horizon-in 2.6s var(--ease) both;
	}

	.planet {
		position: absolute;
		border-radius: 50%;
		background: radial-gradient(circle at 50% 0%, #0c1220 0%, #04060b 22%, #000 46%);
		box-shadow:
			0 0 0 1px rgb(var(--glow) / 0.5),
			0 -6px 40px 2px rgb(var(--glow) / 0.32),
			0 -30px 140px 30px rgb(var(--glow) / 0.12),
			inset 0 18px 60px rgb(var(--glow) / 0.22);
	}

	.flare {
		position: absolute;
		border-radius: 50%;
		background: radial-gradient(
			closest-side,
			rgb(220 232 255 / 0.55),
			rgb(var(--glow) / 0.18) 45%,
			transparent
		);
		filter: blur(6px);
		mix-blend-mode: screen;
	}

	/* Limb: the curve of a planet along the bottom of the frame */
	.limb .planet {
		left: 50%;
		top: 70%;
		width: max(250vw, 2400px);
		aspect-ratio: 1;
		transform: translateX(-50%);
	}

	.limb .flare {
		left: 64%;
		top: 70%;
		width: min(58vw, 760px);
		height: 90px;
		transform: translate(-50%, -50%);
	}

	/* Eclipse: a planet sitting in the top-right corner with a lit rim */
	.eclipse {
		--w: max(70vw, 720px);
	}

	.eclipse .planet {
		right: -18vw;
		top: -38vw;
		width: var(--w);
		aspect-ratio: 1;
		background: radial-gradient(circle at 30% 80%, #070a12 0%, #000 55%);
		box-shadow:
			0 0 0 1px rgb(var(--glow) / 0.42),
			-10px 16px 60px 0 rgb(var(--glow) / 0.22),
			-30px 50px 160px 20px rgb(var(--glow) / 0.08);
	}

	/* Sits on the rim at the lower-left (225°) point of the planet */
	.eclipse .flare {
		right: calc(-18vw + var(--w) * 0.854);
		top: calc(-38vw + var(--w) * 0.854);
		width: 260px;
		height: 56px;
		transform: translate(50%, -50%) rotate(45deg);
	}

	@keyframes horizon-in {
		from {
			opacity: 0;
			transform: translateY(6vh);
		}
	}

	/* Scroll-driven parallax where supported; no JavaScript involved. */
	@supports (animation-timeline: scroll()) {
		@media (prefers-reduced-motion: no-preference) {
			.limb .planet,
			.limb .flare {
				animation: limb-sink linear both;
				animation-timeline: scroll(root);
				animation-range: 0 100vh;
			}
		}
	}

	@keyframes limb-sink {
		to {
			translate: 0 14vh;
			opacity: 0.55;
		}
	}
</style>
