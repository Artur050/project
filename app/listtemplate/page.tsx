'use client';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';

interface Question {
    title: string;
    type: 'SHORT_TEXT' | 'LONG_TEXT' | 'INTEGER';
}

interface Template {
    id: string;
    title: string;
    description: string;
    questions: Question[];
}

export default function ListTemplate() {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/template');
                const data = await response.json();
                setTemplates(data.templates);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <main>
            <main className="grid place-items-center px-7 mx-auto w-full max-w-3xl">
                {loading && <Progress value={33} />}
                {!loading && templates && (
                    <ul className="w-full">
                        <div className="text-2xl font-bold text-center text-gray-800 mb-4">
                            All Templates
                        </div>
                        {templates.map((template, idx) => {
                            return (
                                <li
                                    className="list-decimal flex justify-between items-center border-b border-gray-200 py-3 w-full my-1 px-5"
                                    key={idx}
                                >
                                    <span className="capitalize">
                                        {idx + 1}. &nbsp; {template.title}
                                    </span>
                                    <a
                                        href={`/template/${template.id}`}
                                        className="text-sm lowercase hover:underline hover:underline-offset-4 text-blue-700 cursor-pointer"
                                    >
                                        Open
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </main>
        </main>
    );
}
