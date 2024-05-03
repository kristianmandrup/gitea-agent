import { Action, CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { listUserKeys } from "./definition";

export const buildListUserKeysHandler = (main: IMainController) =>
  new ListUserKeysActionHandler(main);

export class ListUserKeysActionHandler extends CompositeActionHandler {
  name = "list_team_members";

  async handle(action: Action) {
    const { username } = action.fnArgs;
    const data = await this.main.users.listKeys(username);
    console.log({ data });
  }

  get definition(): any {
    return listUserKeys;
  }
}
