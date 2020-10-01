import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {Product} from '../models/produc.interface';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})


export class HttpService {
  chosenProduct: Product;
  constructor(private http: HttpClient) {
  }
  // @ts-ignore
  getByParams(pageNum: number, name?: string, isActive: boolean, isPromo: boolean): Observable<any> {
    let params = new HttpParams();
    params = params.append('limit', '8');
    params = params.append('page', `${pageNum}`);
    if (isActive !== false) {
      params = params.append('active', `${isActive}`);
    }
    if (isPromo !== false) {
      params = params.append('promo', `${isPromo}`);
    }
    if (name !== undefined){
      params = params.append('search', `${name.toLowerCase()}`);
    }
    return this.http.get(`${environment.apiUrl}`, {
      params
    });
  }

  getAll(): Observable<any> {
    return this.http.get(`${environment.apiUrl}?limit=8`);
  }

  // tslint:disable-next-line:typedef
  getItemById(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${id}`);
  }


}
