import { GenreIdAndTitle } from './GenreIdAndTitle';

abstract class LibraryEntityDetails {
  public id: string;
  public title: string;
  public description: string;
  public published: boolean;
  public tags: string[];
  public genres: GenreIdAndTitle[];
  public monthlyPlayedCount: string;
  public rate: string;
  public flag: string;
  public totalPlayedCount: string;
  public duration: string;
  public imageSrc: string;

  public constructor(
    _props: {
      id: string,
      title: string,
      description: string,
      published: boolean,
      tags: string[],
      genres: GenreIdAndTitle[],
      monthlyPlayedCount: string,
      rate: string,
      flag: string,
      totalPlayedCount: string,
      duration: string,
      imageSrc: string,
    },
  ) {
    this.id = _props.id;
    this.title = _props.title;
    this.description = _props.description;
    this.published = _props.published;
    this.tags = _props.tags;
    this.genres = _props.genres;
    this.monthlyPlayedCount = _props.monthlyPlayedCount;
    this.rate = _props.rate;
    this.flag = _props.flag;
    this.totalPlayedCount = _props.totalPlayedCount;
    this.duration = _props.duration;
  }
}

export {
  LibraryEntityDetails,
};
