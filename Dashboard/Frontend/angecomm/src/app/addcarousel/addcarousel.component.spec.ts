import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcarouselComponent } from './addcarousel.component';

describe('AddcarouselComponent', () => {
  let component: AddcarouselComponent;
  let fixture: ComponentFixture<AddcarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddcarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddcarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
