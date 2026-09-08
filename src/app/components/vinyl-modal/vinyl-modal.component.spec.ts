import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinylModalComponent } from './vinyl-modal.component';

describe('VinylModalComponent', () => {
  let component: VinylModalComponent;
  let fixture: ComponentFixture<VinylModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VinylModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VinylModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
