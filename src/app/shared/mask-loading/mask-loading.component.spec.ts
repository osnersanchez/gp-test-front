import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaskLoadingComponent } from './mask-loading.component';

describe('MaskLoadingComponent', () => {
  let component: MaskLoadingComponent;
  let fixture: ComponentFixture<MaskLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaskLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaskLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
