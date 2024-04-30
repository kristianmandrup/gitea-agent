import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { changeFile } from "./definition";

export const buildChangeFilesHandler = (main: IMainController) =>
  new ChangeFilesActionHandler(main);

export class ChangeFilesActionHandler extends CompositeActionHandler {
  name = "change_files";

  async handle(action: Action) {
    const { files, message, branch, author } = action.fnArgs;
    const opts = { message, branch, author, files };
    const data = await this.main.repos.files.changes(files, opts);
    console.log({ data });
  }

  get definition(): any {
    return changeFile;
  }
}
