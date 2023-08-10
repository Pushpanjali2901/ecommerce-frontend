import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_service/product.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  displayedColumns = ["Id", "Product Name", "Name", "Address", "Contact No.", "Status", "Action"];
  dataSource: any = [];
  status: String = 'All';

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getAllOrderDetailsForAdmin(this.status);
  }

  getAllOrderDetailsForAdmin(status: String) {
    this.productService.getAllOrderDetailsForAdmin(status).subscribe(
      (resp) => {
        console.log(resp);
        this.dataSource = resp;
      }, (error) => {
        console.log(error);
      }
    );
  }

  markAsDelivered(orderId: number) {
    console.log(orderId);
    this.productService.markAsDelivered(orderId).subscribe(
      (resp) => {
        console.log(resp);
        this.getAllOrderDetailsForAdmin(this.status);
      }, (error) => {
        console.log(error);
      }
    );
  }

}
