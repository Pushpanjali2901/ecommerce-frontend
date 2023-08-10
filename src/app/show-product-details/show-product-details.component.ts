import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { map } from 'rxjs';
import { ImageProcessingService } from '../image-processing.service';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { Product } from '../_model/product.model';
import { ProductService } from '../_service/product.service';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {

  productDetails: Product[] = [];
  displayedColumns: string[] = ['Id', 'Name', 'description', 'Actual Price', 'Discounted Price', 'Actions']

  constructor(
    private productService: ProductService,
    public imagesDialog: MatDialog,
    private router: Router,
    private imageProcessingService: ImageProcessingService
    ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  searchByKeyword(searchkeyword: string="") {
    console.log(searchkeyword);
    this.productDetails = [];
    this.getAllProducts(searchkeyword);
  }

  public getAllProducts(searchKey: string=""){
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

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe(
      (resp) => {
        this.getAllProducts();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  showImages(product: Product) {
    console.log(product);
    this.imagesDialog.open(ShowProductImagesDialogComponent, {
      data: {
        images: product.productImages
      },
      height: '500px',
      width: '800px'
    });
  }

  editProductDetails(productId: number) {
  this.router.navigate(['/addNewProduct', {productId:productId}]);
  }

}
