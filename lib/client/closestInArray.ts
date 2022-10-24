export function closestInArray(
	num: number,
	arr: number[]
): { lower: number; upper: number } {
	const sorted = arr.sort((a, b) => a - b);

	for (let i = 0; i < sorted.length; i++) {
		const val = sorted[i];

		if (val === num) {
			return { lower: val, upper: val };
		}

		if (val > num) {
			if (i === 0) {
				return { lower: val, upper: val };
			}

			return { lower: sorted[i - 1], upper: val };
		}
	}

	const lastVal = sorted[sorted.length - 1];
	return { lower: lastVal, upper: lastVal };
}
