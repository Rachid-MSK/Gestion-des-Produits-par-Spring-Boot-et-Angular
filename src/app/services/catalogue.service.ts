import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  host: string = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  public getProducts(page: number, size: number){
    return this.httpClient.get(this.host + "/produits?page="+page+"&size="+size);
  }

  public getProductsByKeyword(mc: string, page: number, size: number){
    return this.httpClient.get(this.host + "/produits/search/byDesignationPage?mc=" + mc + "&page=" + page + "&size=" + size);
  }

  public deleteResource(href){
    return this.httpClient.delete(href);
  }

  saveResource(url, data): Observable<Product>{
    return this.httpClient.post<Product>(url, data);
  }

  getResource(url): Observable<any>{
    return this.httpClient.get<Product>(url);
  }

  updateResource(url, data): Observable<Product>{
    return this.httpClient.put<Product>(url, data);
  }
}
