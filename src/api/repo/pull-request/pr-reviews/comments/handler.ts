import { Action, CompositeActionHandler } from "../../../../actions";
import { IMainController } from "../../../../main";
import { createReviewRequests } from "./definition";

export const buildCreatePullRequestReviewHandler = (main: IMainController) =>
  new CreatePullRequestReviewActionHandler(main);

export class CreatePullRequestReviewActionHandler extends CompositeActionHandler {
  name = "create_review_requests";

  async handle(action: Action) {
    const { reviewers, teamReviewers, pullRequestId } = action.fnArgs;
    const data = await this.main.repos.pullRequests.reviews.createRequests(
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
