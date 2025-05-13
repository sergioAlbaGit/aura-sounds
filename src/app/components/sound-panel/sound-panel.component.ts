import { Component, OnInit, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SoundService, Sound } from '../../services/sound.service'; // <-- Importamos Sound

@Component({
  selector: 'sound-panel',
  templateUrl: './sound-panel.component.html',
})
export class SoundPanelComponent implements OnInit {
  sounds: Sound[] = [];
  volumeTouched = signal(false);

  constructor(
    private sanitizer: DomSanitizer,
    private soundService: SoundService
  ) {
    const initialSounds: Sound[] = [
      {
        name: 'Tormenta',
        icon: 'assets/icons/svg/tormenta.svg',
        audioSrc: 'assets/sounds/tormenta.mp3',
        volume: 0.0,
        initialized: false,
      },
      {
        name: 'Lluvia',
        icon: 'assets/icons/svg/nube-lluvia.svg',
        audioSrc: 'assets/sounds/lluvia.mp3',
        volume: 0.0,
        initialized: false,
      },
      {
        name: 'Crickets',
        icon: 'assets/icons/svg/cesped.svg',
        audioSrc: 'assets/sounds/cricket.mp3',
        volume: 0.0,
        initialized: false,
      },
      {
        name: 'Pájaros',
        icon: 'assets/icons/svg/pajaro.svg',
        audioSrc: 'assets/sounds/birds.mp3',
        volume: 0.0,
        initialized: false,
      },
    ];

    this.soundService.setSounds(initialSounds);
    this.sounds = this.soundService.getSounds();
  }

  ngOnInit(): void {}

  sanitizeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  updateVolume(sound: Sound, value: number) {

    this.soundService['initializeSound'](sound); // Llama a la inicialización desde el servicio
    sound.volume = value;
    if (sound.audio) {
      sound.audio.volume = value;

      if (value > 0 && sound.audio.paused) {
        sound.audio.play().catch(err =>
          console.warn(`No se pudo reproducir ${sound.name}:`, err)
        );
      }

      if (value === 0) {
        sound.audio.pause();
      }
    }
  }

  onVolumeChange(event: Event, sound: Sound) {
    this.volumeTouched.set(true);
    const input = event.target as HTMLInputElement;
    const volume = input.valueAsNumber;
    this.updateVolume(sound, volume);
  }

  onSoundClick(index: number): void {
    const sound = this.sounds[index];
    const input = document.querySelectorAll('input[type="range"]')[index] as HTMLInputElement;
    let volume = input.valueAsNumber >= 1 ? 0 : input.valueAsNumber + 0.1;
    this.updateVolume(sound, volume);
  }
}
