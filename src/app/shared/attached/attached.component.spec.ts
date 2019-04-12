import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachedComponent } from './attached.component';

describe('AttachedComponent', () => {
  let component: AttachedComponent;
  let fixture: ComponentFixture<AttachedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
