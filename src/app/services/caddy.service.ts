import { Injectable } from '@angular/core';
import { Caddy } from '../model/caddy.model';
import { Product } from '../model/product.model';
import { ProductItem } from '../model/product-item.model';

@Injectable({
  providedIn: 'root'
})
export class CaddyService {

  currentCaddyName:string="Caddy1";
  public caddies:Map<string,Caddy> =new Map();

  constructor() { 
    let caddy=new Caddy(this.currentCaddyName);
    this.caddies.set(this.currentCaddyName,caddy);
  }

  public addProductToCaddy(product:Product){
    let caddy=this.caddies.get(this.currentCaddyName);
    let productItem:ProductItem=caddy.items.get(product.id);
    if(productItem){
      productItem.quantity+=product.quantity;
    }else {
      productItem=new ProductItem();
      productItem.quantity=product.quantity;
      productItem.price=product.currentprice;
      productItem.product=product;
      caddy.items.set(product.id,productItem);
      this.saveCaddies();
    }
    
  }

  public removeProduct(id:number):void{
    let caddy=this.caddies[this.currentCaddyName];
    
   delete caddy.items[id];
   
   this.saveCaddies();
  }

  getCurrentCaddy():Caddy{
    return this.caddies.get(this.currentCaddyName);
  }


   getTotalCurrentCaddy(){
    let caddy=this.caddies[this.currentCaddyName];
    let total=0;
    for(let key in caddy.items ){
      total+=caddy.items[key].price*caddy.items[key].quantity;
    }
    return total;

    
  }

  public saveCaddies(){
    localStorage.setItem('myCaddies',JSON.stringify(this.caddies));
  }
}
