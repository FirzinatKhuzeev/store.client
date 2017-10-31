import { Observable } from 'rxjs/Observable';
import { MatPaginator, MatSort } from '@angular/material';
import { Product } from './../models/product';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Options } from './../models/options';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductHelper {

  constructor() { }

  getBrandName(id: number): string {
    const brand = this.getBrands().filter(brand => brand.id === id)[0];
    return brand && brand.name ? brand.name : '';
  }

  getCategoryName(id: number): string {
    const category = this.getCategories().filter(category => category.id === id)[0];
    return category && category.name ? category.name : '';
  }

  getBrands(): Array<Options> {
    return [
      {
        id: 1,
        name: 'Nescafe'
      },
      {
        id: 2,
        name: 'Walmart'
      },
      {
        id: 3,
        name: 'Starbucks'
      },
      {
        id: 4,
        name: 'Danone'
      },
      {
        id: 5,
        name: 'Nestle'
      }
    ];
  }

  getCategories(): Array<Options> {
    return [{
      id: 1,
      name: 'Diversified'
    },
    {
      id: 2,
      name: 'Retail'
    },
    {
      id: 3,
      name: 'Restaurants'
    },
    {
      id: 4,
      name: 'Technology'
    },
    {
      id: 5,
      name: 'Beverages'
    }];
  }
}

export class ProductDataSource extends DataSource<any> {
  filterChange = new BehaviorSubject('');

  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }

  constructor(
    private products: Product[],
    private paginator: MatPaginator,
    private sort: MatSort) {
    super();
    this.filterChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  connect(): Observable<Product[]> {
    const displayDataChanges = [
      this.products,
      this.sort.sortChange,
      this.paginator.page,
      this.filterChange
    ];
    const result = Observable.merge(...displayDataChanges).map(() => {
      const filteredData = this.filterData();
      const sortedData = this.sortData(filteredData);
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return sortedData.splice(startIndex, this.paginator.pageSize);
    });
    return result;
  }

  filterData(): Product[] {
    return this.products.slice().filter((item: Product) => {
      const searchStr = (item.name + item.description).toLowerCase();
      return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
    });
  }

  sortData(data: Product[]): Product[] {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this.sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'description': [propertyA, propertyB] = [a.description, b.description]; break;
        case 'unitprice': [propertyA, propertyB] = [a.unitPrice, b.unitPrice]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this.sort.direction === 'asc' ? 1 : -1);
    });
  }

  disconnect() { }
}
