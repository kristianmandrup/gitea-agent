import { ActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { buildCreateBranchHandler, createBranch } from "./create-branch";
import { buildDeleteBranchHandler, deleteBranch } from "./delete-branch";

export const buildBranchHandler = (main: IMainController) =>
  new RepoBranchActionHandler(main);

export class RepoBranchActionHandler extends ActionHandler {
  get handlers() {
    return [buildCreateBranchHandler, buildDeleteBranchHandler];
  }
}
