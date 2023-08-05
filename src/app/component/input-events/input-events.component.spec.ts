import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputEventsComponent } from './input-events.component';

describe('InputEventsComponent', () => {
  let component: InputEventsComponent;
  let fixture: ComponentFixture<InputEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
