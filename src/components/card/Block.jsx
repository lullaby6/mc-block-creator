import { useState, useRef, useEffect } from "react";

import useBlockStore from "@/stores/block";

export default ({}) => {
	const blockStore = useBlockStore((state) => state.block);
	const pixelsStore = useBlockStore((state) => state.pixels);
	const setPixelsStore = useBlockStore((state) => state.setPixels);

	const [clicking, setClicking] = useState(false);

	function setPixel(index, value) {
		const newPixels = [...pixelsStore];
		newPixels[index] = value;
		setPixelsStore(newPixels);
	}

	useEffect(() => {
		window.addEventListener("mouseup", () => setClicking(false));
	}, []);

	return (
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
					onMouseDown={() => setPixel(index, blockStore)}
					onMouseEnter={(event) => {
						if (clicking) {
							event.preventDefault();
							setPixel(index, blockStore);
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
	);
};
