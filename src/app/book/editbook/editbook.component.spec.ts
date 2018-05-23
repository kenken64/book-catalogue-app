import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbookComponent } from './editbook.component';

describe('EditbookComponent', () => {
  let component: EditbookComponent;
  let fixture: ComponentFixture<EditbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
