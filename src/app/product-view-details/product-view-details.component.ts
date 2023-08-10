import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_service/product.service';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent implements OnInit {

  product: any;
  selectedIndex = 0;

  constructor(
    private router: Router,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product);
  }

  changeIndex(index: number) {
    this.selectedIndex = index;
  }

  buyProduct(productId: number) {
    this.router.navigate(['/buyProduct', {
      isSingleProductCheckout: true, id: productId
    }]);
  }

  addToCart(productId: number){
    this.productService.addToCart(productId).subscribe(
      (resp) => {
        console.log(resp);
      }, (error) => {
        console.log(error);
      }
    )
  }

}
