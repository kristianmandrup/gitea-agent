import { CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { buildGetFileInfoHandler } from "./get";
import { buildListFilesHandler } from "./all";

export const buildFileHandler = (main: IMainController) =>
  new RepoFileActionHandler(main);

export class RepoFileActionHandler extends CompositeActionHandler {
  get handlers() {
    return [buildGetFileInfoHandler, buildListFilesHandler];
  }
}
