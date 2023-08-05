import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenCarouselComponent } from './open-carousel.component';

describe('OpenCarouselComponent', () => {
  let component: OpenCarouselComponent;
  let fixture: ComponentFixture<OpenCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
