import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiceProductosComponent } from './indice-productos.component';

describe('IndiceProductosComponent', () => {
  let component: IndiceProductosComponent;
  let fixture: ComponentFixture<IndiceProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndiceProductosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndiceProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
