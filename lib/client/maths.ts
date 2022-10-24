export function remap(value: number, min: number, max: number): number {
	if (min === max) return 0; // Prevent div by 0

	return Math.min(Math.max((value - min) / (max - min), 0), 1);
}

export function lerp(start: number, end: number, time: number): number {
	return start * (1 - time) + end * time;
}
