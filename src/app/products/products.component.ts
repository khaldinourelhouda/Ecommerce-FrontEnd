import { Component, OnInit } from '@angular/core';
import { CatelogueService } from '../catelogue.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Product } from '../model/product.model';
import { CaddyService } from '../services/caddy.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 products ;
  private editPhoto :boolean;
  currentProduct: any;
  selectedFiles ;
  progress: number;
   currentFileUpload: any;
   title:string;
   currentRequest:string;
  private currentTime: number=0;
  timesstamp:number=0;
  constructor(private catService:CatelogueService,private route:ActivatedRoute,private router:Router,
    public authService:AuthenticationService,public caddyService:CaddyService) {
    
  }

  ngOnInit() {
    this.router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
        let url=val.url;
        console.log(url);
        let p1=this.route.snapshot.params.p1;
    
        if(p1==1){
          this.title="Selection";
          this.getProducts('/products/search/selectedProducts');
        }
        else 
          if(p1==2){
            let idCat=this.route.snapshot.params.p2;
            this.title="Produits de la categorie "+idCat;
            this.getProducts('/categories/'+idCat+'/products');
          }
        
        else 
          if(p1==3){
            this.title="Produits en promotion";
            this.getProducts('/products/search/promoProducts');
          }
        
        else 
          if(p1==4){
            this.title="Produits disponible";
            this.getProducts('/products/search/dispoProducts');
          }
          else 
          if(p1==5){
            this.title="Produits recherche..";
            this.getProducts('/products/search/dispoProducts');
          }

      }
    });

    let p1=this.route.snapshot.params.p1;
    if(p1==1){
      this.currentRequest='/products/search/selectedProducts';
      this.getProducts(this.currentRequest);
    }
    
  }

   
 private getProducts(url){
  this.catService.getresource(url).subscribe(data=>{
    this.products=data;
  });

 }



 onEditPhoto(p){
   this.currentProduct=p;
   this.editPhoto=true;

 }

 /*onSelectedFile(event){
   this.selectedFiles=event.target.files;
 }

 uploadPhoto(){
  this.progress = 0;
  this.currentFileUpload = this.selectedFiles.item(0)
  this.catService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event => {
    if (event.type === HttpEventType.UploadProgress) {
      this.progress = Math.round(100 * event.loaded / event.total);
      console.log(this.progress);
    } else if (event instanceof HttpResponse) {
      //console.log(this.router.url);
      //this.getProducts(this.currentRequest);
      //this.refreshUpdatedProduct();
      //this.currentTime=Date.now();
      //this.getProducts('/products/search/selectedProducts');
      this.timesstamp=Date.now();

    }
  },err=>{
    alert("Problème de chargement");
  })



  this.selectedFiles = undefined
 }
*/
 getTS(){
   return this.timesstamp;
 }

 onProductDetails(p:Product){
   let url=btoa(p._links.product.href);
     this.router.navigateByUrl("products-detail/"+url);
 }

 onAddProductToCaddy(p:Product){
  this.caddyService.addProductToCaddy(p);
}
}
