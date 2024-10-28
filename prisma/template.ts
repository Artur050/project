import { PrismaClient, QuestionType } from '@prisma/client';

const prisma = new PrismaClient();

export const createTemplate = async (data: {
    title: string;
    description: string;
    questions: Array<{ title: string; type: QuestionType }>;
    publicFlag: boolean;
    authorId: string;
}) => {
    console.log('Received data', data);

    return await prisma.template.create({
        data: {
            title: data.title,
            description: data.description,
            publicFlag: data.publicFlag,
            authorId: data.authorId,
            questions: {
                create: data.questions.map(q => ({
                    title: q.title,
                    type: q.type,
                })),
            },
        },
    });
};

export const updateTemplate = async (
    templateId: string,
    data: {
        title: string;
        description: string;
        questions: Array<{ id?: string; title: string; type: QuestionType }>;
        publicFlag: boolean;
    },
) => {
    const existingTemplate = await prisma.template.findUnique({
        where: { id: templateId },
        include: { questions: true },
    });

    if (!existingTemplate) {
        throw new Error('Template not found');
    }

    const existingQuestionIds = existingTemplate.questions.map(q => q.id);
    const incomingQuestionIds = data.questions.map(q => q.id).filter(Boolean);

    const questionsToDelete = existingQuestionIds.filter(id => !incomingQuestionIds.includes(id));
    const questionsToUpdate = data.questions.filter(
        q => q.id && existingQuestionIds.includes(q.id),
    );
    const questionsToCreate = data.questions.filter(q => !q.id);

    return await prisma.template.update({
        where: { id: templateId },
        data: {
            title: data.title,
            description: data.description,
            publicFlag: data.publicFlag,
            questions: {
                deleteMany: { id: { in: questionsToDelete } },
                update: questionsToUpdate.map(q => ({
                    where: { id: q.id },
                    data: { title: q.title, type: q.type },
                })),
                create: questionsToCreate.map(q => ({
                    title: q.title,
                    type: q.type,
                })),
            },
        },
    });
};

export const getTemplateById = async (id: string) => {
    return await prisma.template.findUnique({
        where: { id },
        include: { questions: true },
    });
};

export const getTemplates = async () => {
    return await prisma.template.findMany({
        include: {
            questions: true,
        },
    });
};

export default prisma;
