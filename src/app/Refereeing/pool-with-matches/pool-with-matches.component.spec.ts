import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolWithMatchesComponent } from './pool-with-matches.component';

describe('PoolWithMatchesComponent', () => {
  let component: PoolWithMatchesComponent;
  let fixture: ComponentFixture<PoolWithMatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolWithMatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolWithMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
