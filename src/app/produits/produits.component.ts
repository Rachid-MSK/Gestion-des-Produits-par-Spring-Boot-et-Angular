import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogueService } from '../services/catalogue.service';
@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  public produits;
  public currentPage: number = 0;
  public size: number = 5;
  public totalPages: number;
  public pages: Array<number>;
  private currentKeyword: string = '';


  constructor(private catService: CatalogueService, private router: Router) { }

  ngOnInit(): void {
  }

  onGetProducts(){
    this.catService.getProducts(this.currentPage, this.size)
    .subscribe(data => {
      this.produits = data;
      this.totalPages = data["page"].totalPages;
      this.pages = new Array<number>(this.totalPages);
    }, err => {
      console.log(err)
    })
  }
  onPageProduct(i){
    this.currentPage = i;
    this.chercherProduits();
  }

  onChercher(form){
    this.currentPage = 0;
    this.currentKeyword = form.keyword;
    this.chercherProduits();
  }

  chercherProduits(){
    this.catService.getProductsByKeyword(this.currentKeyword, this.currentPage, this.size)
    .subscribe(data => {
      this.produits = data;
      this.totalPages = data["page"].totalPages;
      this.pages = new Array<number>(this.totalPages);
    }, err => {
      console.log(err)
    })
  }

    onDeleteProduct(p){
      const conf = confirm("etes vous sur ?");
      if(conf)
      this.catService.deleteResource(p._links.self.href)
      .subscribe(data => {
        this.chercherProduits();
      }, err => {
        console.log(err);
      })
    }

    onEditProduct(p){
      let url = p._links.self.href;
      this.router.navigateByUrl('/edit-product/' + btoa(url));
    }

}
