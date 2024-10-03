// app/api/ai-contents/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const aiContent = await prisma.aIContent.findUnique({
            where: { id: params.id },
        });
        if (!aiContent) {
            return NextResponse.json({ error: 'AI content not found' }, { status: 404 });
        }
        return NextResponse.json(aiContent);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch AI content' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const updatedAIContent = await prisma.aIContent.update({
            where: { id: params.id },
            data: body,
        });
        return NextResponse.json(updatedAIContent);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update AI content' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await prisma.aIContent.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ message: 'AI content deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete AI content' }, { status: 500 });
    }
}