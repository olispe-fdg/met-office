import { lerp, remap } from "lib/client/maths";
import { closestInArray } from "lib/client/closestInArray";

import colour_convert from "color-convert";
import { HSL } from "color-convert/conversions";

export type Gradient = { [key: number]: string };

export function sampleGradient(value: number, gradient: Gradient) {
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
