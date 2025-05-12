// sound.service.ts
import { Injectable } from '@angular/core';

interface Sound {
  name: string;
  icon: string;
  audio: HTMLAudioElement;
  volume: number;
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

  muteAll() {
    this.sounds.forEach(sound => {
      sound.volume = 0;
      sound.audio.volume = 0;
    });
  }

  playAll(){
        this.sounds.forEach(sound => {
        sound.audio.play().catch(err =>
          console.warn(`No se pudo reproducir ${sound.name}:`, err)
        );
      });
  }

  stopAll() {
    this.sounds.forEach(sound => {
      try {
        sound.audio.pause(); // ← No retorna Promesa
      } catch (err) {
        console.warn(`No se pudo pausar ${sound.name}:`, err);
      }
    });
  }

}
