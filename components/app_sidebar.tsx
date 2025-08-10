import { AlignJustifyIcon, BellIcon, PackagePlusIcon } from "lucide-react"
import Link from "next/link"

export function AppSidebar() {
    return (
        <aside className="bg-white rounded-2xl p-4 shadow-md w-64 h-[calc(100vh-80px)]">
            <h2 className="uppercase text-gray-600 text-xs font-extrabold mb-4 tracking-wider">Navigation</h2>
            <nav className="space-y-2">
                <Link href={'/?page=dashboard'} className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200">
                    <AlignJustifyIcon className="h-5 w-5" />
                    All products
                </Link>
                <Link href={'/?page=addproduct'} className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200">
                    <PackagePlusIcon className="h-5 w-5" />
                    Add product
                </Link>
                <Link href={'/?page=notification'} className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200">
                    <BellIcon className="h-5 w-5" />
                    Notification
                </Link>
            </nav>
        </aside>
    )
}