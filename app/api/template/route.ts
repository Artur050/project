import { NextResponse, NextRequest } from 'next/server';
import { createTemplate, updateTemplate, getTemplates } from '@/prisma/template';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/config/auth';

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authConfig);
        if (!session || !session.user) {
            return new Response('Unauthorized', { status: 401 });
        }

        const body = await req.json();
        const { id, title, description, questions, publicFlag = false } = body;

        let savedTemplate;
        if (id) {
            savedTemplate = await updateTemplate(id, {
                title,
                description,
                questions,
                publicFlag,
            });
        } else {
            savedTemplate = await createTemplate({
                title,
                description,
                questions,
                publicFlag,
                authorId: session.user.id,
            });
        }
        return NextResponse.json(
            { message: 'Template Created Successfully', success: true, savedTemplate },
            { status: 201 },
        );
    } catch (error) {
        console.error('Error creating template:', error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { templateId, ...data } = await req.json();
        const updatedTemplate = await updateTemplate(templateId, data);
        return NextResponse.json(
            { message: 'Template Updated Successfully', success: true, updatedTemplate },
            { status: 200 },
        );
    } catch (error) {
        console.error('Error updating template:', error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function GET() {
    try {
        const templates = await getTemplates();
        return NextResponse.json({ templates }, { status: 200 });
    } catch (error) {
        console.error('Error fetching templates:', error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
