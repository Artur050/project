'use client'
import Product from "@/components/Product";
import { useGetProducts } from "@/hooks/useGetProducts";
import { IProduct } from "@/models/Products/IProduct";

export default function Products() {

    const {data: products, 
        // isLoading, error
    } = useGetProducts();

    return (
        <>
        <h1 className="text-4xl font-bold text-center my-8 text-gray-800">
            All Products
        </h1>
        <div className=" container mx-auto mt-5 py-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 items-center py-3">
                {
                    products?.map((product: IProduct) => {
                        return <Product key={product.id} product={product} />
                    })
                }
            </div>
            
        </div>

        </>
    );
}
   