import {  Component } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'header-menu',
  imports: [],
  templateUrl: './header-menu.component.html'
})
export class HeaderMenuComponent {
  iconList: SafeHtml[];

  constructor(private sanitizer: DomSanitizer) {
    this.iconList = [
      this.sanitizeSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      `),
      this.sanitizeSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 5l-5 5H2v4h2l5 5V5zm7.53 1.47L13.06 10m0 0l3.47 3.47M13.06 10L16.53 6.53M13.06 10L9.59 13.47" />
        </svg>
      `),
      this.sanitizeSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 12.79A9 9 0 1111.21 3a7 7 0 0010.08 9.79z" />
        </svg>
      `)
    ];
  }

  sanitizeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
 }
