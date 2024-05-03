import { Action, CompositeActionHandler } from "../../../../actions";
import { IMainController } from "../../../../main";
import { deletePullRequestReview } from "./definition";

export const buildDeletePullRequestReviewHandler = (main: IMainController) =>
  new DeletePullRequestReviewActionHandler(main);

export class DeletePullRequestReviewActionHandler extends CompositeActionHandler {
  name = "delete_pull_request_review";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const id = Number(action.fnArgs.id);
    const reviewId = Number(action.fnArgs.reviewId);
    const data = await this.main.repos.pullRequests.reviews.delete(
      reviewId,
      id
    );
    console.log({ data });
  }

  get definition(): any {
    return deletePullRequestReview;
  }
}
