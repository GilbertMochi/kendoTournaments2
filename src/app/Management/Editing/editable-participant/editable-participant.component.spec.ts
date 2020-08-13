import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableParticipantComponent } from './editable-participant.component';

describe('EditableParticipantComponent', () => {
  let component: EditableParticipantComponent;
  let fixture: ComponentFixture<EditableParticipantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableParticipantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
