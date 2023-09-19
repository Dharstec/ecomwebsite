import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { UtilService } from '../services/util.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-wishlist',
  templateUrl: './add-wishlist.component.html',
  styleUrls: ['./add-wishlist.component.scss']
})
export class AddWishlistComponent implements OnInit {
  currentUserData: any;
  wishListData: any;
  productCount:any=1
  totalAmt: number;
  productPolicies=[
    {Name:'Lifetime Plating Service',img:'assets/policy/1.svg'},
    {Name:'6 Month Warranty',img:'assets/policy/2.svg'},
    {Name:'30 Day Easy Returns',img:'assets/policy/3.svg'},
    {Name:'Free Shipping',img:'assets/policy/4.svg'}
  ]
  cartListData: any=[];

  constructor(private api:ApiService,private router:Router,private util:UtilService, private snackBar:MatSnackBar) { 
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    let userData = this.util.getObservable().subscribe((res) => {
      if(res.currentUserData && res.currentUserData.data){
        this.currentUserData = res.currentUserData.data
        this.wishListData=res.addWishlistCount //this.currentUserData.wishlistProductIdDetails ? this.currentUserData.wishlistProductIdDetails : []
        this.cartListData=res.addCartlistCount//this.currentUserData.cartProductDetails ? this.currentUserData.cartProductDetails : []
      }else{
        this.wishListData=res.addWishlistCount || []
        this.cartListData=res.addCartlistCount || []
        // if(localStorage.getItem('addToCartList')) this.cartListData=localStorage.getItem('addToCartList')
        
      } 
      console.log("Current user data",this.currentUserData)
      console.log("Wishlist product",this.wishListData)
    });
  }


  removeWishlist(list,type?:any){
    let index=this.wishListData.findIndex(e=>e.productId==list.productId)
    this.wishListData.splice(index,1)
    this.util.setObservable('addWishlistCount',this.wishListData)
    if(this.currentUserData){
      this.updateCustomer('removeWishlist') 
    }else {
      let snackBarRef = this.snackBar.open("Wishlist removed successfully",'Close',{
        duration:5000
      });
    }
  
  }

  addToCart(row){
    let productDetails=row.data
    if(this.currentUserData){
      // this.cartList=this.currentUserData.cartProductDetails || []
      if(this.cartListData.length){
        this.cartListData.forEach(e=>{
          if(e.productId==productDetails._id){
             e['quantity']+=1
          }else{
            this.cartListData.push({
              "data": productDetails,
              "productId":   productDetails._id,
              "quantity": 1,
              "_id":   productDetails._id
          })
          }
        })
      }else{
        this.cartListData.push({
          "data": productDetails,
          "productId":  productDetails._id,
          "quantity": 1,
          "_id":  productDetails._id
      })
      }
      this.cartListData=this.util.unique(this.cartListData,['productId'])
      this.currentUserData.cartProductDetails=this.cartListData
      this.cartListData.map(e=>e.productId==productDetails._id ? e['data']=productDetails : false)
      this.util.setObservable('addCartlistCount',this.cartListData)
      this.removeWishlist(row,'no')
      // this.util.setObservable('currentUserData',this.currentUserData)
    }else{
      if(this.cartListData.length){
        this.cartListData.forEach(e=>{
          if(e.productId==productDetails._id){
             e['quantity']+=1
          }else{
           return this.cartListData.push({
              "data":productDetails,
              "quantity": 1,
              "_id":  productDetails._id
          })
          }
        })
      }else{
        this.cartListData.push({
          "data": productDetails,
          "quantity": 1,
          "_id": productDetails._id
      })
      }
      console.log('sssas',this.cartListData)
      this.cartListData=this.util.unique(this.cartListData,['_id'])
      console.log(this.cartListData)
      this.removeWishlist(row,'no')
    }
    this.util.setObservable('addCartlistCount',this.cartListData)
    this.currentUserData && this.currentUserData.data ? this.updateCustomer('addToCart') :null
    this.router.navigate(['/jewel/cart'])
  }

  updateCustomer(type?:any){
    console.log(this.currentUserData)
    let temp=_.cloneDeep(this.currentUserData.cartProductDetails)
    temp.map(e=>{
      delete e.data
      delete e._id
    })
    let temp1=_.cloneDeep(this.currentUserData.wishlistProductIdDetails)
    temp1.map(e=>{
      delete e.data
    })
    let body={
      // "_id": this.currentUserData.data._id,
      "email": this.currentUserData.email,
      "cartProductDetails": temp,
      "wishlistProductIdDetails": temp1,
    }
    return this.api.putCall('Customer/updateCustomer',body).subscribe(async data=>{
      let snackBarRef = this.snackBar.open(type=='addToCart'?"Removed from cart successfully":'Wishlist removed successfully','Close',{
        duration:5000
      });
      console.log(data)
    },err=>{
      console.log('error in update in customer data',err)
    })
  }

}
