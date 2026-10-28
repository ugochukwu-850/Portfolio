<script lang="ts">
	import type { Stat } from '#lib/types.ts';
	import Counter from './Counter.svelte';

	let { items, size = 'lg' }: { items: Stat[]; size?: 'lg' | 'md' } = $props();
</script>

<dl class="stats {size}" style="--n: {items.length}">
	{#each items as s, i (s.label)}
		<div class="stat" data-reveal style="--d: {i * 90}ms">
			<dt class="stat__label">{s.label}</dt>
			<dd class="stat__value">
				{#if s.value !== null}<Counter value={s.value} suffix={s.suffix} />{:else}{s.display}{/if}
			</dd>
		</div>
	{/each}
</dl>

<style>
	.stats {
		display: grid;
		grid-template-columns: repeat(var(--n), minmax(0, 1fr));
		margin: 0;
	}

	.stat {
		display: flex;
		flex-direction: column-reverse;
		justify-content: flex-end;
		gap: 10px;
		padding: 28px 24px 0 0;
		border-top: 1px solid var(--line-2);
	}

	.stat + .stat {
		padding-left: 24px;
		border-left: 1px solid var(--line);
	}

	.stat__value {
		margin: 0;
		font-weight: 700;
		line-height: 0.9;
		letter-spacing: -0.01em;
	}

	.lg .stat__value {
		font-size: clamp(48px, 7vw, 104px);
	}

	.md .stat__value {
		font-size: clamp(36px, 4.4vw, 60px);
	}

	.stat__label {
		max-width: 26ch;
		font-size: 12px;
		font-weight: 500;
		letter-spacing: 0.18em;
		line-height: 1.5;
		text-transform: uppercase;
		color: var(--fg-2);
	}

	@media (max-width: 860px) {
		.stats {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			row-gap: 36px;
		}

		.stat:nth-child(odd) {
			padding-left: 0;
			border-left: 0;
		}
	}
</style>
