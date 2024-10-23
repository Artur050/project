"use client";
import { useState } from "react";

type QuestionType = "SHORT_TEXT" | "LONG_TEXT" | "INTEGER" | "CHECKBOX";

interface Question {
  id?: string;
  title: string;
  type: QuestionType;
}

interface TemplateData {
  id?: string;
  title: string;
  description: string;
  public: boolean;
  questions: Question[];
}

export default function TemplateForm({ templateData }: {templateData?: TemplateData}) {
  const [formData, setFormData] = useState({
    id: templateData?.id || '',
    title: templateData?.title || '',
    description: templateData?.description || '',
    publicFlag: templateData?.public || false,
    questions: templateData?.questions || [],
  });

  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, { title: '', type: 'SHORT_TEXT' }],
    }));
  };

  const removeQuestion = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  const updateQuestion = (index: number, updatedQuestion: Question) => {
    setFormData((prev) => {
      const updatedQuestions = prev.questions.map((q, i) =>
        i === index ? updatedQuestion : q
      );
      return { ...prev, questions: updatedQuestions };
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const templateData = {
      ...formData,
      questions: formData.questions.map((question) => ({
        id: question.id || undefined,
        title: question.title,
        type: question.type,
      })),
      };

    console.log('templateData', templateData)

    try {
      const response = await fetch('/api/template', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(templateData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit template');
      }

      const result = await response.json();
      console.log('Template saved', result);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">
        {templateData ? 'Edit Template' : 'Create New Template'}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="public"
              checked={formData.publicFlag}
              onChange={handleInputChange}
              className="mr-2"
            />
            Public Template
          </label>
        </div>

        {/* Questions section */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Questions</h3>
          {formData.questions.map((question, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                value={question.title}
                onChange={(e) =>
                  updateQuestion(index, { ...question, title: e.target.value })
                }
                placeholder="Question title"
                className="w-full p-2 border"
              />
              <select
                value={question.type}
                onChange={(e) =>
                  updateQuestion(index, { ...question, type: e.target.value as QuestionType })
                }
                className="w-full p-2 border mt-2"
              >
                <option value="SHORT_TEXT">Short Text</option>
                <option value="LONG_TEXT">Long Text</option>
                <option value="INTEGER">Number</option>
                <option value="CHECKBOX">Checkbox</option>
              </select>
              <button
                type="button"
                className="text-red-500 mt-2"
                onClick={() => removeQuestion(index)}
              >
                Remove Question
              </button>
            </div>
          ))}
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={addQuestion}
          >
            Add Question
          </button>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {templateData ? 'Update Template' : 'Create Template'}
        </button>
      </form>
    </div>
  );
}

// 'use client'
// import { useState } from 'react';

// export default function TemplateForm({ templateData}) {

//   const [formData, setFormData] = useState(templateData || {});
//   const [title, setTitle] = useState(templateData?.title || '');
//   const [description, setDescription] = useState(templateData?.description || '');
//   const [isPublic, setIsPublic] = useState(templateData?.public || false);
//   const [questions, setQuestions] = useState(templateData?.questions || []);

//   const addQuestion = () => {
//     setQuestions([...questions, { title: '', type: 'SHORT_TEXT' }]);
//   };

//   const removeQuestion = (index) => {
//     setQuestions(questions.filter((_, i) => i !== index));
//   };

//   const updateQuestion = (index, updatedQuestion) => {
//     const updatedQuestions = questions.map((q, i) => (i === index ? updatedQuestion : q));
//     setQuestions(updatedQuestions);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await fetch('/api/template', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to submit template');
//       }

//       const result = await response.json();
//       console.log('Template saved', result);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };


//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         {/* Пример полей формы */}
//         <input
//             type="text"
//             name="title"
//             value={formData.title || ''}
//             onChange={handleInputChange}
//             placeholder="Template title"
//         />
//         <button type="submit">Save Template</button>
//       </form>
//         <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-semibold mb-4">
//         {templateData ? 'Edit Template' : 'Create New Template'}
//       </h1>
//       {/* Ваша логика формы */}
//       <div className="mb-4">
//         <label className="block text-gray-700">Title</label>
//         <input
//           type="text"
//           className="w-full p-2 border border-gray-300 rounded"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Description</label>
//         <textarea
//           className="w-full p-2 border border-gray-300 rounded"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//       </div>
//       <div className="mb-4">
//         <label className="flex items-center">
//           <input
//             type="checkbox"
//             className="mr-2"
//             checked={isPublic}
//             onChange={(e) => setIsPublic(e.target.checked)}
//           />
//           Public Template
//         </label>
//       </div>

//       {/* Questions section */}
//       <div className="mb-4">
//         <h3 className="text-lg font-semibold mb-2">Questions</h3>
//         {questions.map((question, index) => (
//           <div key={index} className="mb-4">
//             <input
//               type="text"
//               value={question.title}
//               onChange={(e) =>
//                 updateQuestion(index, { ...question, title: e.target.value })
//               }
//               placeholder="Question title"
//               className="w-full p-2 border"
//             />
//             <select
//               value={question.type}
//               onChange={(e) =>
//                 updateQuestion(index, { ...question, type: e.target.value })
//               }
//               className="w-full p-2 border mt-2"
//             >
//               <option value="SHORT_TEXT">Short Text</option>
//               <option value="LONG_TEXT">Long Text</option>
//               <option value="INTEGER">Number</option>
//               <option value="CHECKBOX">Checkbox</option>
//             </select>
//             <button
//               className="text-red-500 mt-2"
//               onClick={() => removeQuestion(index)}
//             >
//               Remove Question
//             </button>
//           </div>
//         ))}
//         <button
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           onClick={addQuestion}
//         >
//           Add Question
//         </button>
//       </div>
//       <button
//         className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//         onClick={handleSubmit}
//       >
//         {templateData ? 'Update Template' : 'Create Template'}
//       </button>
//     </div>
//     </>

//   );
// }
