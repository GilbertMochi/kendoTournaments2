import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditablePoolComponent } from './editable-pool.component';

describe('EditablePoolComponent', () => {
  let component: EditablePoolComponent;
  let fixture: ComponentFixture<EditablePoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditablePoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditablePoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
