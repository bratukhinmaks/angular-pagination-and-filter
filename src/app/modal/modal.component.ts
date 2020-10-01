import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../shared/services/http.service';
import {Product} from '../shared/models/produc.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() product: Product;
  constructor(private http: HttpService) { }
  ngOnInit(): void {
  }

  close() {
    this.http.chosenProduct = null;
  }
}
