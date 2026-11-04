<script lang="ts">
	import { site } from '#lib/data/site.ts';

	let {
		title,
		description = site.description,
		path = '/',
		type = 'website',
		image = '/og.png',
		imageAlt = `${site.name} — ${site.role}`,
		published,
		schema = []
	}: {
		title: string;
		description?: string;
		path?: string;
		type?: 'website' | 'article' | 'profile';
		image?: string;
		imageAlt?: string;
		published?: string;
		/** JSON-LD objects; each is emitted as its own script tag. */
		schema?: object[];
	} = $props();

	const url = $derived(new URL(path, site.url).href);
	const imageUrl = $derived(new URL(image, site.url).href);
	// Escape `<` so a string inside the JSON can never close the script tag.
	const ld = $derived(
		schema.map(
			(s) =>
				`<script type="application/ld+json">${JSON.stringify(s).replace(/</g, '\\u003c')}</` +
				'script>'
		)
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content={site.name} />
	<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
	<link rel="canonical" href={url} />
	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:locale" content="en_US" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={imageAlt} />
	{#if type === 'profile'}
		<meta property="profile:first_name" content="Chizaram" />
		<meta property="profile:last_name" content="Ugochukwu" />
	{/if}
	{#if type === 'article' && published}
		<meta property="article:published_time" content={published} />
		<meta property="article:author" content={site.url} />
	{/if}
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@zara_tech006" />
	<meta name="twitter:creator" content="@zara_tech006" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
	<meta name="twitter:image:alt" content={imageAlt} />
	<link rel="alternate" type="text/plain" href="{site.url}/llms.txt" title="LLM-readable summary" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{#each ld as tag, i (i)}{@html tag}{/each}
</svelte:head>
