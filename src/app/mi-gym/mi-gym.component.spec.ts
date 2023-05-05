import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiGymComponent } from './mi-gym.component';

describe('MiGymComponent', () => {
  let component: MiGymComponent;
  let fixture: ComponentFixture<MiGymComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiGymComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiGymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
