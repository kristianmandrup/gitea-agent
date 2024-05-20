import { CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { buildCreatePublicKeyHandler } from "./create";
import { buildDeletePublicKeyHandler } from "./delete";

export const buildPublicKeyHandler = (main: IMainController) =>
  new RepoPublicKeyActionHandler(main);

export class RepoPublicKeyActionHandler extends CompositeActionHandler {
  get handlers() {
    return [buildCreatePublicKeyHandler, buildDeletePublicKeyHandler];
  }
}
