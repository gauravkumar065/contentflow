// app/api/ideas/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const idea = await prisma.idea.findUnique({
            where: { id: params.id },
        });
        if (!idea) {
            return NextResponse.json({ error: 'Idea not found' }, { status: 404 });
        }
        return NextResponse.json(idea);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch idea' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const updatedIdea = await prisma.idea.update({
            where: { id: params.id },
            data: body,
        });
        return NextResponse.json(updatedIdea);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update idea' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await prisma.idea.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ message: 'Idea deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete idea' }, { status: 500 });
    }
}
