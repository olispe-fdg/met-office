import React, { PropsWithChildren, useMemo } from "react";
import { CircularProgress } from "@mui/joy";

import { remap } from "lib/client/maths";
import { sampleGradient, Gradient } from "lib/client/sampleGradient";

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
