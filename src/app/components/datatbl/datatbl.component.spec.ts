import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatblComponent } from './datatbl.component';

describe('DatatblComponent', () => {
  let component: DatatblComponent;
  let fixture: ComponentFixture<DatatblComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatatblComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatatblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
