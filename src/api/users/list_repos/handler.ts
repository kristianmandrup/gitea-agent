import { Action, CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { listUserRepos } from "./definition";

export const buildListUserReposHandler = (main: IMainController) =>
  new ListUserReposActionHandler(main);

export class ListUserReposActionHandler extends CompositeActionHandler {
  name = "list_user_repos";

  async handle(action: Action) {
    this.validateRequired(action);
    const { username } = action.fnArgs;
    const data = await this.main.users.listRepos(username);
    console.log({ data });
  }

  get definition(): any {
    return listUserRepos;
  }
}
