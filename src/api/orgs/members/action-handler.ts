import { CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { buildOrgCheckIsMemberHandler } from "./check";
import { buildOrgDeleteMemberHandler } from "./delete";
import { buildOrgListMemberHandler } from "./list";

export const buildOrgMembersHandler = (main: IMainController) =>
  new RepoOrgMembersActionHandler(main);

export class RepoOrgMembersActionHandler extends CompositeActionHandler {
  get handlers() {
    return [
      buildOrgCheckIsMemberHandler,
      buildOrgDeleteMemberHandler,
      buildOrgListMemberHandler,
    ];
  }
}
