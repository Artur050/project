'use server';

import dynamic from 'next/dynamic';

const DynamicFormView = dynamic(() => import('@/components/View'), { ssr: false });

const FormView = async ({ params }: { params: { id: string } }) => {
    return (
        <div>
            <DynamicFormView params={params.id} />
        </div>
    );
};

export default FormView;
