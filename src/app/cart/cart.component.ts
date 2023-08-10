import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../_service/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  displayedColumns: string[] = ['Name', 'Description', 'Price', 'Discounted Price', "Action"];
  cartDetails: any = [];

  constructor(
    private router: Router,
    private productService: ProductService
  ) {  }

  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails() {
    this.productService.getCartDetails().subscribe(
      (resp) => {
        this.cartDetails = resp;
        console.log(resp);
      }, (error) => {
        console.log(error);
      }
    )
  }

  checkout() {
    this.router.navigate(['/buyProduct', {
      isSingleProductCheckout: false, id: 0
    }]);
    // this.productService.getProductDetails(false, 0).subscribe(
    //   (resp) => {
    //     console.log(resp);
    //   }, (error) => {
    //     console.log(error);
    //   }
    // )
  }

  delete(cartId: number) {
    console.log(cartId);
    this.productService.deleteCartItem(cartId).subscribe(
      (resp) => {
        this.getCartDetails();
      }, (error) => {
        console.log(error);
      }
    );
  }

}
