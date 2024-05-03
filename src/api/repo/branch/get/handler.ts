import { Action, LeafActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { getBranch } from "./definition";

export const buildGetBranchHandler = (main: IMainController) =>
  new GetBranchActionHandler(main);

export class GetBranchActionHandler extends LeafActionHandler {
  name = "get_branch";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { name } = action.parameters;
    const data = await this.main.repos.branches.getByName(name);
    console.log({ data });
  }

  get definition(): any {
    return getBranch;
  }
}
