import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map, of } from 'rxjs';
import { Observable } from 'rxjs';
import { ImageProcessingService } from './image-processing.service';
import { Product } from './_model/product.model';
import { ProductService } from './_service/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product> {

  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService
  ) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const id = Number(route.paramMap.get("productId"));
    
    if(id){
      return this.productService.getProductDetailsById(id).pipe(
                      map( p => this.imageProcessingService.createImages(p))
                    );

    }else{
      return of(this.getProductDetails());
    }
    
  }

  getProductDetails() {
    return {
      productId: 0,
      productName: "",
      productDescription: "",
      productActualPrice: 0,
      productDiscountedPrice: 0,
      productImages: []
    }
  }
}
