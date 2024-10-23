import { authConfig } from '@/config/auth';
import { createTemplate, getTemplates, updateTemplate } from '@/prisma/template';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authConfig);
    if (!session || !session.user ) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const {id, title, description, questions, publicFlag } = body;

    let savedTemplate;
    if (id) {
      // Обновляем существующий шаблон
      savedTemplate = await updateTemplate(id, {
        title,
        description,
        questions,
        publicFlag,
      });
    } else {
      // Создаём новый шаблон
      savedTemplate = await createTemplate({
        title,
        description,
        questions,
        publicFlag,
        authorId: session.user.id,
      });
    }


    // const newTemplate = await createTemplate({
    //   title,
    //   description,
    //   questions,
    //   publicFlag,
    //   authorId: session.user.id,
    // });

    return NextResponse.json(savedTemplate, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/template:', error);
    return NextResponse.json({ error: `Error creating template: ${error}` }, { status: 500 });
  }
}

export async function GET() {
  try {
    const templates = await getTemplates();
    return NextResponse.json(templates, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/template:', error);
    return NextResponse.json({ error: 'Error fetching templates' }, { status: 500 });
  }
}
