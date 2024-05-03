import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { deleteMember } from "./definition";

export const buildOrgDeleteMemberHandler = (main: IMainController) =>
  new OrgDeleteMemberActionHandler(main);

export class OrgDeleteMemberActionHandler extends CompositeActionHandler {
  name = "delete_member";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { username } = action.fnArgs;
    const data = await this.main.orgs.members.delete(username);
    console.log({ data });
  }

  get definition(): any {
    return deleteMember;
  }
}
