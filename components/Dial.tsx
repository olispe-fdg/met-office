import React, { PropsWithChildren, useMemo } from "react";
import { CircularProgress } from "@mui/joy";
import Gradient from "javascript-color-gradient";
import colour_convert from "color-convert";

function remap(value: number, min: number, max: number): number {
	console.log(value, min, max, (value - min) / (max - min));
	return Math.min(Math.max((value - min) / (max - min), 0), 1);
}

function remapToGradient(
	value: number,
	min: number,
	max: number,
	gradient: string[]
) {
	const linearValue = remap(value, min, max);

	const floatingIndex = linearValue * (gradient.length - 1);
	const lowIndex = Math.floor(floatingIndex);
	const highIndex = Math.ceil(floatingIndex);

	return gradient[lowIndex];
}

export const Dial: React.FC<
	PropsWithChildren<{
		amount: number;
		min: number;
		max: number;

		size: number;
		label?: string;
	}>
> = ({ amount, min, max, label, size, children }) => {
	const gradient = useMemo(() => {
		return new Gradient()
			.setColorGradient("#000000", "#ffffff")
			.setMidpoint(10)
			.getColors();
	}, []);

	return (
		<CircularProgress
			sx={{
				color: remapToGradient(amount, min, max, gradient),
				"--CircularProgress-progress-color": remapToGradient(
					amount,
					min,
					max,
					gradient
				),
				"--CircularProgress-size": `${size}rem`,
				"--CircularProgress-track-thickness": `24px`,
				"--CircularProgress-progress-thickness": `24px`,
			}}
			determinate
			value={remap(amount, min, max) * 100}
		>
			{label ? <p>{label}</p> : children}
		</CircularProgress>
	);
};
