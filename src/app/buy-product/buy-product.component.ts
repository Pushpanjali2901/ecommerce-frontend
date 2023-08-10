import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetails } from '../_model/order-details.model';
import { ProductService } from '../_service/product.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {

  isSingleProductCheckout: any = '';
  productDetails: any[] = [];

  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateNumber: '',
    orderProductQuantity: []
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout");
    this.productDetails.forEach(
      x => this.orderDetails.orderProductQuantity.push(
        {productId: x.productId, quantity: 1}
      )
    )

    console.log(this.orderDetails);
  }

  placeOrder(orderForm: NgForm) {
    this.productService.placeOrder(this.orderDetails, this.isSingleProductCheckout).subscribe(
      (resp) => {
        console.log(resp);
        orderForm.reset();
        this.router.navigate(["/orderConfirm"]);
      }, 
      (err) => {
        console.log(err);
      } 
    )
  }

  getQuantityForProduct(productId: number) {
    const filteredProduct = this.orderDetails.orderProductQuantity.filter(
      (productQuantity) => productQuantity.productId === productId
    );

    return filteredProduct[0].quantity;
  }

  getCalculatedTotal(productId:number, productDiscountedPrice:number) {
    const filteredProduct = this.orderDetails.orderProductQuantity.filter(
      (productQuantity) => productQuantity.productId === productId
    );
    return filteredProduct[0].quantity *productDiscountedPrice;
  }
  
  onQuantityChanged(q: string, productId: number) {
    const quan = Number(q);
    this.orderDetails.orderProductQuantity.filter(
      (orderProduct) => orderProduct.productId === productId
    )[0].quantity = quan;
  }

  getCalculatedGrandTotal() {
    let grandTotal = 0;

    this.orderDetails.orderProductQuantity.forEach(
      (productQuantity) => {
        const price = this.productDetails.filter(product => product.productId === productQuantity.productId)[0].productDiscountedPrice;
        grandTotal = grandTotal + price * productQuantity.quantity;
      }
    );
    return grandTotal;
  }

}
