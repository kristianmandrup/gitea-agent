import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { getBranch } from "./definition";

export const buildGetBranchHandler = (main: IMainController) =>
  new GetBranchActionHandler(main);

export class GetBranchActionHandler extends CompositeActionHandler {
  name = "get_branch";

  async handle(action: Action) {
    const { name } = action.fnArgs;
    if (!name) {
      throw new Error("Missing name");
    }
    const data = await this.main.repos.branches.getNamed(name);
    console.log({ data });
  }

  get definition(): any {
    return getBranch;
  }
}
