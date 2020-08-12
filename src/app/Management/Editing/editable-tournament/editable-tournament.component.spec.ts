import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableTournamentComponent } from './editable-tournament.component';

describe('EditableTournamentComponent', () => {
  let component: EditableTournamentComponent;
  let fixture: ComponentFixture<EditableTournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableTournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
