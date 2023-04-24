import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/services/product.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    @Inject('ProductService') private productService: any
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProduct(productId).subscribe(
        (product: any) => {
          this.product = product;
        },
        ({ error }: any) => {
          this.toastService.makeToast(error.message, 'Close', 3000);
        }
      );
    }
  }

  handleEdit(): void {
    this.router.navigate([`/product-edit/${this.product?._id}`]);
  }

  handleClose(): void {
    this.router.navigate(['/products']);
  }
}
