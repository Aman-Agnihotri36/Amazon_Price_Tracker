import { prisma } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET() {
    const notifications = await prisma.notification.findMany({
        orderBy: { time: "desc" }
    });
    return NextResponse.json(notifications);
}
