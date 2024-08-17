import Image from "next/image";

import { UserButton } from "@clerk/nextjs";
import Chat from "./components/Chat";

export default function Home() {
	return (
		<main className="flex-grow bg-gray-50 p-4">
			<Chat />
		</main>
	);
}
