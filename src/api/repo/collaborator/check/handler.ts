import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { checkCollaborator } from "./definition";

export const buildCheckCollaboratorHandler = (main: IMainController) =>
  new CheckCollaboratorActionHandler(main);

export class CheckCollaboratorActionHandler extends CompositeActionHandler {
  name = "check_collaborator";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { name } = action.arguments;
    const data = await this.main.repos.collaborators.check(name);
    console.log({ data });
  }

  get definition(): any {
    return checkCollaborator;
  }
}
