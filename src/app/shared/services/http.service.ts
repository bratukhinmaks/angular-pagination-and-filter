import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {Product} from '../models/produc.interface';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})



export class HttpService {
  constructor(private http: HttpClient) {}


  // @ts-ignore
  get(pageNum: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('limit', '8');
    params = params.append('page', `${pageNum}`);
    return this.http.get(`${environment.apiUrl}`,{
      params
    });

  }
  // tslint:disable-next-line:typedef
  getItemById(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${id}`);
  }

  getActive(): Observable<any> {
    return this.http.get(`${environment.apiUrl}?active=true&limit=8`);
  }

  getPromo(): Observable<any> {
    return this.http.get(`${environment.apiUrl}?promo=true&limit=8`);
  }
  getCheked(): Observable<any> {
    return this.http.get(`${environment.apiUrl}?promo=true&active=true&limit=8`);
  }

}
