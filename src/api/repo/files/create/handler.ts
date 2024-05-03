import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { createFile } from "./definition";

export const buildCreateFileHandler = (main: IMainController) =>
  new CreateFileActionHandler(main);

export class CreateFileActionHandler extends CompositeActionHandler {
  name = "create_file";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { filepath, content, message, branch, author } = action.fnArgs;
    const opts = { content, message, branch, author };
    const data = await this.main.repos.files.create(filepath, content, opts);
    console.log({ data });
  }

  get definition(): any {
    return createFile;
  }
}
