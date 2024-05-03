import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { getFileInfo } from "./definition";

export const buildGetFileInfoHandler = (main: IMainController) =>
  new GetFileInfoActionHandler(main);

export class GetFileInfoActionHandler extends CompositeActionHandler {
  name = "get_info";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const id = Number(action.parameters.id);
    const data = await this.main.repos.releases.getById(id);
    console.log({ data });
  }

  get definition(): any {
    return getFileInfo;
  }
}
