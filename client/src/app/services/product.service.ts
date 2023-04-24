import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
}

export enum PRODUCT_ACTION {
  EDIT = 'edit',
  DELETE = 'delete',
}

const apiUrl = `${process.env['SERVER_URL']}/api/products`;

const getProducts = (http: HttpClient) => (): Observable<Product[]> => {
  return http.get<Product[]>(apiUrl);
};

const getProduct =
  (http: HttpClient) =>
  (id: string): Observable<Product> => {
    return http.get<Product>(`${apiUrl}/${id}`);
  };

const createProduct =
  (http: HttpClient) =>
  (product: Partial<Product>): Observable<Product> => {
    return http.post<Product>(apiUrl, product);
  };

const updateProduct =
  (http: HttpClient) =>
  (id: string, product: Partial<Product>): Observable<Product> => {
    return http.put<Product>(`${apiUrl}/${id}`, product);
  };

const deleteProduct =
  (http: HttpClient) =>
  (id: string): Observable<void> => {
    return http.delete<void>(`${apiUrl}/${id}`);
  };

export const productServiceFactory = (http: HttpClient) => {
  return {
    getProducts: getProducts(http),
    getProduct: getProduct(http),
    createProduct: createProduct(http),
    updateProduct: updateProduct(http),
    deleteProduct: deleteProduct(http),
  };
};

export const ProductService = {
  provide: 'ProductService',
  useFactory: productServiceFactory,
  deps: [HttpClient],
};
