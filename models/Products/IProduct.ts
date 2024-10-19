export interface IProduct {
    id : string;
    image?: string;
    title: string;
    price: number;
    category: string; 
    description?: string;
    createdAt: Date;
}