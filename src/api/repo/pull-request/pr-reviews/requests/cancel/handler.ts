import { Action, CompositeActionHandler } from "../../../../../actions";
import { IMainController } from "../../../../../main";
import { createReviewRequests } from "./definition";

export const buildCancelReviewRequestsHandler = (main: IMainController) =>
  new CancelReviewRequestsActionHandler(main);

export class CancelReviewRequestsActionHandler extends CompositeActionHandler {
  name = "cancel_review_requests";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { reviewers, teamReviewers, pullRequestId } = action.fnArgs;
    const data =
      await this.main.repos.pullRequests.reviews.requests.cancelRequests(
        {
          reviewers,
          team_reviewers: teamReviewers,
        },
        pullRequestId
      );
    console.log({ data });
  }

  get definition(): any {
    return createReviewRequests;
  }
}
