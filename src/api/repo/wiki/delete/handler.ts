import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { deleteWikiPage } from "./definition";

export const buildDeleteWikiPageHandler = (main: IMainController) =>
  new DeleteWikiPageActionHandler(main);

export class DeleteWikiPageActionHandler extends CompositeActionHandler {
  name = "delete_wiki_page";

  async handle(action: Action) {
    if (!action.fnArgs.pageName) {
      throw new Error("Missing pageName");
    }
    const pageName = action.fnArgs.id;
    const data = await this.main.repos.wikis.deletePage(pageName);
    console.log({ data });
  }

  get definition(): any {
    return deleteWikiPage;
  }
}
