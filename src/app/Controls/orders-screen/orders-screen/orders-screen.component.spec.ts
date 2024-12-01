import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersScreenComponent } from './orders-screen.component';

describe('OrdersScreenComponent', () => {
  let component: OrdersScreenComponent;
  let fixture: ComponentFixture<OrdersScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
