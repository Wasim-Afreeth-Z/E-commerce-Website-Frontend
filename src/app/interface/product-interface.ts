export interface ProductDashboard {
    product_id:string;
    productname: string;
    description: string;
    category: string;
    cat_id: number;
    image?:string;
    price:number;
    stock:string;
    user_id:number;
}