import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ImageProcessingService } from '../image-processing.service';
import { Product } from '../_model/product.model';
import { ProductService } from '../_service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productDetails: any = [];

  constructor(
    private router: Router,
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  searchByKeyword(searchkeyword: string) {
    console.log(searchkeyword);
    this.productDetails = [];
    this.getAllProducts(searchkeyword);
  }

  public getAllProducts(searchKey: string="") {
    this.productService.getAllProducts(searchKey)
    .pipe(
      map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
    )
    .subscribe(
      (resp: Product[]) => {
        console.log(resp);
        this.productDetails = resp;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  showProductDetails(productId: number) {
    this.router.navigate(['/productViewDetails', {productId: productId}]);
  }


}
