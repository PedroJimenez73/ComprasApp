import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfrasComponent } from './editfras.component';

describe('EditfrasComponent', () => {
  let component: EditfrasComponent;
  let fixture: ComponentFixture<EditfrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditfrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditfrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
