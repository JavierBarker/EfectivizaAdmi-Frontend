import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansClientComponent } from './loans-client.component';

describe('LoansClientComponent', () => {
  let component: LoansClientComponent;
  let fixture: ComponentFixture<LoansClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoansClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoansClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
