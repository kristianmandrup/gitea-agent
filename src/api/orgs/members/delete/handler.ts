import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { deleteMember } from "./definition";

export const buildOrgDeleteMemberHandler = (main: IMainController) =>
  new OrgDeleteMemberActionHandler(main);

export class OrgDeleteMemberActionHandler extends CompositeActionHandler {
  name = "delete_member";

  async handle(action: Action) {
    const { username } = action.fnArgs;
    if (!username) {
      throw new Error("Missing username");
    }
    const data = await this.main.orgs.members.delete(username);
    console.log({ data });
  }

  get definition(): any {
    return deleteMember;
  }
}
