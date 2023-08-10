import { Product } from "./product.model";

export interface MyOrderDetails {
    orderId: number;
    orderBy: string;
    orderAddress: string;
    orderContactNumber: string;
    orderAlternateNumber: string;
    orderStatus: string;
    orderAmout: number;
    product: Product;
    user: any;
}