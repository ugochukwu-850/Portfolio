<script lang="ts">
	import { site } from '#lib/data/site.ts';

	let {
		title,
		description = site.description,
		path = '/',
		type = 'website'
	}: {
		title: string;
		description?: string;
		path?: string;
		type?: 'website' | 'article';
	} = $props();

	const url = $derived(new URL(path, site.url).href);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="@zara_tech006" />
</svelte:head>
