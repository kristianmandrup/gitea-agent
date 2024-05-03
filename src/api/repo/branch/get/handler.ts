import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { getBranch } from "./definition";

export const buildGetBranchHandler = (main: IMainController) =>
  new GetBranchActionHandler(main);

export class GetBranchActionHandler extends CompositeActionHandler {
  name = "get_branch";

  async handle(action: Action) {
    if (!this.validateRequired(action)) return;
    const { name } = action.fnArgs;
    const data = await this.main.repos.branches.getByName(name);
    console.log({ data });
  }

  get definition(): any {
    return getBranch;
  }
}
