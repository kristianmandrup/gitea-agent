import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { getReviewers } from "./definition";

export const buildGetReviewersHandler = (main: IMainController) =>
  new GetReviewersActionHandler(main);

export class GetReviewersActionHandler extends CompositeActionHandler {
  name = "list_reviewers";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const data = await this.main.repos.listReviewers();
    console.log({ data });
  }

  get definition(): any {
    return getReviewers;
  }
}
