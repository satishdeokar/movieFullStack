import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantLinkComponent } from './important-link.component';

xdescribe('ImportantLinkComponent', () => {
  let component: ImportantLinkComponent;
  let fixture: ComponentFixture<ImportantLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
