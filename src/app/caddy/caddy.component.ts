import { Component, OnInit } from '@angular/core';
import { CaddyService } from '../services/caddy.service';
import { Caddy } from '../model/caddy.model';
import {ProductItem} from '../model/product-item.model';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-caddy',
  templateUrl: './caddy.component.html',
  styleUrls: ['./caddy.component.css']
})
export class CaddyComponent implements OnInit {

  public caddy:Caddy;
  constructor( public caddyService:CaddyService) { }

  ngOnInit() {

   
  }

  getTotal() {
    return this.caddyService.getTotalCurrentCaddy();
}

onRemoveProductFromCaddy(p: ProductItem) {
  this.caddyService.removeProduct(p.product.id);
}

}
