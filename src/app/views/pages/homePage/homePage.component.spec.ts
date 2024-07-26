import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonModule, FormModule, GridModule, NavbarModule, HeaderModule, NavModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';


import { homePageComponent } from './homePage.component';

describe('homePageComponent', () => {
  let component: homePageComponent;
  let fixture: ComponentFixture<homePageComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderModule, NavbarModule, NavModule, FormModule, GridModule, ButtonModule, IconModule, homePageComponent],
    providers: []
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(homePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
