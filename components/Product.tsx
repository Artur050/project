'use client'
import { useDeleteProduct } from '@/hooks/useDeleteProduct'
import { IProduct } from '@/models/Products/IProduct'
import Image from 'next/image';
import React from 'react'

interface ProductProps {
  product: IProduct;
}

const Product: React.FC<ProductProps> = ({product}) => {

  const deleteProduct = useDeleteProduct('/api/products');

  const handleDelete = async (id:string) => {
    try {
      await deleteProduct(id);
      // alert('Product deleted successfully');
    } catch (error) {
      alert(error)
    }
  }
  return (
    <div>
        <div>
        {product.image ? (
          <Image 
            src={product.image} 
            alt={product.title} 
            width={500}
            height={300}
            layout="responsive" 
          />
        ) : (
          <div>No image available</div>
        )}
            <div>
                <div>{product?.title}</div>
                <p>{product?.price}</p>
                <p>{product?.category}</p>
            </div>
            <div>
                <button onClick={ () => handleDelete(product.id)}>Delete</button>
            </div>
        </div>

    </div>
  )
}

export default Product
