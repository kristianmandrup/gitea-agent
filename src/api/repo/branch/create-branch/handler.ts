import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";

export const buildCreateBranchHandler = (main: IMainController) =>
  new CreateBranchActionHandler(main);

export class CreateBranchActionHandler extends CompositeActionHandler {
  name = "create_branch";

  async handle(action: Action) {
    const data = await this.main.repos.branches.create(action.name);
    console.log({ data });
  }
}
