import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscribersComponent } from './suscribers.component';

describe('SuscribersComponent', () => {
  let component: SuscribersComponent;
  let fixture: ComponentFixture<SuscribersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuscribersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuscribersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
