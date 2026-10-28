import Lenis from 'lenis';

let lenis: Lenis | undefined;

/** Inertial scrolling for wheel and trackpad. Touch keeps native scrolling; reduced motion turns smoothing off. */
export function startSmoothScroll() {
	lenis ??= new Lenis({
		autoRaf: true,
		lerp: 0.09,
		anchors: { offset: -24 },
		stopInertiaOnNavigate: true
	});
	return () => {
		lenis?.destroy();
		lenis = undefined;
	};
}

export function pauseSmoothScroll(paused: boolean) {
	if (paused) lenis?.stop();
	else lenis?.start();
}
