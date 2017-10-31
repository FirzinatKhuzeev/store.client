import { NotificationService } from './../../services/notification.service';
import { Options } from './../../models/options';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ProductHelper } from '../../helpers/product.helper';
import { APP_ROUTE_PRODUCTS, ID } from '../../helpers/constants';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  providers: [ProductService]
})
export class ProductDetailsComponent implements OnInit {
  public product: Product = new Product();
  public productId: string;
  public brands: Array<Options> = [];
  public categories: Array<Options> = [];

  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    public productHelper: ProductHelper,
    private notification: NotificationService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params[ID];
    });

    if (this.productId) {
      this.productService.getById(this.productId).subscribe(
        data => {
          this.product = data;
        },
        error => {
          this.notification.notify(error.message);
          console.error(error);
        }
      );
    } else {
      this.product = new Product();
    }

    this.brands = this.productHelper.getBrands();
    this.categories = this.productHelper.getCategories();
  }

  back(): void {
    this.router.navigate([APP_ROUTE_PRODUCTS]);
  }

  save(): void {
    if (this.product.id) {
      this.productService.update(this.product).subscribe(
        data => {
          this.product = data;
        },
        error => {
          this.notification.notify(error.message);
          console.error(error);
        });
    } else {
      this.productService.create(this.product).subscribe(
        data => {
          this.product = data;
        },
        error => {
          this.notification.notify(error.message);
          console.error(error);
        });
    }
  }

  delete(): void {
    this.productService.delete(this.product.id).subscribe(
      data => {
        this.product = new Product();
      },
      error => {
        this.notification.notify(error.message);
        console.error(error);
      });
  }
}
