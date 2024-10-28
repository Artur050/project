import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/prisma/template';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query') || '';

    try {
        const templates = await prisma.template.findMany({
            where: {
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } },
                ],
            },
        });

        return NextResponse.json({ templates });
    } catch (error) {
        console.error('Error searching templates:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
