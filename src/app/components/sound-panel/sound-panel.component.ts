import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Sound {
  name: string;
  icon: SafeHtml;
  audio: HTMLAudioElement;
  volume: number;
}

@Component({
  selector: 'sound-panel',
  templateUrl: './sound-panel.component.html',
})
export class SoundPanelComponent {
  sounds: Sound[] = [];

  constructor(private sanitizer: DomSanitizer) {
    this.sounds = [
      {
        name: 'Rain',
        icon: this.sanitizeSvg(`
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 4v6a4 4 0 008 0V4m0 0h4a4 4 0 110 8h-4" />
          </svg>
        `),
        audio: new Audio('assets/audio/rain.mp3'),
         volume: 0.0,
      },
      {
        name: 'Wind',
        icon: this.sanitizeSvg(`
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 12h18M3 6h12M3 18h6" />
          </svg>
        `),
        audio: new Audio('assets/audio/wind.mp3'),
         volume: 0.0,
      },
      {
        name: 'Fire',
        icon: this.sanitizeSvg(`
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 3c1.667 2 2.5 4 2.5 6s-1 3-2.5 3-2.5-1-2.5-3 1-4 2.5-6z" />
          </svg>
        `),
        audio: new Audio('assets/audio/fire.mp3'),
         volume: 0.0,
      },      {
        name: 'Fire',
        icon: this.sanitizeSvg(`
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 3c1.667 2 2.5 4 2.5 6s-1 3-2.5 3-2.5-1-2.5-3 1-4 2.5-6z" />
          </svg>
        `),
        audio: new Audio('assets/audio/fire.mp3'),
         volume: 0.0,
      },      {
        name: 'Fire',
        icon: this.sanitizeSvg(`
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 3c1.667 2 2.5 4 2.5 6s-1 3-2.5 3-2.5-1-2.5-3 1-4 2.5-6z" />
          </svg>
        `),
        audio: new Audio('assets/audio/fire.mp3'),
         volume: 0.0,
      },
    ];

    // Iniciar configuración de audio
    this.sounds.forEach(sound => {
      sound.audio.loop = true;
      sound.audio.volume = sound.volume;
      sound.audio.play();
    });
  }

  sanitizeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

updateVolume(sound: Sound, value: number) {
  sound.volume = value;
  sound.audio.volume = value;
}onVolumeChange(event: Event, sound: Sound) {
  const input = event.target as HTMLInputElement;
  const volume = input.valueAsNumber;
  this.updateVolume(sound, volume);
}


}
