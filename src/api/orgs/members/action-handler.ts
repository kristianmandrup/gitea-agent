import { CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { buildOrgCheckIsMemberHandler } from "./check";
import { buildOrgDeleteMemberHandler } from "./delete";
import { buildOrgListMemberHandler } from "./list";

export const buildBranchHandler = (main: IMainController) =>
  new RepoBranchActionHandler(main);

export class RepoBranchActionHandler extends CompositeActionHandler {
  get handlers() {
    return [
      buildOrgCheckIsMemberHandler,
      buildOrgDeleteMemberHandler,
      buildOrgListMemberHandler,
    ];
  }
}
