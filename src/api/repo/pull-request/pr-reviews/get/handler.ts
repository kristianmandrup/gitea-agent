import { Action, CompositeActionHandler } from "../../../../actions";
import { IMainController } from "../../../../main";
import { getPullRequestReview } from "./definition";

export const buildGetPullRequestReviewHandler = (main: IMainController) =>
  new GetPullRequestReviewActionHandler(main);

export class GetPullRequestReviewActionHandler extends CompositeActionHandler {
  name = "get_pull_request";

  async handle(action: Action) {
    if (!action.fnArgs.id) {
      throw new Error("Missing id");
    }
    const id = Number(action.fnArgs.id);
    const reviewId = Number(action.fnArgs.reviewId);
    const data = await this.main.repos.pullRequests.reviews.getById(
      reviewId,
      id
    );
    console.log({ data });
  }

  get definition(): any {
    return getPullRequestReview;
  }
}
