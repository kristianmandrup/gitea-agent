import { Action, CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { listUserOrgs } from "./definition";

export const buildListUserOrgsHandler = (main: IMainController) =>
  new ListUserOrgsActionHandler(main);

export class ListUserOrgsActionHandler extends CompositeActionHandler {
  name = "list_user_organizations";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { username } = action.arguments;
    const data = await this.main.users.listOrgs(username);
    console.log({ data });
  }

  get definition(): any {
    return listUserOrgs;
  }
}
