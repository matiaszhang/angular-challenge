import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
}

const apiUrl = 'http://localhost:3000/api/products';

function getProducts(http: HttpClient): Observable<Product[]> {
  return http.get<Product[]>(apiUrl);
}

function getProduct(http: HttpClient, id: string): Observable<Product> {
  return http.get<Product>(`${apiUrl}/${id}`);
}

function createProduct(
  http: HttpClient,
  product: Partial<Product>
): Observable<Product> {
  return http.post<Product>(apiUrl, product);
}

function updateProduct(
  http: HttpClient,
  id: string,
  product: Partial<Product>
): Observable<Product> {
  return http.put<Product>(`${apiUrl}/${id}`, product);
}

function deleteProduct(http: HttpClient, id: string): Observable<void> {
  return http.delete<void>(`${apiUrl}/${id}`);
}

export const productService = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
