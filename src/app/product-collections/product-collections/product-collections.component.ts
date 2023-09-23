import { Component, HostListener, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { Options } from '@angular-slider/ngx-slider';
import { UntypedFormBuilder, FormArray, UntypedFormGroup, Validators, AbstractControl } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';
import * as $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-product-collections',
  templateUrl: './product-collections.component.html',
  styleUrls: ['./product-collections.component.scss']
})
export class ProductCollectionsComponent implements OnInit {
  @ViewChild('stickyMenu') menuElement: ElementRef;
  productList: any = []
  categoryDropdownList: any;
  stoneDropdownList: any;
  colourDropdownList: any;
  styleDropdownList: any;
  forDropdownList: any;
  sortByDropdownList: any;
  // dropdownSettings:IDropdownSettings={};
  images: string[] = [
    'assets/1.png',
    'assets/2.png',
    'assets/3.png',
    'assets/product_up.png'
  ];
  minValue: number = 0;
  maxValue: number = 10000;
  slideOptions: Options = {
    floor: 0,
    ceil: 10000,
    step: 100,
    showTicks: true
  };
  currentIndex: number = 0;

  setMinValue: any;
  setMaxValue: any;
  filterForm: UntypedFormGroup;
  allProductList: any;
  filterSelected: boolean;
  selectedFilterList: any = [];
  sortByFilter: any
  sticky: boolean;
  elementPosition: any;
  prevId: any;
  pageType: any;
  filteredData: any;
  selectedCategory: any = [];
  selectedFor: any = [];
  selectedStone: any = [];
  selectedColour: any = [];
  selectedStyle: any = [];

  constructor(private util: UtilService, private api: ApiService, private router: Router, private activeRoute: ActivatedRoute, private fb: UntypedFormBuilder, private spinner: NgxSpinnerService) {
    window.scrollTo(0, 0);
  }
  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= (this.elementPosition - 140)) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }
  async ngOnInit(): Promise<void> {
    this.activeRoute.queryParams.subscribe(res => {
      console.log('ssssssss', res.type)
      this.pageType = res.type
    })
    this.spinner.show()
    this.filterForm = this.util.getForm('productFilter')
    this.sortByFilter = 'FEATURED'
    this.api.getCall('Product/getProduct').subscribe(async data => {
      console.log(data)
      this.productList = data
      this.productList = this.productList.data
      // hard code image
      // this.productList['productImages']=[data.productImage,data.productImage,data.productImage,data.productImage,data.productImage]
      this.allProductList = this.productList
      if (this.pageType == 'gift') {
        this.productList = this.productList.filter(e => e.gift)
        console.log('gift product', this.productList)
      } else if (this.pageType == 'personalised') {
        this.productList = this.productList.filter(e => e.personalised)
        console.log('Personalised product', this.productList)
      } else if (this.pageType == 'arrivals') {
        this.productList = this.productList.filter(e => e.latest)
        console.log('New arrived product', this.productList)
      }
      setTimeout(() => {
        this.spinner.hide();
      }, 2000);

      await this.getFilterDropDownData()
      // this.spinner.hide();
    })

    // let data=history.state.row
    // console.log(data)
    // this.api.getLoginData().subscribe(async data=>{
    //   console.log(data)
    // })
    setInterval(() => this.nextSlide(),1000); // Automatically advance slides every 3 seconds

  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
  ngAfterViewInit() {
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }

  routedfromNav() {

  }


  getFilterDropDownData() {
    this.categoryDropdownList = this.util.getStatic('categoryDropdown');
    this.stoneDropdownList = this.util.getStatic('stoneDropdown');
    this.colourDropdownList = this.util.getStatic('colourDropdown');
    this.styleDropdownList = this.util.getStatic('styleDropdown');
    this.forDropdownList = this.util.getStatic('forDropdown');
    this.sortByDropdownList = this.util.getStatic('sortByDropdown');
    //count category items
    this.categoryDropdownList.map((e: any) => {
      e.count = 0
      this.productList.map((x: any) => {
        x.category.map((l: any) => {
          if (e.item_text.toLowerCase() == l.toLowerCase()) {
            e.count += 1
          }
        })
      })
      e['field_name'] = `${e.item_text} (${e.count})`
    })
    // set range in price
    let data = this.productList.sort((x, y) => {
      let a = x.discountPrice
      let b = y.discountPrice
      return a - b
    })
    this.minValue = data[0].discountPrice;
    this.maxValue = data[data.length - 1].discountPrice
    this.setMinValue = this.minValue
    this.setMaxValue = this.maxValue
    this.slideOptions.floor = data[0].discountPrice;
    this.slideOptions.ceil = data[data.length - 1].discountPrice
    //count colour items
    this.stoneDropdownList.map((e: any) => {
      e.count = 0
      this.productList.map((x: any) => {
        x.stone.map((l: any) => {
          if (e.item_text.toLowerCase() == l.toLowerCase()) {
            e.count += 1
          }
        })
      })
      e['field_name'] = `${e.item_text} (${e.count})`
    })
    //count colour items
    this.colourDropdownList.map((e: any) => {
      e.count = 0
      this.productList.map((x: any) => {
        x.colour.map((l: any) => {
          if (e.item_text.toLowerCase() == l.toLowerCase()) {
            e.count += 1
          }
        })
      })
      e['field_name'] = `${e.item_text} (${e.count})`
    })
    //count style items
    this.styleDropdownList.map((e: any) => {
      e.count = 0
      this.productList.map((x: any) => {
        x.style.map((l: any) => {
          if (e.item_text.toLowerCase() == l.toLowerCase()) {
            e.count += 1
          }
        })
      })
      e['field_name'] = `${e.item_text} (${e.count})`
    })
    //count for items
    this.forDropdownList.map((e: any) => {
      e.count = 0
      this.productList.map((x: any) => {
        x.for.map((l: any) => {
          if (e.item_text.toLowerCase() == l.toLowerCase()) {
            e.count += 1
          }
        })
      })
      e['field_name'] = `${e.item_text} (${e.count})`
    })

    //  return this.dropdownSettings = {
    //   idField: 'item_id',
    //   textField: 'field_name',
    //   enableCheckAll: false,
    //   allowSearchFilter: true,
    //   itemsShowLimit: 1,
    // };
  }
  async getFilterData(event, data?: any, type?: any) {
    let checked = type != 'remove' ? event.target.checked : false
    data.checked = checked ? true : false
    let prevType;
    let temp = []
    if (type == 'remove' || !checked) {
      let index = this.selectedFilterList.findIndex(e => e.item_id == data.item_id)
      this.selectedFilterList.splice(index, 1)
    }

    // let list=[]
    this.selectedFilterList = !this.selectedFilterList.length ? [] : this.selectedFilterList
    if (checked) {
      switch (type) {
        case 'category': {
          this.selectedFilterList.push(data)
          this.selectedCategory.push(data.item_id)
          break;
        }
        case 'stone': {
          this.selectedFilterList.push(data)
          this.selectedStone.push(data.item_id)
          break;
        }
        case 'colour': {
          this.selectedFilterList.push(data)
          this.selectedColour.push(data.item_id)
          break;
        }
        case 'style': {
          this.selectedFilterList.push(data)
          this.selectedStyle.push(data.item_id)
          break;
        }
        case 'for': {
          this.selectedFilterList.push(data)
          this.selectedFor.push(data.item_id)
          break;
        }
      }
    } else {
      switch (type) {
        case 'category': {
          this.selectedCategory = this.selectedCategory.filter(e => e != data.item_id)
          break;
        }
        case 'stone': {
          this.selectedStone = this.selectedStone.filter(e => e != data.item_id)
          break;
        }
        case 'colour': {
          this.selectedColour = this.selectedColour.filter(e => e != data.item_id)
          break;
        }
        case 'style': {
          this.selectedStyle = this.selectedStyle.filter(e => e != data.item_id)
          break;
        }
        case 'for': {
          this.selectedFor = this.selectedFor.filter(e => e != data.item_id)
          break;
        }
        case 'remove': {
          this.selectedStyle = this.selectedStyle.filter(e => e != data.item_id)
          this.selectedColour = this.selectedColour.filter(e => e != data.item_id)
          this.selectedStone = this.selectedStone.filter(e => e != data.item_id)
          this.selectedCategory = this.selectedCategory.filter(e => e != data.item_id)
          this.selectedFor = this.selectedFor.filter(e => e != data.item_id)
          // this.selectedFilterList=[...this.selectedCategory,...this.selectedColour,... this.selectedStone,...this.selectedFor,...this.selectedStyle]
          break;
        }
      }
    }


    //   // this.productList=this.util.unique(temp,['_id'])
    // prevType=type
    this.checkdynamicData(checked)

  }

  checkdynamicData(checked) {
    // let formdata=this.filterForm.getRawValue()

    console.log('safsasf', this.selectedFilterList)
    if (this.selectedCategory.length || this.selectedColour.length || this.selectedStone.length || this.selectedStyle.length ||
      this.selectedFor.length) {
      this.filteredData = this.allProductList.filter(item => {
        // Check if the item's category is included in the selectedValue array
        if (this.selectedCategory.length && !this.selectedCategory.includes(item.category[0])) {
          return false;
        }

        // Check if the item's colour is included in the selectedColourValue array
        if (this.selectedColour?.length && !this.selectedColour.includes(item.colour[0])) {
          return false;
        }

        if (this.selectedFor?.length && !this.selectedFor.includes(item.for[0])) {
          return false;
        }

        if (this.selectedStone?.length && !this.selectedStone.includes(item.stone[0])) {
          return false;
        }

        if (this.selectedStyle?.length && !this.selectedStyle.includes(item.style[0])) {
          return false;
        }

        // If the item passed both filters, return true
        return true;
      });
      console.log('-------', this.filteredData, this.selectedFilterList)
      this.selectedFilterList = this.selectedFilterList
      this.productList = this.filteredData
    } else {
      this.filteredData = [];
      this.selectedFilterList = []
      this.productList = this.allProductList;
      console.log('sfsdf', this.allProductList)
    }
  }

  filterByPrice(event, type?: any) {
    let temp = []
    // if(this.productList.length){
    //   this.productList.forEach(e=>{
    //     if(event.value<=e.discountPrice && e.discountPrice<=event.highValue){
    //       temp.push(e)
    //     }
    //   })
    // }else{
    this.allProductList.forEach(e => {
      if (event.value <= e.discountPrice && e.discountPrice <= event.highValue) {
        temp.push(e)
      }
    })
    // }
    this.productList = temp

  }
  getSortByFilter(data, id) {
    this.sortByFilter = data?.field_name.toUpperCase()
    let temp = this.allProductList
    let sortByName, sortByPrice, sortByLatest, SortByDiscount
    $('#' + id).toggleClass('open').siblings().slideToggle(300);
    //SortByName
    if (data?.item_id == 'A-Z' || data?.item_id == 'Z-A') {
      sortByName = temp.sort((a, b) => {
        return a.productName < b.productName ? -1 : a.productName > b.productName ? 1 : 0
      })
    }
    //SortByPrice
    if (data?.item_id == 'low to high' || data?.item_id == 'high to low') {
      sortByPrice = temp.sort((a, b) => {
        return a.discountPrice - b.discountPrice
      })
    }
    //SortByNew
    if (data?.item_id == 'old to new' || data?.item_id == 'new to old') {
      sortByLatest = temp.sort((a, b) => {
        return a.createdAt - b.createdAt
      })
    }
    //SortByDiscount
    if (data?.item_id == '% Sale off') {
      SortByDiscount = temp.sort((a, b) => {
        let x = ((a.actualPrice - a.discountPrice) / a.actualPrice) * 100
        let y = ((b.actualPrice - b.discountPrice) / b.actualPrice) * 100
        return y - x
      })
    }
    switch (data?.item_id) {
      case 'Best Selling': return this.productList = this.allProductList
      case 'A-Z': return this.productList = sortByName
      case 'Z-A': return this.productList = sortByName.reverse()
      case 'low to high': return this.productList = sortByPrice
      case 'high to low': return this.productList = sortByPrice.reverse()
      case 'new to old': return this.productList = sortByLatest
      case 'old to new': return this.productList = sortByLatest.reverse()
      case '% Sale off': return this.productList = SortByDiscount
      case 'Featured': return this.productList = this.allProductList
    }
  }
  clearAllFilter() {
    this.categoryDropdownList.forEach(e => e.checked = false)
    this.styleDropdownList.forEach(e => e.checked = false)
    this.colourDropdownList.forEach(e => e.checked = false)
    this.stoneDropdownList.forEach(e => e.checked = false)
    this.forDropdownList.forEach(e => e.checked = false)
    this.selectedFilterList = []
    this.productList = this.allProductList
  }

  subMenuOpen(id) {
    let idList = [{ id: 'category' }, { id: 'stone' }, { id: 'price' }, { id: 'colour' }, { id: 'style' }, { id: 'for' }, { id: 'sortBy' }]
    $('#' + id).toggleClass('open').siblings().slideToggle(300);
    if (this.prevId != id) {
      $('#' + this.prevId).toggleClass('open').siblings().slideUp(300)
    }
    if (this.prevId == id) {
      // $('#' + id).toggleClass('open')
      $('#' + this.prevId).toggleClass('open')
    }
    this.prevId = id
  }

  changePrice(event, type) {
    type == 'min' ? this.minValue = this.filterForm.get('minValue').value : this.maxValue = this.filterForm.get('maxValue').value
  }

  routeToDetails(data?: any) {
    let productName = data.productName.replace(/\s/g, '-')
    let url = `/jewel/product-collections/details/${productName}`
    return this.router.navigate([url], { state: { data } })

    // return this.router.navigate([url],{queryParams:{productDetails:{...data}},  skipLocationChange: true})
  }


}
