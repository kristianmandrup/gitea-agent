import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { listMembers } from "./definition";

export const buildOrgListMemberHandler = (main: IMainController) =>
  new OrgListMemberActionHandler(main);

export class OrgListMemberActionHandler extends CompositeActionHandler {
  name = "list_members";

  async handle(action: Action) {
    if (!this.validateRequired(action)) return;
    const data = await this.main.orgs.members.list();
    console.log({ data });
  }

  get definition(): any {
    return listMembers;
  }
}
