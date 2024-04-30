import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { getReviewers } from "./definition";

export const buildGetReviewersHandler = (main: IMainController) =>
  new GetReviewersActionHandler(main);

export class GetReviewersActionHandler extends CompositeActionHandler {
  name = "get_reviewers";

  async handle(_action: Action) {
    const data = await this.main.repos.getReviewers();
    console.log({ data });
  }

  get definition(): any {
    return getReviewers;
  }
}
