import axios from "axios";
import useSWR from "swr";

export const useDeleteProduct = (path:string) => {
    const {mutate} = useSWR(path);

    const deleteProduct = async (id:string) => {
        try {
            const res = await axios.delete(`${path}?id=${id}`);

            // Успешный код состояния для удаления обычно 204
            if (res.status < 200 || res.status >= 300) {
                throw new Error('Could not delete product');
            }

            // Обновление данных после успешного удаления
            mutate();
        } catch (error) {
            console.error("Error deleting product:", error);
            throw error; // Прокидываем ошибку дальше
        }
    }

    return deleteProduct;
}
