import React from "react";

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { UserButton } from "@clerk/nextjs";

import { HomeIcon, AlignJustify } from "lucide-react";

type Props = {};

const Sidebar = (props: Props) => {
	return (
		<Sheet>
			<SheetTrigger>
                <AlignJustify className="flex focus:ring-0" />
            </SheetTrigger>
			<SheetContent className="w-[300px] sm:w-[350px]" side={"left"}>
				<SheetHeader>
					<SheetTitle className="text-2xl font-bold">ClarityAI</SheetTitle>
					<SheetDescription>
						Navigation Menu
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
};

export default Sidebar;
