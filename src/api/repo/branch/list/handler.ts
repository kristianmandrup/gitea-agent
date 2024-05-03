import { Action, LeafActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { listBranches } from "./definition";

export const buildListBranchesHandler = (main: IMainController) =>
  new ListBranchesActionHandler(main);

export class ListBranchesActionHandler extends LeafActionHandler {
  name = "list_branches";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const data = await this.main.repos.branches.list();
    console.log({ data });
  }

  get definition(): any {
    return listBranches;
  }
}
