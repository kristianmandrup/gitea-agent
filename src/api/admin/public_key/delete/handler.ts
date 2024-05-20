import { Action, LeafActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { deletePublicKey } from "./definition";

export const buildDeletePublicKeyHandler = (main: IMainController) =>
  new DeletePublicKeyActionHandler(main);

export class DeletePublicKeyActionHandler extends LeafActionHandler {
  name = "delete_public_key";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { name } = action.arguments;
    const data = await this.main.orgs.delete(name);
    console.log({ data });
  }

  get definition(): any {
    return deletePublicKey;
  }
}
