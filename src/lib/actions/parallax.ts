/**
 * Eases `--px` / `--py` (each -1…1) on the node toward the pointer, so layers can shift by a few
 * pixels with `translate: calc(var(--px) * Npx)`. Fine pointers only; no-op under reduced motion.
 */
export function parallax(node: HTMLElement) {
	const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
	const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (!fine || reduced) return;

	let tx = 0;
	let ty = 0;
	let x = 0;
	let y = 0;
	let frame = 0;

	const step = () => {
		x += (tx - x) * 0.05;
		y += (ty - y) * 0.05;
		node.style.setProperty('--px', x.toFixed(4));
		node.style.setProperty('--py', y.toFixed(4));
		frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.001 ? requestAnimationFrame(step) : 0;
	};

	const onMove = (e: PointerEvent) => {
		const r = node.getBoundingClientRect();
		tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
		ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
		frame ||= requestAnimationFrame(step);
	};

	node.addEventListener('pointermove', onMove);
	return {
		destroy() {
			node.removeEventListener('pointermove', onMove);
			cancelAnimationFrame(frame);
		}
	};
}
