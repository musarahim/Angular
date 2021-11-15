import {Component, OnInit} from "@angular/core"
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector:'pm-products',
    templateUrl:'./product-list.component.html',
    styleUrls:['./product-list.component.css']

})
export class ProductListComponent implements OnInit{
    pageTitle:string="Product List";
    imageWidth:number=50;
    imageMargin:number=2;
    showImage:boolean=false;
    private _listFilter:string='';
    get listFilter():string{
      return this._listFilter;
    }
    set listFilter(value:string){
      this._listFilter=value;
      this.filteredProducts=this.performFilter(value);
    }
    constructor(private productService:ProductService){

    }
    filteredProducts :IProduct[]=[]
    products :IProduct[]=[];
        
        performFilter(filterby:string):IProduct[]{
              filterby = filterby.toLowerCase();
              return this.products.filter((product:IProduct)=>
                product.productName.toLowerCase().includes(filterby)
              )
        }
        toggleImage():void{
          this.showImage= !this.showImage;
        }
        ngOnInit():void{
        this.products = this.productService.getProducts();
        this.filteredProducts= this.products
        }
        onRatingClicked(message:string):void{
          this.pageTitle='Product List '+ message;

        }
}
