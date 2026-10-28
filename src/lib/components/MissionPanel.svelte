<script lang="ts">
	import type { Snippet } from 'svelte';

	type Action = { label: string; href: string; external?: boolean };

	let {
		id,
		label,
		title,
		text,
		actions = [],
		align = 'left',
		visual
	}: {
		id?: string;
		label: string;
		title: string;
		text: string;
		actions?: Action[];
		align?: 'left' | 'right';
		visual: Snippet;
	} = $props();
</script>

<section {id} class="panel {align}" data-rule>
	<div class="panel__visual" aria-hidden="true" data-drift>{@render visual()}</div>
	<div class="container panel__inner">
		<div class="panel__copy">
			<p class="label" data-reveal>{label}</p>
			<h2 class="title" data-reveal style="--d: 80ms">{title}</h2>
			<p class="lead" data-reveal style="--d: 160ms">{text}</p>
			{#if actions.length}
				<div class="btn-row" data-reveal style="--d: 240ms">
					{#each actions as a, i (a.href)}
						<a
							class="btn"
							class:btn--ghost={i > 0}
							href={a.href}
							target={a.external ? '_blank' : undefined}
							rel={a.external ? 'noopener noreferrer' : undefined}
						>
							{a.label}
							<span class="arrow" aria-hidden="true">{a.external ? '↗' : '→'}</span>
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	.panel {
		position: relative;
		display: grid;
		align-items: center;
		min-height: min(86svh, 860px);
		padding-block: clamp(96px, 12vw, 160px);
		border-top: 1px solid var(--line);
		overflow: hidden;
		isolation: isolate;
	}

	.panel__visual {
		position: absolute;
		inset: 0 0 0 38%;
		z-index: -1;
		mask-image: linear-gradient(to right, transparent, #000 30%);
		-webkit-mask-image: linear-gradient(to right, transparent, #000 30%);
	}

	.right .panel__visual {
		inset: 0 38% 0 0;
		mask-image: linear-gradient(to left, transparent, #000 30%);
		-webkit-mask-image: linear-gradient(to left, transparent, #000 30%);
	}

	.panel__copy {
		display: grid;
		gap: 24px;
		max-width: 560px;
	}

	.right .panel__copy {
		margin-left: auto;
	}

	.panel__copy .btn-row {
		margin-top: 12px;
	}

	@media (max-width: 860px) {
		.panel {
			align-items: end;
		}

		.panel__visual,
		.right .panel__visual {
			inset: 0 0 35% 0;
			opacity: 0.7;
			mask-image: linear-gradient(to bottom, #000 40%, transparent);
			-webkit-mask-image: linear-gradient(to bottom, #000 40%, transparent);
		}

		.panel__copy {
			padding-top: 38svh;
		}
	}
</style>
