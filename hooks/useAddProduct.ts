import axios from "axios";
import useSWR from "swr";

export const useAddProduct = (path:string) => {
    const {mutate} = useSWR(path);

    const addProduct = async (data:any) => {
        const res = await axios.post(path, {data});
        if(res.status !== 201 ) {
            throw new Error('Could not add product')
        }
        mutate();
    }

    return addProduct;
}