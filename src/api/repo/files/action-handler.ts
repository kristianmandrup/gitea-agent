import { CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { buildChangeFilesHandler } from "./change";
import { buildCreateFileHandler } from "./create";
import { buildDeleteFileHandler } from "./delete";
import { buildGetFileInfoHandler } from "./get";
import { buildListFilesHandler } from "./list";

export const buildFilesHandler = (main: IMainController) =>
  new RepoFileActionHandler(main);

export class RepoFileActionHandler extends CompositeActionHandler {
  get handlers() {
    return [
      buildChangeFilesHandler,
      buildCreateFileHandler,
      buildDeleteFileHandler,
      buildGetFileInfoHandler,
      buildListFilesHandler,
    ];
  }
}
