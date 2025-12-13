import { useRef } from "react";
import {
	IconFilePlus,
	IconFileArrowLeft,
	IconFileArrowRight,
	IconDownload,
	IconClipboard,
	IconRestore,
	IconHeart,
	IconBrandGithub,
} from "@tabler/icons-react";

import {
	CopyMCFunction,
	ExportMCFunction,
	CopyJSON,
	ExportJSON,
	ValidateBlockJSON,
} from "@/service/block.service";

import useBlockStore from "@/stores/block.store";

export default () => {
	const fileInputRef = useRef(null);

	const pixelsStore = useBlockStore((state) => state.pixels);
	const resetStore = useBlockStore((state) => state.reset);
	const baseBlockStore = useBlockStore((state) => state.baseBlock);
	const blockIDStore = useBlockStore((state) => state.blockID);
	const blockTypeStore = useBlockStore((state) => state.blockType);

	const activeFacesStore = useBlockStore((state) => state.activeFaces);
	const setActiveFaces = useBlockStore((state) => state.setActiveFaces);

	const setPixels = useBlockStore((state) => state.setPixels);
	const setBlockID = useBlockStore((state) => state.setBlockID);
	const setBlockType = useBlockStore((state) => state.setBlockType);
	const setBaseBlock = useBlockStore((state) => state.setBaseBlock);

	const handleImportJSON = (e) => {
		const file = e.target.files?.[0];

		if (!file) return;

		const reader = new FileReader();

		reader.onload = (event) => {
			try {
				const rawJson = JSON.parse(event.target.result);
				const json = ValidateBlockJSON(rawJson);

				if (json.pixels) setPixels(json.pixels);
				if (json.blockID) setBlockID(json.blockID);
				if (json.blockType) setBlockType(json.blockType);
				if (json.baseBlock !== undefined) setBaseBlock(json.baseBlock);

				if (json.activeFaces) setActiveFaces(json.activeFaces);
			} catch (error) {
				console.error("Error importing JSON:", error);

				alert("Invalid file.");
			}
		};

		reader.readAsText(file);

		e.target.value = "";
	};

	return (
		<>
			<input
				type="file"
				accept=".json"
				ref={fileInputRef}
				className="hidden"
				onChange={handleImportJSON}
				style={{ display: "none" }}
			/>

			<header className="w-screen shadow-sm sticky border-b border-neutral-300 flex justify-between items-center px-2 py-2 gap-2 z-100 bg-white">
				<div className="flex justify-start items-center gap-2">
					<button
						className="bg-white cursor-pointer border border-neutral-300 rounded-sm shadow-sm pl-3 pr-4 py-1 hover:bg-neutral-200 flex items-center gap-1"
						onClick={resetStore}>
						<IconRestore className="text-neutral-700 size-5" />
						Reset
					</button>

					<button
						className="bg-white cursor-pointer border border-neutral-300 rounded-sm shadow-sm pl-3 pr-4 py-1 hover:bg-neutral-200 flex items-center gap-1"
						onClick={() => fileInputRef.current?.click()}>
						<IconFileArrowLeft className="text-neutral-700 size-5" />
						Import (JSON)
					</button>

					<button
						className="bg-white cursor-pointer border border-neutral-300 rounded-sm shadow-sm pl-3 pr-4 py-1 hover:bg-neutral-200 flex items-center gap-1"
						onClick={() =>
							ExportJSON(
								pixelsStore,
								blockTypeStore,
								blockIDStore,
								baseBlockStore,
								activeFacesStore
							)
						}>
						<IconFileArrowRight className="text-neutral-700 size-5" />
						Export (JSON)
					</button>

					<button
						className="bg-white cursor-pointer border border-neutral-300 rounded-sm shadow-sm pl-3 pr-4 py-1 hover:bg-neutral-200 flex items-center gap-1"
						onClick={() =>
							CopyJSON(
								pixelsStore,
								blockTypeStore,
								blockIDStore,
								baseBlockStore,
								activeFacesStore
							)
						}>
						<IconClipboard className="text-neutral-700 size-5" />
						Copy (JSON)
					</button>

					<button
						className="bg-white cursor-pointer border border-neutral-300 rounded-sm shadow-sm pl-3 pr-4 py-1 hover:bg-neutral-200 flex items-center gap-1"
						onClick={() =>
							ExportMCFunction(
								pixelsStore,
								blockTypeStore,
								blockIDStore,
								baseBlockStore,
								activeFacesStore
							)
						}>
						<IconDownload className="text-neutral-700 size-5" />
						Export (mcfunction)
					</button>

					<button
						className="bg-white cursor-pointer border border-neutral-300 rounded-sm shadow-sm pl-3 pr-4 py-1 hover:bg-neutral-200 flex items-center gap-1"
						onClick={() =>
							CopyMCFunction(
								pixelsStore,
								blockTypeStore,
								blockIDStore,
								baseBlockStore,
								activeFacesStore
							)
						}>
						<IconClipboard className="text-neutral-700 size-5" />
						Copy (mcfunction)
					</button>
				</div>

				<div className="flex justify-start items-center gap-2">
					<a href="https://ko-fi.com/lullaby45743" target="_blank">
						<button className="bg-white cursor-pointer border border-neutral-300 rounded-sm shadow-sm pl-3 pr-4 py-1 hover:bg-neutral-200 flex items-center gap-1">
							<IconHeart className="text-neutral-700 size-5" />
							Donate
						</button>
					</a>

					<a
						href="https://github.com/lullaby6/mc-block-creator"
						target="_blank">
						<button className="bg-white cursor-pointer border border-neutral-300 rounded-sm shadow-sm pl-3 pr-4 py-1 hover:bg-neutral-200 flex items-center gap-1">
							<IconBrandGithub className="text-neutral-700 size-5" />
							Github
						</button>
					</a>
				</div>
			</header>
		</>
	);
};
