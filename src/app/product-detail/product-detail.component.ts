import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatelogueService } from '../catelogue.service';
import { Product } from '../model/product.model';
import { AuthenticationService } from '../services/authentication.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { CaddyService } from '../services/caddy.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public currentProduct :Product;
  product:Product[];
  private mode: number=0;
  private currentTime: number;
  selectedFiles;
  progress: number;
  currentFileUpload: any;
  private editPhoto: boolean;

  constructor(private router:Router,private route:ActivatedRoute,
    private catService:CatelogueService,public authService:AuthenticationService,public caddyService:CaddyService) { }

  ngOnInit() {
    let url =atob(this.route.snapshot.params.url);
    this.catService.getProduct(url).subscribe(product=>{
         this.currentProduct=product;
         console.log(this.currentProduct);

    });

  }
  onEditProduct() {
    this.mode=1;
  }
  getTS() {
    return this.currentTime;
  }

  onEditPhoto(p) {
    this.currentProduct=p;
    this.editPhoto=true;
  }

  onSelectedFile(event) {
    this.selectedFiles=event.target.files;
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        //console.log(this.router.url);
        //this.getProducts(this.currentRequest);
        //this.refreshUpdatedProduct();
        this.currentTime=Date.now();
        this.editPhoto=false;
      }
    },err=>{
      alert("Problème de chargement");
    })



    this.selectedFiles = undefined
  }

  
  onUpdateProduct(data) {
    let url=this.currentProduct._links.self.href;
    this.catService.patchResource(url,data)
      .subscribe(d=>{
        this.currentProduct=d;
        this.mode=0;
      },err=>{
        console.log(err);
      });
  }


  onAddProductToCaddy(currentProduct:Product){
    this.caddyService.addProductToCaddy(currentProduct);
  }

}
