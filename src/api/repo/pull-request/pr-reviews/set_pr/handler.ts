import { Action, CompositeActionHandler } from "../../../../actions";
import { IMainController } from "../../../../main";
import { setPullRequestId } from "./definition";

export const buildSetPullRequestIdHandler = (main: IMainController) =>
  new SetPullRequestIdActionHandler(main);

export class SetPullRequestIdActionHandler extends CompositeActionHandler {
  name = "set_pull_request_id";

  async handle(action: Action) {
    if (!action.fnArgs.id) {
      throw new Error("Missing id");
    }
    const id = Number(action.fnArgs.id);
    const data = await this.main.repos.pullRequests.reviews.setPullRequestId(
      id
    );
    console.log({ data });
  }

  get definition(): any {
    return setPullRequestId;
  }
}
