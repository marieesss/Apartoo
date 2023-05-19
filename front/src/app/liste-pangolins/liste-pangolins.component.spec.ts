import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePangolinsComponent } from './liste-pangolins.component';

describe('ListePangolinsComponent', () => {
  let component: ListePangolinsComponent;
  let fixture: ComponentFixture<ListePangolinsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListePangolinsComponent]
    });
    fixture = TestBed.createComponent(ListePangolinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
