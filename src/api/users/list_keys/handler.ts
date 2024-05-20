import {
  Action,
  CompositeActionHandler,
  LeafActionHandler,
} from "../../actions";
import { IMainController } from "../../main";
import { listUserKeys } from "./definition";

export const buildListUserKeysHandler = (main: IMainController) =>
  new ListUserKeysActionHandler(main);

export class ListUserKeysActionHandler extends LeafActionHandler {
  name = "list_user_keys";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { username } = action.arguments;
    const data = await this.main.users.listKeys(username);
    console.log({ data });
  }

  get definition(): any {
    return listUserKeys;
  }
}
