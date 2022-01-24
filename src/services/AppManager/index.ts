import { GetUserByIdRequest } from '@/classes/User/DTOs/commands/GetUserByIdRequest';
import { UserDetails } from '@/classes/User/DTOs/queries/UserDetails';
import { UserState } from '@/classes/User/Types/UserState';
import { Database } from '@/persistence';
import { AuthService } from '../AuthService';
import { LibraryService } from '../LibraryService';
import { UserService } from '../UserService';

class AppManager {
  public addBeacon(url: string, data: FormData): void {
    let successfullyQueued = false;
    let attemptsCount = 0;
    while (!successfullyQueued && attemptsCount < 5) {
      successfullyQueued = navigator.sendBeacon(url, data);
      attemptsCount++;
    }
  }

  public async syncPlayedTracks(): Promise<void> {
    const playedTracks = await Database.playedTracks.toArray();
    for (const pt of playedTracks) {
      await LibraryService.trackPlayed(pt);
      await Database.playedTracks.delete(pt.id);
    }
    Promise.all(playedTracks);
  }

  public async checkUserState(): Promise<void> {
    if (AuthService.isAuthenticated()) {
      const dto = new GetUserByIdRequest(AuthService.getSubjectId());
      const user: UserDetails = await UserService.getUserById(dto);
      if (user.state === UserState.ACTIVE) {
        return Promise.resolve();
      }
    }
    return Promise.reject();
  }
}

const INSTANCE = new AppManager();

export {
  INSTANCE as AppManager,
};
