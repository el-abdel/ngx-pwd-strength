import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPwdStrengthComponent } from './ngx-pwd-strength.component';

describe('NgxPwdStrengthComponent', () => {
  let component: NgxPwdStrengthComponent;
  let fixture: ComponentFixture<NgxPwdStrengthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxPwdStrengthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxPwdStrengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
