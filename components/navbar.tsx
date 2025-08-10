import SignIn from "@/components/sign-in";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import Link from "next/link";
import { ChartNoAxesCombinedIcon, SearchIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

import { signOutWithGoogle } from "@/lib/signoutaction";
import { Input } from "./ui/input";


async function Navbar() {

    const session = await auth();
    const user = session?.user;
    return (
        <div>
            {
                user ? (
                    <div className="p-4">
                        <header className="flex justify-between mx-10 items-center">
                            <Link className="flex gap-2" href='/'>
                                <ChartNoAxesCombinedIcon />
                                AmazonPriceTracker
                            </Link>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center pl-1 relative bg-gray-50 rounded-full">
                                    <SearchIcon className="absolute text-gray-600 left-2 pointer-events-none" />
                                    <Input className="rounded-full shadow-none border-0 bg-white pl-8" placeholder="Search..." />
                                </div>
                                {
                                    <DropdownMenu>
                                        <DropdownMenuTrigger><Avatar>
                                            <AvatarImage src={user.image || "https://github.com/shadcn.png"} />
                                            <AvatarFallback>{user.name?.charAt(0) || "User"}</AvatarFallback>
                                        </Avatar></DropdownMenuTrigger>
                                        <DropdownMenuContent>

                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>

                                                <button onClick={async () => {
                                                    "use server"; // Inline Server Action (allowed in Server Components)
                                                    await signOutWithGoogle();
                                                }}>Logout</button>

                                            </DropdownMenuItem>

                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                }
                            </div>
                        </header>
                    </div>
                ) : (
                    <SignIn />
                )
            }
        </div>
    )
}

export default Navbar
