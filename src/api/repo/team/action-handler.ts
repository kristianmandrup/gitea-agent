import { CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { buildAddTeamHandler } from "./add";
import { buildDeleteTeamHandler } from "./delete";
import { buildCheckTeamHandler } from "./check";
import { buildListTeamHandler } from "./list";

export const buildBranchHandler = (main: IMainController) =>
  new RepoBranchActionHandler(main);

export class RepoBranchActionHandler extends CompositeActionHandler {
  get handlers() {
    return [
      buildAddTeamHandler,
      buildDeleteTeamHandler,
      buildCheckTeamHandler,
      buildListTeamHandler,
    ];
  }
}
