// app/api/scripts/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const script = await prisma.script.findUnique({
            where: { id: params.id },
        });
        if (!script) {
            return NextResponse.json({ error: 'Script not found' }, { status: 404 });
        }
        return NextResponse.json(script);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch script' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const updatedScript = await prisma.script.update({
            where: { id: params.id },
            data: body,
        });
        return NextResponse.json(updatedScript);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update script' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await prisma.script.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ message: 'Script deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete script' }, { status: 500 });
    }
}
