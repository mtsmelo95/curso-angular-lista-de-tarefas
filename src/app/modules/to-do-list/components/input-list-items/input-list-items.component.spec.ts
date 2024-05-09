import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputListItemsComponent } from './input-list-items.component';

describe('InputListItemsComponent', () => {
  let component: InputListItemsComponent;
  let fixture: ComponentFixture<InputListItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputListItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
