import { UserState } from "../../Types/UserState";

class ActivateBlockUserRequest {
  public id: string;
  public state: UserState;

  public constructor(
    id: string,
    state: UserState
  ) {
    this.id = id;
    this.state = state;
  }

}

export {
  ActivateBlockUserRequest
}
