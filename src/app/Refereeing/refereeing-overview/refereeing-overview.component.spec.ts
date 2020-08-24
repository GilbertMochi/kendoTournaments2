import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefereeingOverviewComponent } from './refereeing-overview.component';

describe('RefereeingOverviewComponent', () => {
  let component: RefereeingOverviewComponent;
  let fixture: ComponentFixture<RefereeingOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefereeingOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefereeingOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
