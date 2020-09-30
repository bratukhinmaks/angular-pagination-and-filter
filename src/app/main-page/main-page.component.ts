import {Component, OnInit} from '@angular/core';
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
  logOut = false;
  filter: string;
  currentPage = 1;
  pageNumber: number;
  isChekedActive = false;
  isChekedPromo = false;
  constructor(private httpSer: HttpService, public auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.httpSer.get(this.currentPage)
      .pipe(
        tap(v => this.pageNumber = v.pageCount)
      )
      .subscribe(v => this.products = v.items);
  }

  getDefault() {
    if(!this.isChekedActive && !this.isChekedPromo){
      this.httpSer.get(this.currentPage)
        .pipe(
          tap(v => this.pageNumber = v.pageCount)
        )
        .subscribe(v => this.products = v.items);
    } else if (this.isChekedPromo && !this.isChekedActive) {
      this.getPromo()
    } else {
      this.getActive()
    }

  }

  logOutfromApp(): void {
    this.router.navigate(['/login']);
    this.auth.auth = false;
  }

  logOuttoApp(): void {
    this.router.navigate(['/login']);
  }

  // tslint:disable-next-line:typedef
  getActive() {
    if (this.isChekedPromo){
      this.httpSer.getCheked()
        .pipe(
          tap(v => this.pageNumber = v.pageCount)
        )
        .subscribe(v => this.products = v.items);
    } else {
      this.httpSer.getActive()
        .pipe(
          tap(v => this.pageNumber = v.pageCount)
        )
        .subscribe(v => this.products = v.items);
    }
  }
  getPromo(): void {
    if (this.isChekedActive){
      this.httpSer.getCheked()
        .pipe(
          tap(v => this.pageNumber = v.pageCount)
        )
        .subscribe(v => this.products = v.items);
    } else {
      this.httpSer.getPromo()
        .pipe(
          tap(v => this.pageNumber = v.pageCount)
        )
        .subscribe(v => this.products = v.items);
    }
  }
}
