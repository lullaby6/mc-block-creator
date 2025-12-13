import Header from "@/components/Header";
import Block from "@/components/card/Block";

import Palette from "@/components/card/Palette";
import Config from "@/components/card/Config";
import Tools from "@/components/card/Tools";

import useBlockStore from "@/stores/block.store";

function App() {
	const blockTypeStore = useBlockStore((state) => state.blockType);

	return (
		<>
			<main className="w-screen h-screen text-neutral-800 flex flex-col">
				<Header />

				<div
					id="container"
					className="relative w-screen h-full flex justify-center items-center">
					<Palette />
					<Config />
					<Tools />
					<div className="flex gap-2">
						{blockTypeStore === "SOLID" ? (
							<Block />
						) : (
							blockTypeStore === "TABLE" && (
								<>
									<Block
										faces={[
											"south",
											"north",
											"east",
											"west",
										]}
									/>
									<Block faces={["top", "bottom"]} />
								</>
							)
						)}
					</div>
				</div>
			</main>
		</>
	);
}

export default App;
