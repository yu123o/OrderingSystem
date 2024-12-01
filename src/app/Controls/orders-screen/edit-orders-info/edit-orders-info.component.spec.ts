import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrdersInfoComponent } from './edit-orders-info.component';

describe('EditOrdersInfoComponent', () => {
  let component: EditOrdersInfoComponent;
  let fixture: ComponentFixture<EditOrdersInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOrdersInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditOrdersInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
