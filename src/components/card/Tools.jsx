import {
	IconTools,
	IconPencil,
	IconColorPicker,
	IconBucketDroplet,
	IconEraser,
} from "@tabler/icons-react";
import { useState } from "react";

import Card from "@/components/Card";
import useBlockStore from "@/stores/block.store";

export default () => {
	const toolStore = useBlockStore((state) => state.tool);
	const setToolStore = useBlockStore((state) => state.setTool);

	return (
		<Card
			title="Tools"
			icon={<IconTools size={20} />}
			position="bottom-2 left-2 !w-auto !h-fit">
			<div className="flex justify-center items-center rounded shadow-sm border border-neutral-300 p-2">
				<div className="grid grid-cols-2 gap-2">
					<button
						className={`aspect-square size-8 flex justify-center items-center cursor-pointer rounded shadow-sm hover:bg-neutral-200 border ${
							toolStore === "PENCIL"
								? "border-neutral-600"
								: "border-neutral-300"
						}`}
						onClick={() => setToolStore("PENCIL")}>
						<IconPencil size={23} />
					</button>

					<button
						className={`aspect-square size-8 flex justify-center items-center cursor-pointer rounded shadow-sm hover:bg-neutral-200 border ${
							toolStore === "PICKUP"
								? "border-neutral-600"
								: "border-neutral-300"
						}`}
						onClick={() => setToolStore("PICKUP")}>
						<IconColorPicker size={23} />
					</button>

					<button
						className={`aspect-square size-8 flex justify-center items-center cursor-pointer rounded shadow-sm hover:bg-neutral-200 border ${
							toolStore === "DROP"
								? "border-neutral-600"
								: "border-neutral-300"
						}`}
						onClick={() => setToolStore("DROP")}>
						<IconBucketDroplet size={23} />
					</button>

					<button
						className={`aspect-square size-8 flex justify-center items-center cursor-pointer rounded shadow-sm hover:bg-neutral-200 border ${
							toolStore === "ERASER"
								? "border-neutral-600"
								: "border-neutral-300"
						}`}
						onClick={() => setToolStore("ERASER")}>
						<IconEraser size={23} />
					</button>
				</div>
			</div>
		</Card>
	);
};
