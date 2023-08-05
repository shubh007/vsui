import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenGalleryComponent } from './open-gallery.component';

describe('OpenGalleryComponent', () => {
  let component: OpenGalleryComponent;
  let fixture: ComponentFixture<OpenGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenGalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
