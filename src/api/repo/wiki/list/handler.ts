import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { listWikiPages } from "./definition";

export const buildListWikiPagesHandler = (main: IMainController) =>
  new ListWikiPagesActionHandler(main);

export class ListWikiPagesActionHandler extends CompositeActionHandler {
  name = "list_wiki_pages";

  async handle(action: Action) {
    if (!this.validateRequired(action)) return;
    const data = await this.main.repos.wikis.listPages();
    console.log({ data });
  }

  get definition(): any {
    return listWikiPages;
  }
}
