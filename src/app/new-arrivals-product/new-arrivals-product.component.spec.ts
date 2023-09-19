import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewArrivalsProductComponent } from './new-arrivals-product.component';

describe('NewArrivalsProductComponent', () => {
  let component: NewArrivalsProductComponent;
  let fixture: ComponentFixture<NewArrivalsProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewArrivalsProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewArrivalsProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
