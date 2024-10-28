import { getTemplateById } from '@/prisma/template';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        const template = await getTemplateById(id);

        if (!template) {
            return NextResponse.json({ error: 'Template not found' }, { status: 404 });
        }

        return NextResponse.json(
            { message: 'Template fetched successfully', success: true, template },
            { status: 200 },
        );
    } catch (error) {
        console.error('Error fetching template:', error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
