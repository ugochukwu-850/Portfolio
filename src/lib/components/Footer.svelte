<script lang="ts">
	import { site, socials } from '#lib/data/site.ts';

	const year = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="container footer__inner">
		<p class="footer__mark">{site.name} © {year}</p>
		<ul role="list" class="footer__links">
			{#each socials as s (s.href)}
				<li>
					<a class="link" href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
				</li>
			{/each}
			<li><a class="link" href="mailto:{site.email}">Email</a></li>
		</ul>
		<p class="footer__meta">{site.location} · {site.timezone}</p>
	</div>
</footer>

<style>
	.footer {
		border-top: 1px solid var(--line);
		padding-block: 36px;
	}

	.footer__inner {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 14px 36px;
		font-size: 12px;
		font-weight: 500;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--fg-3);
	}

	.footer__links {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 10px 28px;
	}

	.footer__links a {
		transition: color 0.3s ease;
	}

	.footer__links a:hover {
		color: var(--fg);
	}
</style>
