<span class="logo">
	<svg viewBox="0 0 32 32" aria-hidden="true">
		<circle cx="16" cy="16" r="8.5" fill="none" stroke="currentColor" stroke-width="2" />
		<circle cx="24.5" cy="9.5" r="2.6" fill="currentColor" />
	</svg>
	<span class="word">Chizaram</span>
</span>

<style>
	.logo {
		display: inline-flex;
		align-items: center;
		gap: 12px;
	}

	svg {
		width: 26px;
		height: 26px;
		transition: transform 0.8s var(--ease);
	}

	:global(a:hover) > .logo svg {
		transform: rotate(-90deg);
	}

	.word {
		font-size: 17px;
		font-weight: 700;
		letter-spacing: 0.34em;
		text-transform: uppercase;
	}
</style>
