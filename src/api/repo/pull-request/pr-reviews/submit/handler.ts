import { Action, CompositeActionHandler } from "../../../../actions";
import { IMainController } from "../../../../main";
import { submitPullRequestReview } from "./definition";

export const buildSubmitPullRequestReviewHandler = (main: IMainController) =>
  new SubmitPullRequestReviewActionHandler(main);

export class SubmitPullRequestReviewActionHandler extends CompositeActionHandler {
  name = "submit_pull_request_review";

  async handle(action: Action) {
    if (!this.validateRequired(action)) return;
    const id = Number(action.fnArgs.id);
    const { state, body } = action.fnArgs;
    const data = await this.main.repos.pullRequests.reviews.submitPending(id, {
      event: state,
      body,
    });
    console.log({ data });
  }

  get definition(): any {
    return submitPullRequestReview;
  }
}
