import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchConfirmationDialogComponent } from './match-confirmation-dialog.component';

describe('MatchConfirmationDialogComponent', () => {
  let component: MatchConfirmationDialogComponent;
  let fixture: ComponentFixture<MatchConfirmationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchConfirmationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
