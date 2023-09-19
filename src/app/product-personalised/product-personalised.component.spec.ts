import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPersonalisedComponent } from './product-personalised.component';

describe('ProductPersonalisedComponent', () => {
  let component: ProductPersonalisedComponent;
  let fixture: ComponentFixture<ProductPersonalisedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPersonalisedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPersonalisedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
