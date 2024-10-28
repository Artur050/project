'use client';

import { Select } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuestionTitle, updateQuestionType } from '@/redux/templateslice';
import ShortAnswer from './qtypes/ShortAnswer';
import Paragraph from './qtypes/Paragraph';
import Edit from './Edit';
import { RootState } from '@/redux/store';
import Integer from './qtypes/Integer';

const data = [
    {
        title: 'SHORT_TEXT',
        file: <ShortAnswer />,
    },
    {
        title: 'LONG_TEXT',
        file: <Paragraph />,
    },
    {
        title: 'INTEGER',
        file: <Integer />,
    },
];

interface QuestionProps {
    index: number;
    value: { title: string; type: string; choices?: string[] | undefined };
    addQuestion: () => void;
    handleDelete: () => void;
    isActiveQuestion: boolean;
    onclick: React.MouseEventHandler<HTMLDivElement>;
}

const Question: React.FC<QuestionProps> = ({
    index,
    value,
    addQuestion,
    handleDelete,
    isActiveQuestion,
    onclick,
}) => {
    const dispatch = useDispatch();
    const { title, type } = value;

    const handleChange = (newValue: string) => {
        dispatch(updateQuestionTitle({ index, title: newValue }));
    };

    const handleTypeChange = (value: string) => {
        dispatch(updateQuestionType({ index, type: value }));
    };
    const activeQuestionIndex = useSelector(
        (state: RootState) => state.template.activeQuestionIndex,
    );
    const qType = data.find(elem => elem.title === type);

    return (
        <div
            onClick={onclick}
            className="flex md:flex-row flex-col justify-center items-center w-full max-w-3xl mx-auto "
        >
            <div
                className={` rounded-md my-6 ${
                    activeQuestionIndex === index
                        ? 'border-l-4 border-[#29A0B1]'
                        : 'border border-gray-300'
                }  bg-white max-w-2xl shadow w-full grid place-items-center lg:place-items-start lg:ml-10 mx-auto`}
            >
                <div className="w-full md:px-6 px-2 flex md:flex-row flex-col md:justify-between justify-center items-center gap-8 py-6">
                    <input
                        type="text"
                        value={title}
                        onChange={e => handleChange(e.target.value)}
                        placeholder="Question"
                        required
                        className="text-base px-4 outline-none capitalize border-b bg-gray-100 focus:border-b-2 border-gray-400 pt-3 pb-2 w-full focus:border-[#29A0B1]"
                    />
                    <Select
                        placeholder="Select Question Type"
                        style={{ width: 300 }}
                        onChange={handleTypeChange}
                        value={type}
                        options={[
                            { value: 'SHORT_TEXT', label: 'SHORT_TEXT' },
                            { value: 'LONG_TEXT', label: 'LONG_TEXT' },
                            { value: 'INTEGER', label: 'INTEGER' },
                        ]}
                    />
                </div>
                {qType && <div className="w-full">{qType.file}</div>}
            </div>
            {isActiveQuestion && <Edit handleAdd={addQuestion} handleDelete={handleDelete} />}
        </div>
    );
};

export default Question;
