import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoInsumoComponent } from './producto-insumo.component';

describe('ProductoInsumoComponent', () => {
  let component: ProductoInsumoComponent;
  let fixture: ComponentFixture<ProductoInsumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoInsumoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoInsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
