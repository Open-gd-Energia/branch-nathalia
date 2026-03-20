import type { FC } from "react";
import {
	PolarGrid,
	PolarRadiusAxis,
	RadialBar,
	RadialBarChart,
} from "recharts";
import { type ChartConfig, ChartContainer } from "./ui/chart";

const chartConfig = {
	percentage: {
		label: "Percentage",
	},
} satisfies ChartConfig;

export const RoundPercentage: FC<{ percentage: number }> = ({ percentage }) => {
	// create a scale of colors from red to green based on the percentage
	const colorScale = (value: number) => {
		const hue = Math.round(value * 120); // 120 is green, 0 is red
		return `hsl(${hue}, 100%, 50%)`;
	};
	const fillColor = colorScale(percentage / 100);

	// find the percentage in the angle
	const angle = (percentage / 100) * 360 + 90; // start on top, not in the left

	const chartData = [{ percentage: percentage, fill: fillColor }];

	return (
		<ChartContainer config={chartConfig} className="aspect-square size-6">
			<RadialBarChart
				data={chartData}
				startAngle={90}
				endAngle={angle}
				innerRadius={8}
				outerRadius={16}
			>
				<PolarGrid
					gridType="circle"
					radialLines={false}
					stroke="none"
					className="first:fill-muted last:fill-background w-full"
					polarRadius={[10, 6]}
				/>
				<RadialBar dataKey="percentage" background cornerRadius={6} />
				<PolarRadiusAxis tick={false} tickLine={false} axisLine={false} />
			</RadialBarChart>
		</ChartContainer>
	);
};
