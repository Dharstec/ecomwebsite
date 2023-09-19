import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { UtilService } from '../services/util.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  currentUserData: any;
  cartListData: any;
  productCount:any=1
  totalAmt: number;
  productPolicies=[
    {Name:'Lifetime Plating Service',img:'assets/policy/1.svg'},
    {Name:'6 Month Warranty',img:'assets/policy/2.svg'},
    {Name:'30 Day Easy Returns',img:'assets/policy/3.svg'},
    {Name:'Free Shipping',img:'assets/policy/4.svg'}
  ]
  cartForm: any;


  constructor(private api:ApiService,private router:Router,private util:UtilService, private fb:UntypedFormBuilder,private snackBar:MatSnackBar) { 
    window.scrollTo(0, 0);
  }

  async ngOnInit(): Promise<void> {
    this.cartForm = this.fb.group({
      quantityArray: this.fb.array([this.addQuantityFormArray('')]),
    })
    let userData = this.util.getObservable().subscribe((res) => {
      if(res.currentUserData && res.currentUserData.data){
        this.currentUserData = res.currentUserData.data
        // this.wishList=this.currentUserData.wishlistProductIdDetails ? this.currentUserData.wishlistProductIdDetails.length : []
        this.cartListData=res.addCartlistCount //this.currentUserData.cartProductDetails ? this.currentUserData.cartProductDetails : []
      }else{
        // this.wishList=res.addWishlistCount || []
        this.cartListData=res.addCartlistCount || []
        // if(localStorage.getItem('addToCartList')) this.cartListData=localStorage.getItem('addToCartList')
      } 
    });
    this.cartListData.forEach(e=>{
      this.cartList.push(this.addQuantityFormArray(e))
    })
    this.cartList.controls.splice(0, 1);
    this.setTotalPrice()
  }
  get cartList() {
    return this.cartForm.get('quantityArray') as UntypedFormArray;
  }
  addQuantityFormArray(data){
    let tempForm = this.fb.group({
      data :[data ? data.data : null],
      value :[data ? data.quantity : null],
      giftWrap:[data ? data.data.gift : false],
    })
    return tempForm;
  }
  
  itemPlus(row){
    let val=row.get('value').value
    let data=row.get('data').value
    val == data.stock ?  val = val : val +=1 
    this.setQuantity(val,data,'click')
  }
  itemMinus(row){
    let val=row.get('value').value
    let data=row.get('data').value
    val <= 1 ?   val = 1 : val -=1
    this.setQuantity(val,data,'click')
  }
  // updateCartList(row){
  //   this.cartListData.map(e=>{
  //     if(e.productId==data.productId){
  //       e['quantity']=val
  //     }
  //   })
  // }
  setQuantity(event,data,type?:any){
    let val= type =='click' ?    event  : event.target.value
    this.cartListData.map((e,i)=>{
      if(e._id==data._id){
        this.cartList.at(i).get('value').setValue(val)  //push(this.addQuantityFormArray(e))
        e['quantity']=Number(val)
      }
    })
    console.log('',this.cartListData)
    this.setTotalPrice()
  }
  setTotalPrice(){
    let val=0
    console.log('sfsa',this.cartListData)
    this.cartListData.forEach(e=>{
      val = val + (e.quantity*e.data.discountPrice) 
      if(e.data.gift){
        val+=50
      }
    })
    this.totalAmt=val
  }
  setGiftWrap(event,tanch){
    let check= event.target.checked
    let data=tanch.get('data').value
    if(!check) this.totalAmt-=50
    this.cartListData.map((e,i)=>{
      if(e._id==data._id){
        this.cartList.at(i).get('giftWrap').setValue(check) 
        e.data['gift']=check
      }
    })
    console.log('set gift', this.cartList)

    //add value
    this.cartList.value.forEach(e=>{
      this.totalAmt += e.giftWrap==true ? 50 : 0
    })
  }

  removeAddCart(list){
    let index=this.cartListData.findIndex(e=>e.productId==list.get('data').value._id)
    this.cartListData.splice(index,1)
    this.cartList.controls.splice(index, 1);
    this.util.setObservable('addCartlistCount',this.cartListData)
    this.updateCustomer()
    this.setTotalPrice()
  }
  routeToNext(){
    this.router.navigate(['/jewel/customer-address'])
  }
  updateCustomer(){
    console.log(this.currentUserData)
    let body;
    let temp=_.cloneDeep(this.currentUserData.cartProductDetails)
      temp.map(e=>{
        delete e.data
      })
      body={
        // "_id": this.currentUserData.data._id,
        "email": this.currentUserData.email,
        "cartProductDetails": temp,
       }
   
    return this.api.putCall('Customer/updateCustomer',body).subscribe(async data=>{
      let snackBarRef = this.snackBar.open('Product removed successfully','Close',{
        duration:3000
      });
      console.log(data)
    },err=>{
      console.log('error in update in customer data',err)
    })
  }

}
