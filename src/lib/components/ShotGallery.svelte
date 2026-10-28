<script lang="ts">
	import type { Shot } from '#lib/data/projects.ts';

	let { shots, label, size }: { shots: Shot[]; label: string; size: [number, number] } = $props();
</script>

<!-- Scrollable region must be keyboard-focusable (WCAG 2.1.1) -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div class="gallery" role="region" aria-label={label} tabindex="0">
	{#each shots as s, i (s.title)}
		<figure class="shot">
			<img
				src={s.src}
				srcset="{s.sm} 800w, {s.src} 1600w"
				sizes="(max-width: 860px) 86vw, 62vw"
				width={size[0]}
				height={size[1]}
				alt={s.alt}
				loading="lazy"
				decoding="async"
			/>
			<figcaption class="mono"><span>{String(i + 1).padStart(2, '0')}</span> {s.title}</figcaption>
		</figure>
	{/each}
</div>

<style>
	.gallery {
		display: flex;
		gap: clamp(16px, 2vw, 28px);
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		/* First shot lines up with the page's content column. */
		--inset: max(var(--gutter), calc((100% - var(--max)) / 2 + var(--gutter)));
		scroll-padding-inline: var(--inset);
		padding: 6px var(--inset) 28px;
		scrollbar-width: thin;
		scrollbar-color: var(--line-2) transparent;
		-webkit-overflow-scrolling: touch;
	}

	.shot {
		flex: 0 0 min(62vw, 960px);
		scroll-snap-align: start;
		display: grid;
		gap: 14px;
	}

	.shot img {
		width: 100%;
		height: auto;
		border: 1px solid var(--line-2);
		background: var(--bg-raise);
		box-shadow: 0 30px 80px -30px rgb(var(--accent, var(--glow)) / 0.3);
	}

	figcaption {
		color: var(--fg-3);
		text-transform: uppercase;
		letter-spacing: 0.18em;
	}

	figcaption span {
		color: var(--fg-2);
		margin-right: 8px;
	}

	@media (max-width: 860px) {
		.shot {
			flex-basis: 86vw;
		}
	}
</style>
