import { CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { buildCreateOrgTeamHandler } from "./create";
import { buildGetOrgTeamHandler } from "./get";
import { buildListOrgTeamHandler } from "./list";

export const buildBranchHandler = (main: IMainController) =>
  new RepoBranchActionHandler(main);

export class RepoBranchActionHandler extends CompositeActionHandler {
  get handlers() {
    return [
      buildCreateOrgTeamHandler,
      buildGetOrgTeamHandler,
      buildListOrgTeamHandler,
    ];
  }
}
