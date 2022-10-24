import React, { PropsWithChildren, useMemo } from "react";
import { CircularProgress } from "@mui/joy";
import colour_convert from "color-convert";
import { HSL } from "color-convert/conversions";

function remap(value: number, min: number, max: number): number {
	if (min === max) return 0; // Prevent div by 0

	return Math.min(Math.max((value - min) / (max - min), 0), 1);
}

function lerp(start: number, end: number, time: number): number {
	return start * (1 - time) + end * time;
}

export type Gradient = { [key: number]: string };

function closestInArray(
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

function sampleGradient(value: number, gradient: Gradient) {
	const numericKeys = Object.keys(gradient).map(Number);

	const bounds = closestInArray(value, numericKeys);
	const fraction = remap(value, bounds.lower, bounds.upper);

	const boundsColours = {
		lower: colour_convert.hex.hsl(gradient[bounds.lower]),
		upper: colour_convert.hex.hsl(gradient[bounds.upper]),
	};

	const interpolatedColour = boundsColours.lower.map((value, index) =>
		lerp(value, boundsColours.upper[index], fraction)
	) as HSL;

	const hexColour = colour_convert.hsl.hex(interpolatedColour);
	return "#" + hexColour;
}

export const Dial: React.FC<
	PropsWithChildren<{
		amount: number;
		min: number;
		max: number;

		size: number;
		gradient: Gradient;
	}>
> = ({ amount, min, max, size, gradient, children }) => {
	return (
		<CircularProgress
			sx={{
				//color: sampleGradient(amount, gradient),
				"--CircularProgress-progress-color": sampleGradient(amount, gradient),
				"--CircularProgress-size": `${size}rem`,
				"--CircularProgress-track-thickness": `${Math.sqrt(size) * 0.4}rem`,
				"--CircularProgress-progress-thickness": `${Math.sqrt(size) * 0.4}rem`,
			}}
			determinate
			value={remap(amount, min, max) * 100}
		>
			{children}
		</CircularProgress>
	);
};
