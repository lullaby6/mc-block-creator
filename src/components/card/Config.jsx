import { IconSettings } from "@tabler/icons-react";
import { useState } from "react";

import Card from "@/components/Card";
import useBlockStore from "@/stores/block";

export default () => {
	const blockIDStore = useBlockStore((state) => state.blockID);
	const setBlockIDStore = useBlockStore((state) => state.setBlockID);

	const baseBlockStore = useBlockStore((state) => state.baseBlock);
	const setBaseBlockStore = useBlockStore((state) => state.setBaseBlock);

	const facesStore = useBlockStore((state) => state.faces);
	const setFacesStore = useBlockStore((state) => state.setFaces);
	const setFaceStore = useBlockStore((state) => state.setFace);

	return (
		<Card
			title="Config"
			icon={<IconSettings size={20} />}
			position="top-2 right-2">
			<div className="flex flex-col gap-2">
				<div className="flex flex-col gap-0.5">
					<label className="text-sm text-neutral-500">Block ID</label>
					<input
						type="text"
						value={blockIDStore}
						onChange={(e) => setBlockIDStore(e.target.value)}
						className="border border-neutral-300 px-2 py-0.5 rounded shadow-sm focus:outline-none focus:border-neutral-400"
						placeholder="custom_block_id..."
						spellCheck="false"
						autoComplete="false"
					/>
				</div>

				<div className="flex flex-col gap-0.5">
					<label className="text-sm text-neutral-500">
						Base Block
					</label>
					<input
						type="text"
						value={baseBlockStore}
						onChange={(e) => setBaseBlockStore(e.target.value)}
						className="border border-neutral-300 px-2 py-0.5 rounded shadow-sm focus:outline-none focus:border-neutral-400"
						placeholder="diamond_block"
						spellCheck="false"
						autoComplete="false"
					/>
				</div>

				<div className="flex flex-col gap-0.5">
					<label className="text-sm text-neutral-500">
						Active Faces
					</label>
					<div className="grid grid-cols-2 gap-x-1 gap-y-0.5">
						{Object.entries(facesStore).map(([face, isActive]) => (
							<label
								key={face}
								className="flex items-center gap-2 cursor-pointer select-none">
								<input
									type="checkbox"
									checked={isActive}
									onChange={(e) =>
										setFaceStore(face, e.target.checked)
									}
									className="accent-neutral-800 cursor-pointer"
								/>
								<span className="capitalize text-neutral-700">
									{face}
								</span>
							</label>
						))}
					</div>
				</div>
			</div>
		</Card>
	);
};
