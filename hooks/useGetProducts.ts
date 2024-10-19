import fetcher from "@/lib/fetcher";
import axios from "axios";
import useSWR from "swr";

export const useGetProducts = () => {
    
    const {data, isLoading, error} = useSWR('/api/products', fetcher, {
        revalidateOnFocus: false,
    });

    return {
        data,
        isLoading,
        error

    }

    // const addProduct = async (data) => {
    //     const res = await axios.post(path, {data});

    //     if(res.status !== 201 ) {
    //         throw new Error('Could not add product')
    //     }

    // }

    // return addProduct;
}