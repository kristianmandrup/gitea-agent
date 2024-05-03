import { Action, CompositeActionHandler } from "../../../../actions";
import { IMainController } from "../../../../main";
import { getReviewComments } from "./definition";

export const buildCreatePullRequestReviewHandler = (main: IMainController) =>
  new CreatePullRequestReviewActionHandler(main);

export class CreatePullRequestReviewActionHandler extends CompositeActionHandler {
  name = "create_review_requests";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { pullRequestId } = action.fnArgs;
    const data = await this.main.repos.pullRequests.reviews.getComments(
      pullRequestId
    );
    console.log({ data });
  }

  get definition(): any {
    return getReviewComments;
  }
}
