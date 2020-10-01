import {Component, ElementRef, OnInit} from '@angular/core';
import {HttpService} from '../shared/services/http.service';
import {Product} from '../shared/models/produc.interface';
import {StarRatingComponent} from 'ng-starrating';
import {Observable} from 'rxjs';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})


export class MainPageComponent implements OnInit {
  products: Product[];
  logOut = true;
  filter: string;
  currentPage = 1;
  pageSizem = 8;
  totaltItems: number;
  pageNumber: number;
  isActive = false;
  isPromo = false;

  constructor(public httpSer: HttpService, public auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.httpSer.getAll()
      .pipe(
        tap(v => {
          this.totaltItems = v.totalItems;
        })
      )
      .subscribe(v => this.products = v.items);
  }

  logOutfromApp(): void {
    this.router.navigate(['/login']);
    this.auth.auth = false;
  }

  logOuttoApp(): void {
    this.router.navigate(['/login']);
  }

  handlePageChange(event: number): void {
    this.currentPage = event;
    this.httpSer.getByParams(this.currentPage, this.filter, this.isActive, this.isPromo)
      .subscribe(v => this.products = v.items);
    window.scrollTo(0, 0);
  }

  getByParams(): void {
    if (this.isActive === false && this.isPromo === true){
      this.httpSer.getByParams(this.currentPage, this.filter, null, true)
        .pipe(
          tap(v => this.totaltItems = v.totalItems)
        )
        .subscribe(v => this.products = v.items);
    } else if (this.isActive === true && this.isPromo === false){
      this.httpSer.getByParams(this.currentPage, this.filter, true, null)
        .pipe(
          tap(v => this.totaltItems = v.totalItems)
        )
        .subscribe(v => this.products = v.items);
    }
    this.httpSer.getByParams(this.currentPage, this.filter, this.isActive, this.isPromo)
      .pipe(
        tap(v => this.totaltItems = v.totalItems)
      )
      .subscribe(v => this.products = v.items);
  }

  onInputChange(): void {
    this.httpSer.getByParams(this.currentPage, this.filter, this.isActive, this.isPromo)
      .pipe(
        tap(v => {
          this.totaltItems = v.totalItems;
          console.log(v.items);
          console.log(this.filter);
        })
      )
      .subscribe(v => this.products = v.items);
  }
}
