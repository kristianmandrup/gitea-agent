import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { listFiles } from "./definition";

export const buildListFilesHandler = (main: IMainController) =>
  new ListFilesActionHandler(main);

export class ListFilesActionHandler extends CompositeActionHandler {
  name = "list_release";

  async handle(_action: Action) {
    const data = await this.main.repos.releases.list();
    console.log({ data });
  }

  get definition(): any {
    return listFiles;
  }
}
