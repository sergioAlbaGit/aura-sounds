import { Component, OnInit, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SoundService } from '../../services/sound.service';

interface Sound {
  name: string;
  icon: string; // era: SafeHtml
  audio: HTMLAudioElement;
  volume: number;
}


@Component({
  selector: 'sound-panel',
  templateUrl: './sound-panel.component.html',
})
export class SoundPanelComponent implements OnInit {
  sounds: Sound[] = [];

  constructor(private sanitizer: DomSanitizer, private soundService: SoundService) {
    this.sounds = [
  {
    name: 'Tormenta',
    icon: 'assets/icons/svg/tormenta.svg', // ruta directa
    audio: new Audio('assets/sounds/tormenta.mp3'),
    volume: 0.0,
  },
  {
    name: 'Lluvia',
    icon: 'assets/icons/svg/nube-lluvia.svg', // ruta directa
    audio: new Audio('assets/sounds/lluvia.mp3'),
    volume: 0.0,
  },
  {
    name: 'Crickets',
    icon: 'assets/icons/svg/cesped.svg', // ruta directa
    audio: new Audio('assets/sounds/cricket.mp3'),
    volume: 0.0,
  },
  {
    name: 'Pájaros',
    icon: 'assets/icons/svg/pajaro.svg', // ruta directa
    audio: new Audio('assets/sounds/birds.mp3'),
    volume: 0.0,
  },
];
    this.sounds.forEach(sound => {
      sound.audio.loop = true;
      sound.audio.volume = sound.volume;
    });

    this.soundService.setSounds(this.sounds);


  }

  ngOnInit(): void {

    // Espera una interacción del usuario
    document.addEventListener('click' , () => {
      this.sounds.forEach(sound => {
        sound.audio.play().catch(err =>
          console.warn(`No se pudo reproducir ${sound.name}:`, err)
        );
      });
    }, { once: true }); // Solo una vez
  }

  sanitizeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  updateVolume(sound: Sound, value: number) {
    sound.volume = value;
    sound.audio.volume = value;
  }

  volumeTouched = signal(false);
  onVolumeChange(event: Event, sound: Sound) {
    this.volumeTouched.set(true);
    const input = event.target as HTMLInputElement;
    const volume = input.valueAsNumber;
    this.updateVolume(sound, volume);
  }

  onSoundClick(index: number): void {
    const input = document.querySelectorAll('input[type="range"]')[index] as HTMLInputElement;
    let volume = input.valueAsNumber >= 1 ? 0 : input.valueAsNumber + 0.1;
    this.updateVolume(this.sounds[index], volume);
  }


}
