import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { getCommit } from "./definition";

export const buildGetCommitHandler = (main: IMainController) =>
  new GetCommitActionHandler(main);

export class GetCommitActionHandler extends CompositeActionHandler {
  name = "get_commit";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    if (!action.arguments.sha) {
      throw new Error("Missing sha");
    }
    const sha = action.arguments.sha;
    const data = await this.main.repos.commits.getBySha(sha);
    console.log({ data });
  }

  get definition(): any {
    return getCommit;
  }
}
