import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { createBranch } from "./definition";

export const buildCreateBranchHandler = (main: IMainController) =>
  new CreateBranchActionHandler(main);

export class CreateBranchActionHandler extends CompositeActionHandler {
  name = "create_branch";

  async handle(action: Action) {
    if (!this.validateRequired(action)) return;
    const { name } = action;
    const data = await this.main.repos.branches.create(name);
    console.log({ data });
  }

  get definition(): any {
    return createBranch;
  }
}
