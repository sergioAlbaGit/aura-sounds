// sound.service.ts
import { Injectable } from '@angular/core';

export interface Sound {
  name: string;
  icon: string;
  audioSrc: string;
  volume: number;
  audio?: HTMLAudioElement;
  initialized?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private sounds: Sound[] = [];

  setSounds(sounds: Sound[]) {
    this.sounds = sounds;
  }

  getSounds(): Sound[] {
    return this.sounds;
  }

initializeSound(sound: Sound): void {
  if (sound.initialized) return;
  console.log('Inizialiado', sound.name);
  const audio = new Audio(sound.audioSrc);
  audio.loop = true;
  audio.volume = sound.volume;
  sound.audio = audio;
  sound.initialized = true;
}


  muteAll() {
    this.sounds.forEach(sound => {
      this.initializeSound(sound);
      sound.volume = 0;
      if (sound.audio) {
        sound.audio.volume = 0;
      }
    });
  }

  playAll() {
    this.sounds.forEach(sound => {
      this.initializeSound(sound);
      if (sound.audio) {
        sound.audio.play().catch(err =>
          console.warn(`No se pudo reproducir ${sound.name}:`, err)
        );
      }
    });
  }

stopAll() {
  this.sounds.forEach(sound => {
    if (sound.audio) {
      try {
        sound.audio.pause();
        sound.audio.src = '';
        sound.audio = undefined;
        sound.initialized = false;

  console.log('no Inizialiado', sound.name);
      } catch (err) {
        console.warn(`No se pudo pausar ${sound.name}:`, err);
      }
    }
  });
}

}
