'use client';

import { useEffect, useState } from 'react';
import ShortAnswer from './qtypes/ShortAnswer';
import Paragraph from './qtypes/Paragraph';
import Integer from './qtypes/Integer';

interface Question {
    title: string;
    type: 'SHORT_TEXT' | 'LONG_TEXT' | 'INTEGER';
}

interface Template {
    title: string;
    description: string;
    questions: Question[];
}

const View = ({ params }: { params: string }) => {
    const [templates, setTemplates] = useState<Template | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/template/${params}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTemplates(data.template);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params]);

    return (
        <div className="w-full max-w-3xl mx-auto py-10">
            {loading ? (
                <div className="my-10 grid place-items-center">Loading .....</div>
            ) : (
                <form className="block mx-auto overflow-hidden">
                    <div className="border-t-8 border-[#7248B9] bg-white rounded-md shadow mb-6">
                        <div className="border border-gray-300 p-6">
                            <h2 className="text-3xl font-bold capitalize border-b pb-2">
                                {templates?.title}
                            </h2>
                            <p className="text-base font-medium capitalize pt-2">
                                {templates?.description}
                            </p>
                        </div>
                    </div>

                    {templates?.questions.map((ques, idx) => (
                        <div key={idx} className="bg-white shadow rounded-md mb-6">
                            <div className="p-6">
                                <div className="text-base font-medium capitalize mb-2">
                                    {ques.title}
                                </div>
                                <div>
                                    {ques.type === 'SHORT_TEXT' && <ShortAnswer />}
                                    {ques.type === 'LONG_TEXT' && <Paragraph />}
                                    {ques.type === 'INTEGER' && <Integer />}
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="grid place-items-center mt-6">
                        <button
                            type="submit"
                            className="bg-[#19b9d2] font-bold uppercase text-white px-6 py-3 rounded"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default View;
