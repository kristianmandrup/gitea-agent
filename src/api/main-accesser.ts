import { Api } from "gitea-js";
import { GiteaApi } from "./api";
import { IMainController } from "./main";

export interface IMainAccessor {
  main: IMainController;
  gitea: GiteaApi;
  api: Api<unknown>;
}

export abstract class GiteaMainAccessor {
  main: IMainController;

  constructor(main: IMainController) {
    this.main = main;
  }

  get gitea() {
    return this.main.gitea;
  }

  get api() {
    return this.gitea.api;
  }
}
