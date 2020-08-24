import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentWithPoolsAndMatchesComponent } from './tournament-with-pools-and-matches.component';

describe('TournamentWithPoolsAndMatchesComponent', () => {
  let component: TournamentWithPoolsAndMatchesComponent;
  let fixture: ComponentFixture<TournamentWithPoolsAndMatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentWithPoolsAndMatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentWithPoolsAndMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
