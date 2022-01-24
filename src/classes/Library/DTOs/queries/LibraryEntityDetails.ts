import { GenreIdAndTitle } from './GenreIdAndTitle';

abstract class LibraryEntityDetails {
  public id: string;
  public type: string;
  public title: string;
  public description: string;
  public published: boolean;
  public tags: string[];
  public genres: GenreIdAndTitle[];
  public monthlyPlayedCount: string;
  public rate: string;
  public flagNote: string;
  public totalPlayedCount: string;
  public duration: number;
  public imageSrc: string;
  public createdAt: Date;
  public lastModifiedAt: Date;
  public creatorId: string;
  public creatorName: string;
  public updaterId: string;
  public updaterName: string;

  public constructor(
    _props: {
      id: string,
      type: string,
      title: string,
      description: string,
      published: boolean,
      tags: string[],
      genres: GenreIdAndTitle[],
      monthlyPlayedCount: string,
      rate: string,
      flagNote: string,
      totalPlayedCount: string,
      duration: number,
      imageSrc: string,
      createdAt: string,
      lastModifiedAt: string,
      creatorId: string,
      creatorName: string,
      updaterId: string,
      updaterName: string,
    },
  ) {
    this.id = _props.id;
    this.type = _props.type;
    this.title = _props.title;
    this.description = _props.description;
    this.published = _props.published;
    this.tags = _props.tags;
    this.genres = _props.genres;
    this.monthlyPlayedCount = _props.monthlyPlayedCount;
    this.rate = _props.rate;
    this.flagNote = _props.flagNote;
    this.totalPlayedCount = _props.totalPlayedCount;
    this.duration = _props.duration;
    console.log('FUCK MEMEMEMEM', _props.createdAt);
    this.createdAt = new Date(_props.createdAt);
    this.lastModifiedAt = new Date(_props.lastModifiedAt);
    this.creatorId = _props.creatorId;
    this.creatorName = _props.creatorName;
    this.updaterId = _props.updaterId;
    this.updaterName = _props.updaterName;
  }
}

export {
  LibraryEntityDetails,
};
