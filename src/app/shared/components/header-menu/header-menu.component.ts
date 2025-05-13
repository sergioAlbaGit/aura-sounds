import {  Component, signal } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { SoundService } from '../../../services/sound.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'header-menu',
  imports: [FormsModule],
  templateUrl: './header-menu.component.html'
})
export class HeaderMenuComponent {

  currentTimerId: any;
  iconList: SafeHtml[];
  timeTimer = signal(5);

  constructor(private sanitizer: DomSanitizer, private soundService: SoundService) {
    this.iconList = [
      this.sanitizeSvg(`

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 24 24"  class="h-4 w-4 sm:h-8 sm:w-8 md:h-8 md:w-8 lg:h-10 lg:w-10" style="enable-background:new 0 0 24 24;" xml:space="preserve">
 <path fill="gray" d="M24,4c0-1.7-1.3-3-3-3H11C9.3,1,8,2.3,8,4v2.6L1.5,0L0,1.5L22.5,24l1.4-1.4l-1.2-1.2c0.8-0.9,1.3-2.1,1.3-3.3  c0-0.2,0-0.3-0.1-0.5H24C24,17.5,24,4,24,4z M22,14c-0.8-0.6-1.9-1-3-1c-1.2,0-2.4,0.5-3.3,1.3L10,8.6V4c0-0.6,0.4-1,1-1h10  c0.6,0,1,0.4,1,1C22,4,22,14,22,14z M8,14c-0.8-0.6-1.9-1-3-1c-2.8,0-5,2.2-5,5s2.2,5,5,5s5-2.2,5-5v-3.8l-2-2V14L8,14z"/>
</svg>

        `),
      this.sanitizeSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" class="h-4 w-4 sm:h-8 sm:w-8 md:h-8 md:w-8 lg:h-10 lg:w-10"> <path fill="gray" d="M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z"/></svg>
         `),

      this.sanitizeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24" class="h-4 w-4 sm:h-8 sm:w-8 md:h-8 md:w-8 lg:h-10 lg:w-10"> <path fill="gray" d="M7,0A4,4,0,0,0,3,4V20a4,4,0,0,0,8,0V4A4,4,0,0,0,7,0ZM8,20a1,1,0,0,1-2,0V4A1,1,0,0,1,8,4Z"/> <path fill="gray" d="M17,0a4,4,0,0,0-4,4V20a4,4,0,0,0,8,0V4A4,4,0,0,0,17,0Zm1,20a1,1,0,0,1-2,0V4a1,1,0,0,1,2,0Z"/></svg>

      `),
      this.sanitizeSvg(`<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" class="h-4 w-4 sm:h-8 sm:w-8 md:h-8 md:w-8 lg:h-10 lg:w-10" viewBox="0 0 24 24">
  <path fill="gray" d="M12.963,12.136v-2.133c0-.552-.447-1-1-1s-1,.448-1,1v2.133c-.562,.34-.938,.957-.938,1.661,0,1.069,.869,1.938,1.938,1.938s1.938-.87,1.938-1.938c0-.704-.376-1.321-.938-1.661Z"/>
  <path fill="gray" d="M20.002,7.422c.6,.556,1.22,.196,1.415,0,.391-.39,.391-1.023,0-1.414l-1.786-1.789c-.391-.392-1.024-.391-1.415,0-.391,.39-.391,1.023,0,1.414l.187,.187-.488,.489c-.933-.692-2.058-1.18-3.366-1.455,.134-.327,.208-.684,.208-1.058,0-1.542-1.254-2.796-2.795-2.796s-2.795,1.254-2.795,2.796c0,.37,.073,.723,.204,1.046-1.305,.263-2.423,.734-3.349,1.405l-.426-.427,.187-.187c.39-.391,.39-1.024,0-1.414-.391-.39-1.024-.391-1.415,0l-1.786,1.789c-.39,.391-.39,1.024,0,1.414,.195,.195,.789,.555,1.415,0l.185-.186,.405,.406c-1.16,1.508-1.823,3.562-1.823,6.137,0,5.774,3.288,9.187,9.203,9.221,5.904-.035,9.082-3.211,9.191-9.221-.044-2.517-.666-4.554-1.821-6.065l.477-.478,.185,.186ZM11.963,3c.438,0,.795,.357,.795,.796s-.356,.796-.795,.796-.795-.357-.795-.796,.356-.796,.795-.796Zm.006,18c-4.818-.028-7.108-2.317-7.203-7.204,.092-4.818,2.448-7.174,7.19-7.204,4.698,.031,7.122,2.46,7.204,7.186-.089,4.898-2.378,7.193-7.191,7.222Z"/>
</svg>
      `),

    ];

  }

  sanitizeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  notification = '';
showNotification(message: string) {
  this.notification = message;
  setTimeout(() => (this.notification = ''), 2000); // desaparece a los 2 segundos
}


onIconClick(index: number) {
  switch (index) {
    case 0:
      this.soundService.muteAll();
      this.showNotification('Sonidos silenciados');
      break;
    case 1:
      this.soundService.playAll();
      this.showNotification('Reproduciendo sonidos');
      break;
    case 2:
      this.soundService.stopAll();
      this.showNotification('Sonidos detenidos');
      break;
    case 3:
      this.timer(this.timeTimer());
      this.showNotification('Temporizador iniciado de ' + this.timeTimer() + ' minutos');
      break;
  }
}

timer(time: number) {
  console.log('start timer', time);
  const timeoutId = setTimeout(() => {
    this.soundService.stopAll();
    console.log('stop all sounds');
  }, time * 1000 * 60);
  this.currentTimerId = timeoutId;
}


 }
