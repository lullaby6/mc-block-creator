// import { useRef } from "react";

import Header from "@/components/Header";
import Block from "@/components/card/Block";

import Palette from "@/components/card/Palette";
import Config from "@/components/card/Config";

function App() {
	// const [count, setCount] = useState(0);

	return (
		<>
			<main className="w-screen h-screen text-neutral-800 flex flex-col">
				<Header />

				<div
					id="container"
					className="relative w-screen h-full flex justify-center items-center">
					<Palette />
					<Config />
					<Block />
				</div>
			</main>
		</>
	);
}

export default App;
