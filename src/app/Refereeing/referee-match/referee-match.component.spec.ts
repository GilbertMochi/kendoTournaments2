import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefereeMatchComponent } from './referee-match.component';

describe('RefereeMatchComponent', () => {
  let component: RefereeMatchComponent;
  let fixture: ComponentFixture<RefereeMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefereeMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefereeMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
