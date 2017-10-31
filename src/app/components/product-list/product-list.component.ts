import { APP_ROUTE_PRODUCT } from './../../helpers/constants';
import { NotificationService } from './../../services/notification.service';
import { Router } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Observable } from 'rxjs/Observable';
import { Product } from './../../models/product';
import { ProductDataSource } from '../../helpers/product.helper';
import {
  Component,
  OnInit,
  ViewChild,
  SimpleChanges,
  AfterViewInit,
  Input,
  OnChanges,
  ElementRef
} from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatPaginator, MatSort } from '@angular/material';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { KEY_UP, FILTER, DISPLAYED_COLUMNS } from '../../helpers/constants';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [ProductService]
})

export class ProductListComponent implements OnInit, OnChanges {
  displayedColumns = DISPLAYED_COLUMNS;
  dataSource: ProductDataSource;
  productCount: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(FILTER) filter: ElementRef;

  ngOnInit(): void {

    this.productService.getAll().subscribe(
      data => {
        this.dataSource = new ProductDataSource(data, this.paginator, this.sort);
        this.productCount = data.length;
      },
      error => {
        console.error(error);
      });

    Observable.fromEvent(this.filter.nativeElement, KEY_UP)
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.products) {
      const data = changes.data.currentValue;
      this.productCount = data.length;
    }
  }

  constructor(
    private productService: ProductService,
    private router: Router,
    private notification: NotificationService
  ) { }

  public getProducts() {
    return this.productService.getAll().subscribe(
      data => {
        console.log(JSON.stringify(data));
      },
      error => {
        this.notification.notify(error.message);
        console.error(error);
      });
  }

  public create() {
    this.router.navigate([APP_ROUTE_PRODUCT]);
  }
}
