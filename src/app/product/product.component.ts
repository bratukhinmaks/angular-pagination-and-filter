import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../shared/models/produc.interface';
import {HttpService} from '../shared/services/http.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
 @Input() product: Product;
  constructor(private http:HttpService) { }

  ngOnInit(): void {
  }

  openCurrent(product: Product): void {
    this.http.chosenProduct = product;
    window.scrollTo(0, 0);
  }
}
