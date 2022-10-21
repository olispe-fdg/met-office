import React, { PropsWithChildren } from "react";
import { CircularProgress } from "@mui/joy";

export const Dial: React.FC<
	PropsWithChildren<{
		amount: number;
		size: number;
		label?: string;
	}>
> = ({ amount, label, size, children }) => {
	return (
		<CircularProgress
			sx={{
				color: "black",
				"--CircularProgress-progress-color": "black",
				"--CircularProgress-size": `${size}rem`,
				"--CircularProgress-track-thickness": `24px`,
				"--CircularProgress-progress-thickness": `24px`,
			}}
			determinate
			value={amount}
		>
			{label ? <p>{label}</p> : children}
		</CircularProgress>
	);
};
