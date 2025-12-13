import { useState, useRef, useEffect } from "react";

import useBlockStore from "@/stores/block.store";

export default ({ faces = [] }) => {
	const blockStore = useBlockStore((state) => state.block);
	const setBlockStore = useBlockStore((state) => state.setBlock);
	const pixelsStore = useBlockStore((state) => state.pixels);
	const setPixelsStore = useBlockStore((state) => state.setPixels);

	const toolStore = useBlockStore((state) => state.tool);
	const setToolStore = useBlockStore((state) => state.setTool);

	const [clicking, setClicking] = useState(false);

	function setPixel(index, value) {
		if (faces.length === 0) {
			if (Array.isArray(pixelsStore)) {
				const newPixelsArray = [...pixelsStore];

				newPixelsArray[index] = value;

				setPixelsStore(newPixelsArray);
			} else {
				const newPixelsArray = [...pixelsStore["south"]];

				newPixelsArray[index] = value;

				setPixelsStore(newPixelsArray);
			}
		} else {
			if (Array.isArray(pixelsStore)) {
				const newPixelsArray = [...pixelsStore];

				newPixelsArray[index] = value;

				const newPixelsObject = {};

				faces.forEach((face) => {
					newPixelsObject[face] = [...newPixelsArray];
				});

				setPixelsStore(newPixelsObject);
			} else {
				const newPixelsObject = { ...pixelsStore };

				faces.forEach((face) => {
					newPixelsObject[face][index] = value;
				});

				setPixelsStore(newPixelsObject);
			}
		}
	}

	useEffect(() => {
		window.addEventListener("mouseup", () => setClicking(false));
	}, []);

	function handlePixelClick(index) {
		switch (toolStore) {
			case "PENCIL":
				setPixel(index, blockStore);

				break;

			case "PICKUP":
				const block = pixelsStore[index];

				if (!block || block === "air") break;

				setBlockStore(block);
				setToolStore("PENCIL");

				break;

			case "DROP":
				setPixelsStore(pixelsStore.map((pixel) => blockStore));

				setToolStore("PENCIL");

				break;

			case "ERASER":
				setPixel(index, "air");

				break;

			default:
				break;
		}
	}

	return (
		<div>
			{faces.length > 0 && (
				<p className="text-sm capitalize">{faces.join(", ")}</p>
			)}
			<div
				className="aspect-square size-150 border border-neutral-300 rounded shadow-sm p-1 grid grid-cols-16 grid-rows-16 select-none z-10"
				draggable="false"
				onMouseDown={() => setClicking(true)}
				// onMouseUp={() => setClicking(false)}
				// onMouseLeave={() => setClicking(false)}
				onContextMenu={(event) => event.preventDefault()}>
				{pixelsStore.map((pixel, index) => (
					<button
						key={index}
						className={`aspect-square cursor-pointer ${
							!pixel || pixel === "air"
								? "outline outline-neutral-300 hover:outline-neutral-600"
								: ""
						}`}
						onMouseDown={() => handlePixelClick(index)}
						onMouseEnter={(event) => {
							if (clicking) {
								event.preventDefault();
								handlePixelClick(index);
							}
						}}>
						<img
							src={`/assets/images/blocks/${pixel}.png`}
							alt=""
							className="aspect-square h-full w-sull select-none pixelated"
							draggable="false"
							onError={() => setPixel(index, "air")}
						/>
					</button>
				))}
			</div>
		</div>
	);
};
