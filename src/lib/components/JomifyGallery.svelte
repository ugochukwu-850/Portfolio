<script lang="ts">
	import search from '#lib/assets/jomify/search.webp';
	import searchSm from '#lib/assets/jomify/search-sm.webp';
	import playlist from '#lib/assets/jomify/playlist.webp';
	import playlistSm from '#lib/assets/jomify/playlist-sm.webp';
	import home from '#lib/assets/jomify/home.webp';
	import homeSm from '#lib/assets/jomify/home-sm.webp';
	import artist from '#lib/assets/jomify/artist.webp';
	import artistSm from '#lib/assets/jomify/artist-sm.webp';

	const shots = [
		{
			src: home,
			sm: homeSm,
			title: 'Home',
			alt: 'Jomify home screen with featured Spotify playlists and a gallery of albums'
		},
		{
			src: search,
			sm: searchSm,
			title: 'Search',
			alt: 'Jomify search results for an artist, listing tracks with album and duration'
		},
		{
			src: playlist,
			sm: playlistSm,
			title: 'Playlists',
			alt: 'Jomify playlist page with download, favourite and play-next actions'
		},
		{
			src: artist,
			sm: artistSm,
			title: 'Artists',
			alt: 'Jomify artist page with discography and follower count'
		}
	];
</script>

<!-- Scrollable region must be keyboard-focusable (WCAG 2.1.1) -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div class="gallery" role="region" aria-label="Jomify screenshots" tabindex="0">
	{#each shots as s, i (s.title)}
		<figure class="shot">
			<img
				src={s.src}
				srcset="{s.sm} 800w, {s.src} 1600w"
				sizes="(max-width: 860px) 86vw, 62vw"
				width="1600"
				height="858"
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
		box-shadow: 0 30px 80px -30px rgb(var(--glow) / 0.25);
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
