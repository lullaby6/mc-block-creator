import { IconSettings } from "@tabler/icons-react";
import { useState } from "react";

import Card from "@/components/Card";
import useBlockStore from "@/stores/block";

export default () => {
	const blockIDStore = useBlockStore((state) => state.blockID);
	const setBlockIDStore = useBlockStore((state) => state.setBlockID);

	const baseBlockStore = useBlockStore((state) => state.baseBlock);
	const setBaseBlockStore = useBlockStore((state) => state.setBaseBlock);

	return (
		<Card
			title="Config"
			icon={<IconSettings size={20} />}
			position="top-2 right-2">
			<div className="flex flex-col gap-2">
				<div className="flex flex-col gap-1">
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

				<div className="flex flex-col gap-1">
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
			</div>
		</Card>
	);
};
