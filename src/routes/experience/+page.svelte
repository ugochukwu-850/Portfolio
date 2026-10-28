<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Stats from '#lib/components/Stats.svelte';
	import Network from '#lib/visuals/Network.svelte';
	import { awards, capabilities, certifications, education, roles } from '#lib/data/experience.ts';
	import { pad } from '#lib/format.ts';

	let detail = $state<'overview' | 'full'>('overview');
</script>

<Seo
	title="Experience — Chizaram Ugochukwu"
	description="Engineering roles across Rust backends, real-time AI and full-stack products: Trenqit, Searchless, Rise Academy (Risevest), Ayomide Foundation and Index UI."
	path="/experience"
/>

<PageHero
	label="Mission history"
	title="Experience"
	lead="Rust backends, real-time AI and full-stack products — shipped remotely for teams in India, Canada, Nigeria and China."
	seed={8}
>
	{#snippet visual()}<div class="hero-network"><Network seed={5} nodes={28} /></div>{/snippet}
</PageHero>

<section class="container summary">
	<Stats
		size="md"
		items={[
			{ value: 3, suffix: '+', label: 'Years in production' },
			{ value: roles.length, label: 'Engineering roles' },
			{ value: 35, suffix: '+', label: 'Merged PRs at Searchless' },
			{ value: 2, label: 'Merged PRs to Rodio' }
		]}
	/>
</section>

<section class="container log" aria-labelledby="log-title">
	<div class="log__bar">
		<h2 id="log-title" class="label">Mission log</h2>
		<div class="segmented" role="group" aria-label="Detail level">
			<button aria-pressed={detail === 'overview'} onclick={() => (detail = 'overview')}>
				Overview
			</button>
			<button aria-pressed={detail === 'full'} onclick={() => (detail = 'full')}>Full detail</button
			>
		</div>
	</div>

	{#each roles as role, i (role.id)}
		<article id={role.id} class="mission" class:compact={detail === 'overview'}>
			<header class="mission__meta" data-reveal>
				<span class="mono mission__index">{pad(i + 1)} / {pad(roles.length)}</span>
				<p class="label">{role.start} — {role.end}</p>
				<h3 class="title mission__company">
					{#if role.url}
						<a href={role.url} target="_blank" rel="noopener noreferrer">{role.company}</a>
					{:else}
						{role.company}
					{/if}
				</h3>
				<p class="mission__role">{role.role}</p>
				{#if role.current}
					<p class="live"><span aria-hidden="true"></span>Active</p>
				{/if}
			</header>

			<div class="mission__body" data-reveal style="--d: 120ms">
				<p class="mission__headline">{role.headline}</p>

				{#if role.metrics}
					<dl class="metrics">
						{#each role.metrics as m (m.label)}
							<div>
								<dt>{m.label}</dt>
								<dd>{m.value}</dd>
							</div>
						{/each}
					</dl>
				{/if}

				<dl class="spec">
					<div>
						<dt>Type</dt>
						<dd>{role.type}</dd>
					</div>
					<div>
						<dt>Location</dt>
						<dd>{role.location}</dd>
					</div>
					<div>
						<dt>Stack</dt>
						<dd>{role.stack.join(' · ')}</dd>
					</div>
				</dl>

				<ul class="highlights" role="list">
					{#each role.highlights as h, j (j)}
						<li>{h}</li>
					{/each}
				</ul>
				{#if detail === 'overview' && role.highlights.length > 2}
					<button class="more" onclick={() => (detail = 'full')}>
						+ {role.highlights.length - 2} more
					</button>
				{/if}
			</div>
		</article>
	{/each}
</section>

<section class="section container" aria-labelledby="cap-title">
	<div class="split">
		<div class="split__head">
			<p class="label" data-reveal>Systems</p>
			<h2 id="cap-title" class="title" data-reveal style="--d: 80ms">Capabilities</h2>
		</div>
		<dl class="spec spec--wide" data-reveal style="--d: 120ms">
			{#each capabilities as c (c.label)}
				<div>
					<dt>{c.label}</dt>
					<dd>{c.items.join(' · ')}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>

<section class="section container credentials" aria-labelledby="cred-title">
	<div class="split">
		<div class="split__head">
			<p class="label" data-reveal>Training</p>
			<h2 id="cred-title" class="title" data-reveal style="--d: 80ms">Education & credentials</h2>
		</div>
		<div class="cred-groups">
			{#each [{ name: 'Education', list: education }, { name: 'Certifications', list: certifications }, { name: 'Recognition', list: awards }] as group (group.name)}
				<div class="cred" data-reveal>
					<h3 class="label">{group.name}</h3>
					<ul role="list">
						{#each group.list as item (item.title)}
							<li>
								<span class="cred__title">{item.title}</span>
								<span class="cred__org">{item.org}</span>
								{#if item.date}<span class="mono cred__date">{item.date}</span>{/if}
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.hero-network {
		position: absolute;
		inset: 0 0 0 30%;
		opacity: 0.8;
		mask-image: linear-gradient(to right, transparent, #000 40%);
		-webkit-mask-image: linear-gradient(to right, transparent, #000 40%);
	}

	.summary {
		padding-block: clamp(48px, 7vw, 96px);
	}

	.log {
		padding-bottom: clamp(48px, 8vw, 120px);
	}

	.log__bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding-block: 18px;
	}

	.segmented {
		display: inline-flex;
		border: 1px solid var(--line-2);
	}

	.segmented button {
		height: 38px;
		padding: 0 16px;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--fg-2);
		transition:
			background-color 0.35s ease,
			color 0.35s ease;
	}

	.segmented button[aria-pressed='true'] {
		background: var(--fg);
		color: #000;
	}

	.mission {
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
		gap: 32px clamp(32px, 6vw, 96px);
		padding-block: clamp(48px, 7vw, 88px);
		border-top: 1px solid var(--line);
		scroll-margin-top: calc(var(--nav-h) + 24px);
	}

	.mission__meta {
		align-self: start;
		position: sticky;
		top: calc(var(--nav-h) + 72px);
		display: grid;
		gap: 14px;
	}

	.mission__index {
		color: var(--fg-3);
	}

	.mission__company a {
		background: linear-gradient(currentColor, currentColor) 0 100% / 0 2px no-repeat;
		transition: background-size 0.6s var(--ease);
	}

	.mission__company a:hover {
		background-size: 100% 2px;
	}

	.mission__role {
		font-size: 19px;
		color: var(--fg-2);
	}

	.live {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.2em;
		text-transform: uppercase;
	}

	.live span {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--live);
		box-shadow: 0 0 0 0 rgb(61 220 151 / 0.6);
		animation: live 2.2s ease-out infinite;
	}

	@keyframes live {
		70%,
		100% {
			box-shadow: 0 0 0 10px rgb(61 220 151 / 0);
		}
	}

	.mission__body {
		display: grid;
		gap: 32px;
	}

	.mission__headline {
		font-size: clamp(19px, 1.7vw, 23px);
		line-height: 1.45;
		text-wrap: pretty;
	}

	.metrics {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: 20px;
		margin: 0;
	}

	.metrics div {
		display: flex;
		flex-direction: column-reverse;
		gap: 6px;
	}

	.metrics dd {
		margin: 0;
		font-size: clamp(32px, 3.4vw, 44px);
		font-weight: 700;
		line-height: 1;
	}

	.metrics dt {
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--fg-3);
	}

	.spec {
		margin: 0;
		border-top: 1px solid var(--line-2);
	}

	.spec div {
		display: grid;
		grid-template-columns: minmax(110px, 2fr) 5fr;
		gap: 16px;
		padding-block: 15px;
		border-bottom: 1px solid var(--line);
	}

	.spec dt {
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		padding-top: 3px;
	}

	.spec dd {
		margin: 0;
		color: var(--fg-2);
		font-size: 16px;
	}

	.highlights {
		display: grid;
		gap: 14px;
		counter-reset: hl;
	}

	.highlights li {
		position: relative;
		padding-left: 40px;
		color: var(--fg-2);
		line-height: 1.6;
		counter-increment: hl;
	}

	.highlights li::before {
		content: counter(hl, decimal-leading-zero);
		position: absolute;
		left: 0;
		top: 4px;
		font-family: var(--mono);
		font-size: 11px;
		color: var(--fg-3);
	}

	.compact .highlights li:nth-child(n + 3) {
		display: none;
	}

	.more {
		justify-self: start;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--fg-2);
		border-bottom: 1px solid var(--line-2);
		padding-bottom: 4px;
		transition:
			color 0.3s ease,
			border-color 0.3s ease;
	}

	.more:hover {
		color: var(--fg);
		border-color: var(--fg);
	}

	.split {
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
		gap: 40px clamp(32px, 6vw, 96px);
		border-top: 1px solid var(--line);
		padding-top: clamp(48px, 7vw, 88px);
	}

	.split__head {
		display: grid;
		align-content: start;
		gap: 18px;
	}

	.spec--wide div {
		grid-template-columns: minmax(130px, 2fr) 5fr;
	}

	.credentials {
		padding-top: 0;
	}

	.cred-groups {
		display: grid;
		gap: 48px;
	}

	.cred ul {
		margin-top: 16px;
		border-top: 1px solid var(--line-2);
	}

	.cred li {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 4px 16px;
		padding-block: 15px;
		border-bottom: 1px solid var(--line);
	}

	.cred__title {
		font-weight: 500;
	}

	.cred__org {
		grid-column: 1;
		color: var(--fg-3);
		font-size: 15px;
	}

	.cred__date {
		grid-column: 2;
		grid-row: 1;
		color: var(--fg-3);
		text-transform: uppercase;
	}

	@media (max-width: 860px) {
		.mission,
		.split {
			grid-template-columns: 1fr;
		}

		.mission__meta {
			position: static;
		}

		.hero-network {
			inset: 0;
			opacity: 0.5;
		}
	}
</style>
