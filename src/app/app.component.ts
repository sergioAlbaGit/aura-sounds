import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import HomePageComponent from "./pages/home-page/home-page.component";
import { HeaderMenuComponent } from "./shared/components/header-menu/header-menu.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomePageComponent, HeaderMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'aura-sounds';
}
