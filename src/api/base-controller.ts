import { Api, HttpResponse } from "gitea-js";
import { IMainController } from "./main";
import {
  NotificationAssist,
  NotifyErrorOpts,
  NotifyOpts,
} from "./notification-assist";

export type NotifyData = Record<string, any>;

export interface IBaseController {
  api: Api<unknown>;
  shouldThrow: boolean;
  coreData: NotifyData;
}

export class BaseController {
  main: IMainController;
  shouldThrow = false;
  assist: NotificationAssist;

  baseLabel = "unknown";

  constructor(main: IMainController, opts: any = {}) {
    this.main = main;
    this.assist = this.createNotificationAssist(opts);
  }

  protected labelFor(operation: string) {
    return [this.baseLabel, operation].join(":");
  }

  get api() {
    return this.main.api;
  }

  public async notifyErrorAndReturn(opts: NotifyErrorOpts, data: NotifyData) {
    return await this.assist.notifyErrorAndReturn(opts, data);
  }

  protected async notifyAndReturn<D, E extends unknown = unknown>(
    opts: NotifyOpts,
    data: NotifyData
  ) {
    return await this.assist.notifyAndReturn<D, E>(opts, data);
  }

  protected createNotificationAssist(opts: any = {}) {
    return new NotificationAssist(this.main, this, opts);
  }

  public get coreData(): NotifyData {
    return {};
  }

  public setShouldThrow(shouldThrow: boolean) {
    this.shouldThrow = shouldThrow;
    return this;
  }
}
