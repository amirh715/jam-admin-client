import { GenreIdAndTitle } from "./GenreIdAndTitle";

class LibraryEntitySummary {
  public id: string;
  public title: string;
  public published: boolean;
  public dailyPlayedCount: string;
  public rate: string;
  public genres: GenreIdAndTitle[];

  public constructor(
    id: string,
    title: string,
    published: boolean,
    dailyPlayedCount: string,
    rate: string,
    genres: GenreIdAndTitle[]
  ) {
    this.id = id;
    this.title = title;
    this.published = published;
    this.dailyPlayedCount = dailyPlayedCount;
    this.rate = rate;
    this.genres = genres;
  }

}

export {
  LibraryEntitySummary
}
