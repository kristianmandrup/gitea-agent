import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { checkCollaborator } from "./definition";

export const buildCheckCollaboratorHandler = (main: IMainController) =>
  new CheckCollaboratorActionHandler(main);

export class CheckCollaboratorActionHandler extends CompositeActionHandler {
  name = "check_branch";

  async handle(action: Action) {
    const data = await this.main.repos.collaborators.check(action.name);
    console.log({ data });
  }

  get definition(): any {
    return checkCollaborator;
  }
}
