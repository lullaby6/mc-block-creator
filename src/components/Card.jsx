import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useState, useRef } from "react";

export default ({
	title,
	children,
	icon,
	position = "top-2 left-2",
	open = true,
}) => {
	const [isOpen, setIsOpen] = useState(open);

	const cardRef = useRef(null);
	const pos = useRef({ offsetX: 0, offsetY: 0 });

	const startDrag = (e) => {
		e.preventDefault();
		const rect = cardRef.current.getBoundingClientRect();
		pos.current = {
			offsetX: e.clientX - rect.left,
			offsetY: e.clientY - rect.top,
		};
		document.addEventListener("mousemove", onDrag);
		document.addEventListener("mouseup", stopDrag);
		document.body.style.cursor = "grabbing";
		document.body.style.userSelect = "none";
	};

	const onDrag = (e) => {
		e.preventDefault();
		const container = document.getElementById("container");
		const offsetY = container ? container.getBoundingClientRect().y : 0;

		cardRef.current.style.left = `${e.clientX - pos.current.offsetX}px`;
		cardRef.current.style.top = `${
			e.clientY - pos.current.offsetY - offsetY
		}px`;
	};

	const stopDrag = () => {
		document.removeEventListener("mousemove", onDrag);
		document.removeEventListener("mouseup", stopDrag);
		document.body.style.cursor = "default";
		document.body.style.userSelect = "auto";
	};

	return (
		<div
			className={`bg-white absolute ${position} rounded shadow-sm border border-neutral-300 w-70 flex flex-col gap-2 px-2 p-1 select-none z-20`}
			ref={cardRef}>
			<header
				className="flex justify-between cursor-move active:cursor-grabbing select-none items-center"
				onMouseDown={startDrag}
				onDragStart={(e) => e.preventDefault()}>
				<div className="flex items-center gap-1">
					{icon && <span className="text-neutral-700">{icon}</span>}

					<span>{title}</span>
				</div>

				<button
					className="opacity-50 hover:opacity-100 cursor-pointer p-1"
					onClick={() => setIsOpen(!isOpen)}>
					{isOpen ? (
						<IconChevronUp size={18} />
					) : (
						<IconChevronDown size={18} />
					)}
				</button>
			</header>

			{isOpen && <div className="p-1 !pt-0">{children}</div>}
		</div>
	);
};
