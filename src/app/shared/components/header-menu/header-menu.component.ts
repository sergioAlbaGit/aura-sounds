import {  Component } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { SoundService } from '../../../services/sound.service';

@Component({
  selector: 'header-menu',
  imports: [],
  templateUrl: './header-menu.component.html'
})
export class HeaderMenuComponent {


  iconList: SafeHtml[];

  constructor(private sanitizer: DomSanitizer, private soundService: SoundService) {
    this.iconList = [
      this.sanitizeSvg(`

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 24 24"  class="h-8 w-8" style="enable-background:new 0 0 24 24;" xml:space="preserve">
 <path fill="gray" d="M24,4c0-1.7-1.3-3-3-3H11C9.3,1,8,2.3,8,4v2.6L1.5,0L0,1.5L22.5,24l1.4-1.4l-1.2-1.2c0.8-0.9,1.3-2.1,1.3-3.3  c0-0.2,0-0.3-0.1-0.5H24C24,17.5,24,4,24,4z M22,14c-0.8-0.6-1.9-1-3-1c-1.2,0-2.4,0.5-3.3,1.3L10,8.6V4c0-0.6,0.4-1,1-1h10  c0.6,0,1,0.4,1,1C22,4,22,14,22,14z M8,14c-0.8-0.6-1.9-1-3-1c-2.8,0-5,2.2-5,5s2.2,5,5,5s5-2.2,5-5v-3.8l-2-2V14L8,14z"/>
</svg>

        `),
      this.sanitizeSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" class="h-8 w-8"> <path fill="gray" d="M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z"/></svg>
         `),

      this.sanitizeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24" class="h-8 w-8"> <path fill="gray" d="M7,0A4,4,0,0,0,3,4V20a4,4,0,0,0,8,0V4A4,4,0,0,0,7,0ZM8,20a1,1,0,0,1-2,0V4A1,1,0,0,1,8,4Z"/> <path fill="gray" d="M17,0a4,4,0,0,0-4,4V20a4,4,0,0,0,8,0V4A4,4,0,0,0,17,0Zm1,20a1,1,0,0,1-2,0V4a1,1,0,0,1,2,0Z"/></svg>

      `)
    ];
  }

  sanitizeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }


onIconClick(index: number) {
  console.log('click muted')
  if (index === 1) {
    this.soundService.muteAll();
  }
}
  muteAllSounds() {
    this.soundService.muteAll();
  }

  playAllSounds(){
    this.soundService.playAll();
  }

  stopAllSounds(){
    this.soundService.stopAll();
  }

 }
