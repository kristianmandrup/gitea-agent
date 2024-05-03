import { Action, CompositeActionHandler } from "../../../../actions";
import { IMainController } from "../../../../main";
import { createPullRequestReview } from "./definition";

export const buildCreatePullRequestReviewHandler = (main: IMainController) =>
  new CreatePullRequestReviewActionHandler(main);

export class CreatePullRequestReviewActionHandler extends CompositeActionHandler {
  name = "create_pull_request";

  async handle(action: Action) {
    if (!this.validateRequired(action)) return;
    const opts = action.fnArgs;
    const data = await this.main.repos.pullRequests.reviews.create(opts);
    console.log({ data });
  }

  get definition(): any {
    return createPullRequestReview;
  }
}
