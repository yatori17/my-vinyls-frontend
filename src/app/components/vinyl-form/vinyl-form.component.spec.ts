import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinylFormComponent } from './vinyl-form.component';

describe('VinylForm', () => {
  let component: VinylFormComponent;
  let fixture: ComponentFixture<VinylFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VinylFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VinylFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
