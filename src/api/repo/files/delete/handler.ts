import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { deleteFile } from "./definition";

export const buildDeleteFileHandler = (main: IMainController) =>
  new DeleteFileActionHandler(main);

export class DeleteFileActionHandler extends CompositeActionHandler {
  name = "delete_release";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { filepath, sha, message, branch, author } = action.parameters;
    const opts = { message, branch, author, sha };
    const data = await this.main.repos.files.delete(filepath, sha, opts);
    console.log({ data });
  }

  get definition(): any {
    return deleteFile;
  }
}
