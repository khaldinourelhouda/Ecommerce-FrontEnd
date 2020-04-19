import { Component, OnInit } from '@angular/core';
import { CatelogueService } from './catelogue.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { CaddyService } from './services/caddy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
private categories;
private currentCategories;
  constructor(private catService:CatelogueService,private router:Router,
    private authService:AuthenticationService,public caddyService:CaddyService){}

  ngOnInit(): void {
    this.authService.loadUserAuthenticatedUserFromLocalStorage();
   this.getCategorie();
  }
  
 private getCategorie(){
   this.catService.getresource("/categories").subscribe(data=>{
     this.categories=data;
   });

  }

  getProductsByCat(c){
    this.currentCategories=c;
    this.router.navigateByUrl('/products/2/'+c.id);
  }

  onSelectedProducts(){
    this.currentCategories=undefined;
    this.router.navigateByUrl("/products/1/0");
  }

  onProductsPromo(){
    this.currentCategories=undefined;
    this.router.navigateByUrl("/products/3/0");
  }

  onProductsDispo(){
    this.currentCategories=undefined;
    this.router.navigateByUrl("/products/4/0");
  }

  onLogout(){
    this.authService.removeTokenFromLocalStorage();
    this.router.navigateByUrl('/login');
  }
}
