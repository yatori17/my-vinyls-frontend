import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinylModal } from './vinyl-modal';

describe('VinylModal', () => {
  let component: VinylModal;
  let fixture: ComponentFixture<VinylModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VinylModal],
    }).compileComponents();

    fixture = TestBed.createComponent(VinylModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
