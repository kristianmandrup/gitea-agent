import { Action, CompositeActionHandler } from "../../../../actions";
import { IMainController } from "../../../../main";
import { dismissPullRequestReview } from "./definition";

export const buildDismissPullRequestReviewHandler = (main: IMainController) =>
  new DismissPullRequestReviewActionHandler(main);

export class DismissPullRequestReviewActionHandler extends CompositeActionHandler {
  name = "dismiss_pull_request_review";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const id = Number(action.arguments.id);
    const { message } = action.arguments;
    const data = await this.main.repos.pullRequests.reviews.dismiss(id, {
      message,
    });
    console.log({ data });
  }

  get definition(): any {
    return dismissPullRequestReview;
  }
}
