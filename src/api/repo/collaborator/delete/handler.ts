import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { deleteCollaborator } from "./definition";

export const buildDeleteCollaboratorHandler = (main: IMainController) =>
  new CreateCollaboratorActionHandler(main);

export class CreateCollaboratorActionHandler extends CompositeActionHandler {
  name = "delete_collaborator";

  async handle(action: Action) {
    if (!this.validateRequired(action)) return;
    const { name } = action;
    const data = await this.main.repos.collaborators.delete(name);
    console.log({ data });
  }

  get definition(): any {
    return deleteCollaborator;
  }
}
