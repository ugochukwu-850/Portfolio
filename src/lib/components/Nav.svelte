<script lang="ts">
	import { tick } from 'svelte';
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { nav, site, socials } from '#lib/data/site.ts';
	import Logo from './Logo.svelte';

	let open = $state(false);
	let hidden = $state(false);
	let solid = $state(false);
	let lastY = 0;
	let menuButton: HTMLButtonElement;
	let firstLink: HTMLAnchorElement;

	function onScroll() {
		const y = window.scrollY;
		solid = y > 24;
		// Hide on the way down, reveal on the way up.
		hidden = !open && y > 160 && y > lastY;
		lastY = y;
	}

	async function setOpen(next: boolean) {
		open = next;
		if (next) {
			hidden = false;
			await tick();
			firstLink?.focus();
		} else {
			menuButton?.focus();
		}
	}

	afterNavigate(() => {
		open = false;
		hidden = false;
	});

	$effect(() => {
		document.documentElement.style.overflow = open ? 'hidden' : '';
	});

	const isActive = (href: string) =>
		page.url.pathname === href || page.url.pathname.startsWith(`${href}/`);
</script>

<svelte:window
	onscroll={onScroll}
	onkeydown={(e) => e.key === 'Escape' && open && setOpen(false)}
/>

<header class="nav" class:hidden class:solid class:open>
	<div class="nav__inner">
		<a href="/" class="nav__logo" aria-label="{site.name}, home"><Logo /></a>

		<nav class="nav__links" aria-label="Primary">
			{#each nav as item (item.href)}
				<a
					href={item.href}
					class:active={isActive(item.href)}
					aria-current={isActive(item.href) ? 'page' : undefined}>{item.label}</a
				>
			{/each}
		</nav>

		<div class="nav__end">
			<a class="nav__contact" href="/#contact">Contact</a>
			<button
				bind:this={menuButton}
				class="burger"
				aria-expanded={open}
				aria-controls="menu"
				onclick={() => setOpen(!open)}
			>
				<span class="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
				<i></i><i></i><i></i>
			</button>
		</div>
	</div>
</header>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div class="scrim" class:open onclick={() => setOpen(false)}></div>

<aside id="menu" class="drawer" class:open aria-label="Menu" inert={!open}>
	<nav aria-label="Menu">
		<ul role="list">
			<li style="--i: 0"><a href="/" bind:this={firstLink}>Home</a></li>
			{#each nav as item, i (item.href)}
				<li style="--i: {i + 1}"><a href={item.href}>{item.label}</a></li>
			{/each}
			<li style="--i: {nav.length + 1}"><a href="/#contact">Contact</a></li>
		</ul>

		<ul role="list" class="drawer__social">
			{#each socials as s, i (s.href)}
				<li style="--i: {nav.length + 2 + i}">
					<a href={s.href} target="_blank" rel="noopener noreferrer">{s.label} ↗</a>
				</li>
			{/each}
		</ul>

		<a class="drawer__mail mono" href="mailto:{site.email}">{site.email}</a>
	</nav>
</aside>

<style>
	.nav {
		position: fixed;
		inset: 0 0 auto;
		z-index: 100;
		height: var(--nav-h);
		border-bottom: 1px solid transparent;
		transition:
			transform 0.6s var(--ease),
			background-color 0.4s ease,
			border-color 0.4s ease;
		view-transition-name: site-nav;
	}

	.nav.solid {
		background: rgb(0 0 0 / 0.78);
		border-color: var(--line);
		-webkit-backdrop-filter: blur(16px) saturate(140%);
		backdrop-filter: blur(16px) saturate(140%);
	}

	.nav.hidden {
		transform: translateY(-100%);
	}

	.nav.open {
		background: transparent;
		border-color: transparent;
		-webkit-backdrop-filter: none;
		backdrop-filter: none;
	}

	.nav__inner {
		max-width: var(--max);
		margin-inline: auto;
		height: 100%;
		display: flex;
		align-items: center;
		gap: clamp(28px, 4vw, 56px);
		padding-inline: var(--gutter);
	}

	.nav__links {
		display: flex;
		gap: clamp(22px, 2.6vw, 38px);
	}

	.nav__links a,
	.nav__contact {
		position: relative;
		font-size: 13px;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		padding-block: 6px;
	}

	.nav__links a::after,
	.nav__contact::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 2px;
		background: currentColor;
		transform: scaleX(0);
		transform-origin: right;
		transition: transform 0.5s var(--ease);
	}

	.nav__links a:hover::after,
	.nav__contact:hover::after,
	.nav__links a.active::after {
		transform: scaleX(1);
		transform-origin: left;
	}

	.nav__end {
		margin-left: auto;
		display: flex;
		align-items: center;
		gap: 28px;
	}

	.burger {
		position: relative;
		z-index: 101;
		display: grid;
		place-content: center;
		gap: 6px;
		width: 44px;
		height: 44px;
	}

	.burger i {
		display: block;
		width: 26px;
		height: 2px;
		background: currentColor;
		transition:
			transform 0.5s var(--ease),
			opacity 0.3s ease;
	}

	.open .burger i:nth-of-type(1) {
		transform: translateY(8px) rotate(45deg);
	}

	.open .burger i:nth-of-type(2) {
		opacity: 0;
	}

	.open .burger i:nth-of-type(3) {
		transform: translateY(-8px) rotate(-45deg);
	}

	.scrim {
		position: fixed;
		inset: 0;
		z-index: 80;
		background: rgb(0 0 0 / 0.6);
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.5s ease;
	}

	.scrim.open {
		opacity: 1;
		pointer-events: auto;
	}

	.drawer {
		position: fixed;
		inset: 0 0 0 auto;
		z-index: 90;
		width: min(420px, 100%);
		padding: calc(var(--nav-h) + 16px) var(--gutter) 40px;
		background: #000;
		border-left: 1px solid var(--line);
		overflow-y: auto;
		transform: translateX(100%);
		transition: transform 0.7s var(--ease);
	}

	.drawer.open {
		transform: none;
	}

	.drawer nav {
		display: flex;
		flex-direction: column;
		gap: 40px;
		min-height: 100%;
	}

	.drawer li {
		opacity: 0;
		transform: translateX(24px);
		transition:
			opacity 0.5s var(--ease),
			transform 0.7s var(--ease);
		transition-delay: calc(var(--i, 0) * 45ms + 120ms);
	}

	.drawer.open li {
		opacity: 1;
		transform: none;
	}

	.drawer a {
		display: block;
		padding: 16px 0;
		border-bottom: 1px solid var(--line);
		text-align: right;
		font-size: 15px;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		transition:
			padding 0.5s var(--ease),
			color 0.3s ease;
	}

	.drawer a:hover {
		padding-right: 10px;
	}

	.drawer__social a {
		padding: 11px 0;
		font-size: 12px;
		color: var(--fg-2);
		border-bottom-color: transparent;
	}

	.drawer__social a:hover {
		color: var(--fg);
	}

	.drawer .drawer__mail {
		margin-top: auto;
		border: 0;
		color: var(--fg-3);
		text-transform: none;
		letter-spacing: 0.04em;
		font-weight: 400;
		font-size: 12px;
	}

	@media (max-width: 860px) {
		.nav__links,
		.nav__contact {
			display: none;
		}
	}
</style>
