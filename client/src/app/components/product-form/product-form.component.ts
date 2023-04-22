import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Product, productService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  @Input() product: Product | null = null;
  @Output() onSubmit: EventEmitter<Product> = new EventEmitter<Product>();

  productForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    if (this.product) {
      this.productForm.patchValue(this.product);
    }
  }

  submit(): void {
    if (this.productForm.valid) {
      const productData: Product = this.productForm.value;

      if (this.product && this.product._id) {
        productService
          .updateProduct(this.http, this.product._id, productData)
          .subscribe(
            (updatedProduct) => {
              this.onSubmit.emit(updatedProduct);
            },
            (error) => {
              console.error('Error updating product:', error);
            }
          );
      } else {
        productService.createProduct(this.http, productData).subscribe(
          (createdProduct) => {
            this.onSubmit.emit(createdProduct);
          },
          (error) => {
            console.error('Error creating product:', error);
          }
        );
      }
    }
  }
}
