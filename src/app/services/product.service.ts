import { HttpClient } from '@angular/common/http';
import { Product } from './../models/product';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { API_PRODUCT, API_PRODUCTS } from '../helpers/constants';

@Injectable()
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(API_PRODUCTS);
  }

  getById(id: string) {
    return this.httpClient.get<Product>(`${API_PRODUCT}${id}`);
  }

  create(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(API_PRODUCT, product);
  }

  update(product: Product): Observable<Product>  {
    return this.httpClient.put<Product>(`${API_PRODUCT}${product.id}`, product);
  }

  delete(id: string): Observable<Product>  {
    return this.httpClient.delete<Product>(`${API_PRODUCT}${id}`);
  }
}
