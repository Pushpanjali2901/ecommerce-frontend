import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetails } from '../_model/order-details.model';
import { MyOrderDetails } from '../_model/order.model';
import { Product } from '../_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public addProduct(product: FormData){
    return this.httpClient.post<Product>("http://localhost:9009/addNewProduct", product);
  }

  public getAllProducts(searchkeyword: string="") {
    return this.httpClient.get<Product[]>("http://localhost:9009/getAllProducts?searchKey="+searchkeyword);
  }

  public getProductDetailsById(productId: number) {
    return this.httpClient.get<Product>("http://localhost:9009/getProductDetailsById/" +productId);
  }

  public deleteProduct(productId: number) {
    return this.httpClient.delete("http://localhost:9009/deleteProductDetails/" +productId);
  }

  public getProductDetails(isSingleProductCheckout:boolean, productId:number) {
    return this.httpClient.get("http://localhost:9009/getProductDetails/"+ isSingleProductCheckout + "/" +productId);
  } 

  public placeOrder(orderDetails: OrderDetails, isCartCheckout: boolean) {
    return this.httpClient.post("http://localhost:9009/placeOrder/"+isCartCheckout, orderDetails);
  } 

  public addToCart(productId: number) {
    return this.httpClient.get("http://localhost:9009/addToCart/" +productId);
  } 

  public getCartDetails() {
    return this.httpClient.get("http://localhost:9009/getCartDetails");
  } 

  public deleteCartItem(cartId: number) {
    return this.httpClient.delete("http://localhost:9009/deleteCartItem/"+cartId);
  } 

  public getMyOrders(): Observable<MyOrderDetails[]> {
    return this.httpClient.get<MyOrderDetails[]>("http://localhost:9009/getOrderDetails");
  } 

  public getAllOrderDetailsForAdmin(status: String): Observable<MyOrderDetails[]> {
    return this.httpClient.get<MyOrderDetails[]>("http://localhost:9009/getAllOrderDetails/"+status);
  } 

  public markAsDelivered(orderId: number) {
    return this.httpClient.get("http://localhost:9009/markOrderAsDelivered/"+orderId);
  } 

}
