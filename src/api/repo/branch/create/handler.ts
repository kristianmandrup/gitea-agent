import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { createBranch } from "./definition";

export const buildCreateBranchHandler = (main: IMainController) =>
  new CreateBranchActionHandler(main);

export class CreateBranchActionHandler extends CompositeActionHandler {
  name = "create_branch";

  async handle(action: Action) {
    const { name } = action;
    if (!name) {
      throw new Error("Missing name");
    }
    const data = await this.main.repos.branches.create(name);
    console.log({ data });
  }

  get definition(): any {
    return createBranch;
  }
}
