import { Action, LeafActionHandler } from "../../../../actions";
import { IMainController } from "../../../../main";
import { getReviewComments } from "./definition";

export const buildGetPullRequestReviewCommentsHandler = (
  main: IMainController
) => new GetPullRequestReviewCommentsActionHandler(main);

export class GetPullRequestReviewCommentsActionHandler extends LeafActionHandler {
  name = "get_review_comments";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { pullRequestId } = action.arguments;
    const data = await this.main.repos.pullRequests.reviews.getComments(
      pullRequestId
    );
    console.log({ data });
  }

  get definition(): any {
    return getReviewComments;
  }
}
