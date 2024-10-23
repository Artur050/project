// import { PrismaClient } from "@prisma/client";


// const prisma = new PrismaClient();

// export const createProduct = async (
//     image: string, 
//     title: string, 
//     price: number, 
//     category: string,
// ) => {
//  const product = await prisma.product.create({
//     data: {
//         image,
//         title,
//         price,
//         category
//     }
//  });

//  return product;
// }

// export const getAllProducts = async () => {
//     const products = await prisma.product.findMany();

//     return products;
// }

// export const deleteProduct = async (id:string) => {
//     await prisma.product.delete({
//         where: { id: id}
//     })
// }

