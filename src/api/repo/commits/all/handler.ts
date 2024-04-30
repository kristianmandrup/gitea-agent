import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { getAll } from "./definition";

export const buildListFilesHandler = (main: IMainController) =>
  new ListFilesActionHandler(main);

export class ListFilesActionHandler extends CompositeActionHandler {
  name = "list_release";

  async handle(action: Action) {
    const { sha, filepath } = action.fnArgs;
    const data = await this.main.repos.commits.getAll({ sha, filepath });
    console.log({ data });
  }

  get definition(): any {
    return getAll;
  }
}
