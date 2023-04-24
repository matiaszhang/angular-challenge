import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Inject,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/services/product.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  @Input() product: Product | null = null;

  @Output() onSubmit: EventEmitter<Product> = new EventEmitter<Product>();

  productForm: FormGroup;
  activeId: string | null = '';

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject('ProductService') private productService: any
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });

    this.activeId = this.route.snapshot.paramMap.get('id');
    if (this.activeId) {
      this.productService.getProduct(this.activeId).subscribe(
        (product: any) => {
          this.product = product;
          this.productForm.patchValue(product);
        },
        ({ error }: any) => {
          this.toastService.makeToast(error.message, 'Close', 3000);
        }
      );
    }
  }

  ngOnInit(): void {}

  submit(): void {
    if (this.productForm.valid) {
      const productData: Product = this.productForm.value;

      if (this.product && this.product._id) {
        this.productService
          .updateProduct(this.product._id, productData)
          .subscribe(
            (updatedProduct: any) => {
              this.toastService.makeToast('Product updated', 'Close', 3000);
              this.router.navigate(['/products']);
            },
            ({ error }: any) => {
              this.toastService.makeToast(error.message, 'Close', 3000);
            }
          );
      } else {
        this.productService.createProduct(productData).subscribe(
          (createdProduct: any) => {
            this.toastService.makeToast('New product created', 'Close', 3000);
            this.router.navigate(['/products']);
          },
          ({ error }: any) => {
            this.toastService.makeToast(error.message, 'Close', 3000);
          }
        );
      }
    } else {
      this.toastService.makeToast('Please input correctly', 'Close', 3000);
    }
  }

  handleClose(): void {
    this.router.navigate(['/products']);
  }
}
