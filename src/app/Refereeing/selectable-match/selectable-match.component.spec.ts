import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectableMatchComponent } from './selectable-match.component';

describe('SelectableMatchComponent', () => {
  let component: SelectableMatchComponent;
  let fixture: ComponentFixture<SelectableMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectableMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectableMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
