import { useState, useRef, useEffect } from "react";

import useBlockStore from "@/stores/block.store";

export default ({ faces = [] }) => {
	const blockStore = useBlockStore((state) => state.block);
	const setBlockStore = useBlockStore((state) => state.setBlock);
	const pixelsStore = useBlockStore((state) => state.pixels);
	const setPixelStore = useBlockStore((state) => state.setPixel);
	const setPixelsStore = useBlockStore((state) => state.setPixels);
	const fillPixelsStore = useBlockStore((state) => state.fillPixels);

	const toolStore = useBlockStore((state) => state.tool);
	const setToolStore = useBlockStore((state) => state.setTool);

	const setSelectedFacesStore = useBlockStore(
		(state) => state.setSelectedFaces
	);

	const [clicking, setClicking] = useState(false);

	const lastIndex = useRef(null);

	useEffect(() => {
		const up = () => {
			setClicking(false);
			lastIndex.current = null;
		};

		window.addEventListener("mouseup", up);
		return () => window.removeEventListener("mouseup", up);
	}, []);

	function setPixel(index, value) {
		console.log(`asd ${faces} ${index} ${value}`);

		setSelectedFacesStore(faces);

		setPixelStore(index, value);
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
				fillPixelsStore(blockStore);

				setToolStore("PENCIL");

				break;

			case "ERASER":
				setPixel(index, "air");

				break;

			default:
				break;
		}
	}

	function RenderPixels() {
		let pixels = [];
		if (Array.isArray(pixelsStore)) {
			pixels = [...pixelsStore];
		} else {
			const face = faces[0];

			console.log(Object.keys(pixelsStore), face);

			if (face in pixelsStore) {
				pixels = [...pixelsStore[face]];
			} else {
				console.log("WEY", face);
			}

			// pixels = [...pixelsStore[faces[0]]];
		}

		console.log(pixels);

		return pixels.map((pixel, index) => (
			<button
				key={index}
				className={`aspect-square cursor-pointer ${
					!pixel || pixel === "air"
						? "outline outline-neutral-300 hover:outline-neutral-600"
						: ""
				}`}
				onMouseDown={() => {
					lastIndex.current = index;
					handlePixelClick(index);
				}}
				onMouseOver={() => {
					if (!clicking) return;
					if (lastIndex.current === index) return;

					lastIndex.current = index;
					handlePixelClick(index);
				}}>
				<img
					src={`/assets/images/blocks/${pixel}.png`}
					alt=""
					className="aspect-square h-full w-full select-none pixelated"
					draggable="false"
					onError={() => setPixel(index, "air")}
				/>
			</button>
		));
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
				<RenderPixels />
			</div>
		</div>
	);
};
