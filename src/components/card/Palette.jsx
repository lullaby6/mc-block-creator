import { IconPalette } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

import Card from "@/components/Card";

import { colors, blocks } from "@/config";

import useBlockStore from "@/stores/block";

const defaultPalleteInputValue = "diamond_block";

export default () => {
	const blockStore = useBlockStore((state) => state.block);
	const setBlockStore = useBlockStore((state) => state.setBlock);

	const [palleteInputValue, setPalleteInputValue] = useState(
		defaultPalleteInputValue
	);
	const [palleteBlockValue, setPalleteBlockValue] = useState(
		defaultPalleteInputValue
	);
	const [palleteInputDebouncedValue] = useDebounce(palleteInputValue, 400);

	useEffect(() => {
		setPalleteBlockValue(palleteInputDebouncedValue);
	}, [palleteInputDebouncedValue]);

	return (
		<Card title="Palette" icon={<IconPalette />}>
			<div className="flex flex-col gap-2">
				<div className="flex justify-between items-center gap-2">
					<input
						type="text"
						className="border border-neutral-300 px-2 py-0.5 rounded shadow-sm focus:outline-none focus:border-neutral-400 w-full"
						value={palleteInputValue}
						placeholder="diamond_block..."
						spellCheck="false"
						autoComplete="false"
						onChange={(e) => setPalleteInputValue(e.target.value)}
					/>

					<button
						className={`aspect-square size-7 flex justify-center items-center cursor-pointer rounded shadow-sm hover:bg-neutral-200 border disabled:opacity-50 disabled:cursor-not-allowed ${
							blockStore === palleteInputValue
								? "border-neutral-600"
								: "border-neutral-300"
						}`}
						disabled={
							palleteInputValue === "" ||
							palleteInputValue === "air"
						}
						onClick={() =>
							setBlockStore(palleteInputDebouncedValue)
						}>
						<img
							src={`/assets/images/blocks/${palleteBlockValue}.png`}
							className="aspect-square select-none size-5 pixelated"
							draggable="false"
							onError={() => setPalleteBlockValue("air")}
						/>
					</button>
				</div>

				<div className="grid grid-cols-8 gap-1 max-h-70 overflow-y-auto pb-2 pr-1">
					{blocks.map((block) =>
						colors.map((color) => (
							<button
								key={`${color}-${block}`}
								className={`aspect-square size-7 flex justify-center items-center cursor-pointer rounded shadow-sm hover:bg-neutral-200 border ${
									blockStore === `${color}_${block}`
										? "border-neutral-600"
										: "border-neutral-300"
								}`}
								onClick={() =>
									setBlockStore(`${color}_${block}`)
								}>
								<img
									src={`/assets/images/blocks/${color}_${block}.png`}
									className="aspect-square select-none size-5 pixelated"
									draggable="false"
								/>
							</button>
						))
					)}
				</div>
			</div>
		</Card>
	);
};
