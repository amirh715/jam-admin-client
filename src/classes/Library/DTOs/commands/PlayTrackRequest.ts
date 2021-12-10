class PlayTrackRequest {
  public trackId: string;
  public playedAt: Date;

  public constructor(trackId: string, playedAt: Date) {
    this.trackId = trackId;
    this.playedAt = playedAt;
  }

}

export {
  PlayTrackRequest
}
