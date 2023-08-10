import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ImageProcessingService } from './image-processing.service';
import { Product } from './_model/product.model';
import { ProductService } from './_service/product.service';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<Product[]> {

  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService
  ) { }

  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any[] | Observable<any[]> | Promise<any[]> {
    const id = Number(route.paramMap.get("id"));
    const isSingleProductCheckout = route.paramMap.has("isSingleProductCheckout");
    return this.productService.getProductDetails(isSingleProductCheckout, id)
            .pipe(
              map(
                (x: any, i: number) => x.map((product: Product) => this.imageProcessingService.createImages(product))  
              )
            );
  }
}
