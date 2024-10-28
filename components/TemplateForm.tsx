'use client';
import { RootState } from '@/redux/store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addQuestion,
    deleteQuestion,
    setTitle,
    setDesc,
    setActiveQuestionIndex,
} from '@/redux/templateslice';
import Edit from './Edit';
import Question from './Question';
import { useRouter } from 'next/navigation';

const TemplateForm = () => {
    const dispatch = useDispatch();
    const title = useSelector((state: RootState) => state.template.title);
    const description = useSelector((state: RootState) => state.template.desc);
    const questions = useSelector((state: RootState) => state.template.questions);

    const activeQuestionIndex = useSelector(
        (state: RootState) => state.template.activeQuestionIndex,
    );
    const [loading, setLoading] = useState(false);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        dispatch(setTitle(e.target.value));
    };

    const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        dispatch(setDesc(e.target.value));
    };

    const handleAddQuestion = () => {
        dispatch(addQuestion());
    };

    const handleDeleteQuestion = (index: number) => {
        dispatch(deleteQuestion(index));
    };
    const handleQuestionClick = (index: number) => {
        dispatch(setActiveQuestionIndex(index));
    };
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formdata = {
                title,
                description,
                questions,
                publicFlag: true,
            };
            console.log('Submitting form:', formdata);
            const response = await fetch('/api/template', {
                method: 'POST',
                body: JSON.stringify(formdata),
            });
            if (response.ok) {
                console.log(response);
                router.push('/listtemplate');
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="w-full grid mx-auto min-h-screen py-10">
                <form
                    onSubmit={handleSubmit}
                    className="w-full block mx-auto h-full px-6 md:px-0 overflow-x-hidden"
                >
                    <div className="flex md:flex-row flex-col justify-center items-center max-w-3xl mx-auto">
                        <div className="border-t-8 rounded-md my-6 border-[#7248B9] bg-white max-w-2xl shadow w-full grid place-items-center mx-auto">
                            <div className="w-full border border-gray-300">
                                <div className="w-full px-6 py-2">
                                    <input
                                        type="text"
                                        required
                                        onChange={handleTitleChange}
                                        value={title ?? ''}
                                        className="text-3xl outline-none font-bold capitalize border-b 
                focus:border-b-2 border-gray-200 pt-3 pb-2 w-full focus:border-[#7248B9]"
                                    />
                                </div>
                                <div className="w-full px-6 py-1 mb-6">
                                    <input
                                        type="text"
                                        required
                                        onChange={handleDescChange}
                                        value={description ?? ''}
                                        className="text-base outline-none font-medium capitalize border-b 
                focus:border-b-2 border-gray-200 focus:border-[#7248B9] py-1 w-full"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            {questions.length === 0 && (
                                <Edit
                                    handleAdd={handleAddQuestion}
                                    show
                                    handleDelete={() => handleDeleteQuestion(questions.length - 1)}
                                />
                            )}
                        </div>
                    </div>
                    <div className="relative">
                        {questions.map((question, index) => (
                            <Question
                                onclick={() => handleQuestionClick(index)}
                                key={index}
                                index={index}
                                value={question}
                                addQuestion={handleAddQuestion}
                                handleDelete={() => handleDeleteQuestion(index)}
                                isActiveQuestion={index === activeQuestionIndex}
                            />
                        ))}
                    </div>
                    <div>
                        {questions.length > 0 && (
                            <div className="grid place-items-center w-auto mx-auto">
                                <button
                                    type="submit"
                                    className="bg-[#29A0B1] text-white px-6 py-3 rounded"
                                >
                                    {loading ? 'Processing' : 'Save Form'}
                                </button>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TemplateForm;
