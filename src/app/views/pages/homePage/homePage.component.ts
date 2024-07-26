import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { NavLinkDirective, NavbarTextComponent, NavbarNavComponent, CollapseDirective, NavbarTogglerDirective, HeaderNavComponent, NavComponent, NavItemComponent, NavbarComponent, ContainerComponent, RowComponent, ColComponent, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';

@Component({
    selector: 'app-home',
  templateUrl: './homePage.component.html',
  styleUrls: ['./homePage.component.scss'],
    standalone: true,
  imports: [NavLinkDirective, NavbarTextComponent, NavbarNavComponent, CollapseDirective, NavbarTogglerDirective, HeaderNavComponent,NavComponent, NavItemComponent, NavbarComponent, ContainerComponent, RowComponent, ColComponent, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective]
})
export class homePageComponent {

  constructor() { }

}
