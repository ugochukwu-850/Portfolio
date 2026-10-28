<!-- Two faint meteors on long, uneven cycles: a glance, not a distraction. -->
<div class="sky" aria-hidden="true">
	<i style="--x: 62%; --y: 14%; --dur: 23s; --delay: 4s"></i>
	<i style="--x: 28%; --y: 26%; --dur: 31s; --delay: 15s"></i>
</div>

<style>
	.sky {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
	}

	i {
		position: absolute;
		left: var(--x);
		top: var(--y);
		width: 120px;
		height: 1px;
		background: linear-gradient(to left, rgb(240 240 250 / 0.75), transparent);
		opacity: 0;
		transform: rotate(28deg) translateX(0);
		animation: meteor var(--dur) linear infinite;
		animation-delay: var(--delay);
	}

	/* Visible for ~4% of the cycle; the rest is stillness. */
	@keyframes meteor {
		0% {
			opacity: 0;
			transform: rotate(28deg) translateX(-60px);
		}
		1% {
			opacity: 1;
		}
		4% {
			opacity: 0;
			transform: rotate(28deg) translateX(260px);
		}
		100% {
			opacity: 0;
			transform: rotate(28deg) translateX(260px);
		}
	}
</style>
