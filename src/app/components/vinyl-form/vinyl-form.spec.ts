import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinylForm } from './vinyl-form';

describe('VinylForm', () => {
  let component: VinylForm;
  let fixture: ComponentFixture<VinylForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VinylForm],
    }).compileComponents();

    fixture = TestBed.createComponent(VinylForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
