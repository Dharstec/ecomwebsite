import { Injectable } from '@angular/core';
import { StaticValues } from 'src/app/static/staticValues';
import { DataSetService } from './data-set.service';
import { Observable } from 'rxjs';
import { FormService } from './form.service';


@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private constValues = StaticValues.values;
  currentUserData: any;
  cartData: any=[];
  WishlistData: any;
  constructor(
    private form :FormService,
    private datamod:DataSetService
  ) { }

  setCurrentUserData(userData:any){
    this.currentUserData = userData;
  }

  getCurrentUserData(){
    return this.currentUserData;
  }

  setCartData(data:any){
    this.cartData = data;
  }
  getCartData(){
    return this.cartData;
  }

  setWishlistData(data:any){
    this.WishlistData = data;
  }
  getWishlistData(){
    return this.WishlistData;
  }



  getStatic(target, key?: any) {
    return key ? this.constValues[target][key] : this.constValues[target];
}

  // get unique based on property
  unique(arr, keyProps) {
    const kvArray = arr.map(entry => {
    const key = keyProps.map(k => entry[k]).join('|');
    return [key, entry];
    });
    const map = new Map(kvArray);
    return Array.from(map.values());
}
// Form service
getForm(type, data?: any) {
  return this.form.getForm(type, data);
}
  // to set and get observable values
    setObservable(target, value) {
        this.datamod.setObservable(target, value);
    }

    getObservable(): Observable<any> {
        return this.datamod.getObservable();
    }

    // to set and get cache values
    getCache(target, reset?: any) {
        return this.datamod.getCache(target, reset);
    }
    setCache(target, value) {
        this.datamod.setCache(target, value);
    }
}
