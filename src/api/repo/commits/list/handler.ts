import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { listCommits } from "./definition";

export const buildListCommitsHandler = (main: IMainController) =>
  new ListCommitsActionHandler(main);

export class ListCommitsActionHandler extends CompositeActionHandler {
  name = "list_commits";

  async handle(action: Action) {
    const { sha, path, stat, files } = action.fnArgs;
    const data = await this.main.repos.commits.list({ sha, path, stat, files });
    console.log({ data });
  }

  get definition(): any {
    return listCommits;
  }
}
