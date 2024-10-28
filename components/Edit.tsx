import { IoAddSharp } from 'react-icons/io5';
import { MdDeleteOutline } from 'react-icons/md';

interface EditProps {
    handleAdd: () => void;
    handleDelete: () => void;
    show?: boolean;
}

const Edit: React.FC<EditProps> = ({ handleAdd, handleDelete, show }) => {
    return (
        <div className="bg-gray-50/80 shadow p-4 md:p-2 ml-2 rounded-md flex md:flex-col gap-4 justify-center items-center">
            <div
                onClick={handleAdd}
                className="md:border-b md:border-r-0 border-r pr-4 md:px-0 py-2 border-gray-400 cursor-pointer hover:text-[#40d728e6]"
            >
                <IoAddSharp size={25} />
            </div>
            {!show && (
                <div onClick={handleDelete} className="cursor-pointer py-2 hover:text-red-400">
                    <MdDeleteOutline size={25} />
                </div>
            )}
        </div>
    );
};

export default Edit;
