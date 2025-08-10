import SignIn from "@/components/sign-in";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";
import { ChartNoAxesCombinedIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { signOutWithGoogle } from "@/lib/signoutaction";
import { AppSidebar } from "@/components/app_sidebar";
import Dashboard from "@/components/Dashboard";

export default async function Home() {
  const session = await auth();
  const user = session?.user;



  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="mt-4 grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <AppSidebar />
          </div>
          <div className="col-span-9">
            <Dashboard />
          </div>
        </div>
      </div>
    </div>
  );
}