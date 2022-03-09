import { Howl } from 'howler';
import * as _ from 'lodash';
import { LibraryService } from '../LibraryService';
import { TrackDetails } from '@/classes/Library/DTOs/queries/TrackDetails';
import { Timer } from './Timer';

class AudioManager extends EventTarget {
  private howler: Howl;
  private soundId: number;
  private currentTrack: TrackDetails;
  private shuffleOn: boolean;
  private stopped: boolean;
  private queue: TrackDetails[] = [];
  private currentQueueIndex: number;
  private playedDuration: Timer;
  private timerId: number;

  public onTrackPlayedCallback(callback: () => void): this {
    callback();
    return this;
  }

  public async play(): Promise<void> {
    try {
      if (this.howler) {
        console.log('AudioManager.play() -> this.stop()');
        this.stop();
      }
      this.currentTrack = this.queue[this.currentQueueIndex];
      const blob = await LibraryService.getTrackAudio(this.currentTrack.id);
      this.howler = new Howl({
        src: URL.createObjectURL(blob),
        format: ['mp3'],
        html5: true,
        onload: () => {
          console.log('onload');
          this.playedDuration = new Timer();
          this.timerId = setInterval(() => {
            console.log('Played duration: ', this.playedDuration.getDuration());
            if (this.playedDuration.getDuration() === 7) {
              this.dispatchEvent(new Event('trackPlayed'));
              clearInterval(this.timerId);
            }
          }, 1000, []);
        },
        onplayerror: (err) => {
          console.log('onplayerror');
          console.log(err);
        },
        onloaderror: (err) => {
          console.log('onloaderror');
        },
        onunlock: () => {
          console.log('UNLOCKED');
        },
        onplay: () => {
          this.playedDuration.start();
        },
        onpause: () => {
          this.playedDuration.stop();
        },
        onstop: () => {
          this.playedDuration.stop();
        },
        onend: () => {
          this.stop();
          this.playedDuration.reset();
          if (this.isRepeatOn()) {
            this.play();
            return;
          }
          if (this.isShuffleOn()) {
            this.currentQueueIndex = _.random(0, this.queue.length - 1);
            this.currentTrack = this.queue[this.currentQueueIndex];
            this.play();
          }
        },
      });
      this.soundId = this.howler.play();
      this.stopped = false;
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public resume(): void {
    this.howler.play(this.soundId);
  }

  public pause(): void {
    this.howler.pause(this.soundId);
  }

  public stop(): void {
    this.howler.stop(this.soundId);
    this.stopped = true;
    clearInterval(this.timerId);
  }

  public seek(duration: number): void {
    this.howler.seek(duration, this.soundId);
  }

  public skipForward(): void {
    const playNextTrack = this.isPlaying();
    this.stop();
    if (this.queue.length !== this.currentQueueIndex + 1) {
      this.currentQueueIndex++;
    }
    if (playNextTrack) {
      this.play();
    }
  }

  public skipBack(): void {
    const playNextTrack = this.isPlaying();
    this.stop();
    if (this.currentQueueIndex !== 0 && this.getCurrentDuration() < 7) {
      this.currentQueueIndex--;
    }
    if (playNextTrack) {
      this.play();
    }
  }

  public mute(): void {
    this.howler.mute(true);
  }

  public unmute(): void {
    this.howler.mute(false);
  }

  public shuffle(shuffleOn: boolean) {
    this.shuffleOn = shuffleOn;
  }

  public repeat(repeatOn: boolean) {
    this.howler.loop(repeatOn);
  }

  public setVolume(volume: number): void {
    this.howler.volume(volume);
  }

  public getDurationForDisplay(durationInSec: number): string {
    let min = 0;
    let sec = 0;
    if (durationInSec < 60) {
      min = 0;
      sec = durationInSec;
    }
    if (durationInSec < 3600) {
      min = Math.floor(durationInSec / 60);
      sec = Math.floor(durationInSec % 60);
    }
    return `${min > 9 ? min : '0' + min}:${sec > 9 ? sec : '0' + sec}`;
  }

  public fillInQueue(tracks: TrackDetails[]): void {
    if (this.howler) {
      this.stop();
    }
    if (tracks.length > 0) {
      this.queue = [...tracks];
      this.currentQueueIndex = 0;
      this.currentTrack = this.queue[this.currentQueueIndex];
    }
  }

  public clearQueue(): void {
    if (this.howler) {
      this.stop();
    }
    this.queue = [];
    this.currentQueueIndex = 0;
    this.currentTrack = null;
  }

  public getCurrentTrack(): TrackDetails {
    return this.currentTrack;
  }

  public getCurrentDuration(): number {
    return this.howler.seek();
  }

  public getTotalDuration(): number {
    return this.howler.duration();
  }

  public getCurrentPlayQueue(): TrackDetails[] {
    return this.queue;
  }

  public getCurrentPlayQueueIndex(): number {
    return this.currentQueueIndex;
  }

  public isQueueEmpty(): boolean {
    return this.queue.length === 0;
  }

  public isOnMute(): boolean {
    return this.howler.mute();
  }

  public isStopped(): boolean {
    return this.stopped;
  }

  public isPlaying(): boolean {
    return this.howler.playing();
  }

  public isPaused(): boolean {
    return !this.isPlaying();
  }

  public isShuffleOn(): boolean {
    return this.shuffleOn;
  }

  public isRepeatOn(): boolean {
    return this.howler.loop();
  }

  // public isCached() {
  //   return Promise.resolve();
  // }
}

const INSTANCE = new AudioManager();

export {
  INSTANCE as AudioManager,
};
