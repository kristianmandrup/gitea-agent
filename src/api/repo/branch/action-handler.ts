import { CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { buildCreateBranchHandler } from "./create";
import { buildDeleteBranchHandler } from "./delete";
import { buildGetBranchHandler } from "./get";
import { buildListBranchesHandler } from "./list";

export const buildBranchHandler = (main: IMainController) =>
  new RepoBranchActionHandler(main);

export class RepoBranchActionHandler extends CompositeActionHandler {
  get handlers() {
    return [
      buildCreateBranchHandler,
      buildDeleteBranchHandler,
      buildGetBranchHandler,
      buildListBranchesHandler,
    ];
  }
}
