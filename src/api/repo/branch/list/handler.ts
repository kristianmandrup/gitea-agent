import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { listBranches } from "./definition";

export const buildListBranchesHandler = (main: IMainController) =>
  new ListBranchesActionHandler(main);

export class ListBranchesActionHandler extends CompositeActionHandler {
  name = "list_branch";

  async handle(_action: Action) {
    const data = await this.main.repos.branches.list();
    console.log({ data });
  }

  get definition(): any {
    return listBranches;
  }
}
