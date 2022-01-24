import { Dexie } from 'dexie';
import { IPlayedTrack } from './IPlayedTrack';

class Database extends Dexie {
  public playedTracks: Dexie.Table<IPlayedTrack, number>;

  constructor() {
    super('JamDB');
    this.version(1).stores({
      playedTracks: '++id, trackId, playedAt',
    });
  }
}

const INSTANCE = new Database();

export {
  INSTANCE as Database,
};
