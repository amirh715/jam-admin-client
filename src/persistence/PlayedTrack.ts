import { IPlayedTrack } from './IPlayedTrack';

class PlayedTrack implements IPlayedTrack {
  public trackId: string;
  public playedAt: Date;
  constructor(trackId: string, playedTrack?: Date) {
    this.trackId = trackId;
    this.playedAt = playedTrack || new Date();
  }
}

export {
  PlayedTrack,
};
