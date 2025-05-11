import {  Component } from '@angular/core';
import { SoundPanelComponent } from "../../components/sound-panel/sound-panel.component";

@Component({
  selector: 'app-home-page',
  imports: [SoundPanelComponent],
  templateUrl: './home-page.component.html'
})
export default class HomePageComponent { }
