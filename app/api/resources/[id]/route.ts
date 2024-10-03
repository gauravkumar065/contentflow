
// app/api/resources/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const resource = await prisma.resource.findUnique({
            where: { id: params.id },
        });
        if (!resource) {
            return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
        }
        return NextResponse.json(resource);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch resource' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const updatedResource = await prisma.resource.update({
            where: { id: params.id },
            data: body,
        });
        return NextResponse.json(updatedResource);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update resource' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await prisma.resource.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ message: 'Resource deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete resource' }, { status: 500 });
    }
}
