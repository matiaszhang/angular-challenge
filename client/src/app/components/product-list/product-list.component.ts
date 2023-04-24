import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PRODUCT_ACTION, Product } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = [
    'index',
    'name',
    'description',
    'price',
    'action',
  ];

  constructor(
    @Inject('ProductService') private productService: any,
    private router: Router
  ) {}

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

  handleView(id: string): void {
    this.router.navigate([`product/${id}`]);
  }

  handleEdit(id: string): void {
    this.router.navigate([`product-edit/${id}`]);
  }

  handleDelete(id: string): void {
    this.productService.deleteProduct(id).subscribe(
      (products: any) => {
        this.products = products;
      },
      ({ error }: any) => {}
    );
  }
}
