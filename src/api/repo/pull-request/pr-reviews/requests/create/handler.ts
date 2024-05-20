import { Action, CompositeActionHandler } from "../../../../../actions";
import { IMainController } from "../../../../../main";
import { createReviewRequests } from "./definition";

export const buildCreateReviewRequestsHandler = (main: IMainController) =>
  new CreateReviewRequestsActionHandler(main);

export class CreateReviewRequestsActionHandler extends CompositeActionHandler {
  name = "create_review_requests";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { reviewers, teamReviewers, pullRequestId } = action.arguments;
    const data =
      await this.main.repos.pullRequests.reviews.requests.createRequests(
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
