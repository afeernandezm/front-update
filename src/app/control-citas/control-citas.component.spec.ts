import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlCitasComponent } from './control-citas.component';

describe('ControlCitasComponent', () => {
  let component: ControlCitasComponent;
  let fixture: ComponentFixture<ControlCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlCitasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
