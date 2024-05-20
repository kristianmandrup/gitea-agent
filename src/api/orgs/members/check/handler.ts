import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { checkIsMember } from "./definition";

export const buildOrgCheckIsMemberHandler = (main: IMainController) =>
  new OrgCheckIsMemberActionHandler(main);

export class OrgCheckIsMemberActionHandler extends CompositeActionHandler {
  name = "check_is_member";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { username } = action.arguments;
    const data = await this.main.orgs.members.isMember(username);
    console.log({ data });
  }

  get definition(): any {
    return checkIsMember;
  }
}
