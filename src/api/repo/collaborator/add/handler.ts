import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { addCollaborator } from "./definition";

export const buildAddCollaboratorHandler = (main: IMainController) =>
  new CreateCollaboratorActionHandler(main);

export class CreateCollaboratorActionHandler extends CompositeActionHandler {
  name = "add_collaborator";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { name } = action.arguments;
    const data = await this.main.repos.collaborators.add(name);
    console.log({ data });
  }

  get definition(): any {
    return addCollaborator;
  }
}
