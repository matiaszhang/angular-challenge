import { Component, Inject, OnInit } from '@angular/core';
import { Product } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['name', 'description', 'price'];

  constructor(@Inject('ProductService') private productService: any) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (products: any) => {
        this.products = products;
      },
      ({ error }: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
