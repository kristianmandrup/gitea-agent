import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { getCommit } from "./definition";

export const buildGetFileInfoHandler = (main: IMainController) =>
  new GetFileInfoActionHandler(main);

export class GetFileInfoActionHandler extends CompositeActionHandler {
  name = "get_info";

  async handle(action: Action) {
    if (!action.fnArgs.sha) {
      throw new Error("Missing sha");
    }
    const sha = action.fnArgs.sha;
    const data = await this.main.repos.commits.getSingle(sha);
    console.log({ data });
  }

  get definition(): any {
    return getCommit;
  }
}
