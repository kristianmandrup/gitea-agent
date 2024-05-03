import { HttpResponse } from "gitea-js";
import { INotifier, MainNotifier } from "./notifier";
import { IMainController } from "./main";
import { IBaseController } from "./base-controller";

export type NotifyOpts = {
  label: string;
  returnVal?: any;
  response: HttpResponse<any, any>;
};
export type NotifyErrorOpts = {
  label: string;
  returnVal?: any;
  error: any;
};

export interface INotificationAssist {
  notify(label: string, data: any): void;
  notifyError(label: string, data: any): void;
}

export class NotificationAssist {
  main: IMainController;
  controller: IBaseController;
  notifier: INotifier;

  constructor(
    main: IMainController,
    controller: IBaseController,
    opts: any = {}
  ) {
    this.main = main;
    this.controller = controller;
    this.notifier = opts.notifier || this.createNotifier();
  }

  protected createNotifier() {
    return new MainNotifier(this.main);
  }

  notify(label: string, data: any) {
    this.notifier.notify(label, data);
  }

  notifyError(label: string, data: any) {
    this.notifier.notifyError(label, data);
  }

  get shouldThrow() {
    return this.controller.shouldThrow;
  }

  get coreData() {
    return this.controller.coreData;
  }

  protected notifyData(...rest: any[]) {
    return {
      ...this.coreData,
      ...rest,
    };
  }

  enrich(notification: any, response: HttpResponse<unknown, unknown>) {
    if (response.ok) {
      notification.data = response.data;
    } else {
      notification.error = response.error;
    }
  }

  protected enrichedNotification(
    response: HttpResponse<any, any>,
    ...rest: any[]
  ) {
    const notification = this.notifyData(...rest);
    this.enrich(notification, response);
    return notification;
  }

  protected enrichedNotificationError(error: any, ...rest: any[]) {
    return this.notifyData(...rest, { error: error.message || error });
  }

  protected async notifyEnriched(
    label: string,
    response: HttpResponse<any, any>,
    ...rest: any[]
  ) {
    const notification = this.enrichedNotification(response, ...rest);
    await this.notify(label, notification);
  }

  protected async notifyEnrichedError(
    label: string,
    error: any,
    ...rest: any[]
  ) {
    const notification = this.enrichedNotificationError(error, ...rest);
    await this.notify(label, notification);
  }

  public async notifyErrorAndReturn(
    { label, error, returnVal }: NotifyErrorOpts,
    ...rest: any[]
  ) {
    await this.notifyEnrichedError(label, error, ...rest);
    if (this.shouldThrow) {
      throw error;
    }
    return returnVal;
  }

  public async notifyAndReturn<D, E extends unknown = unknown>(
    { label, response, returnVal }: NotifyOpts,
    ...rest: any[]
  ) {
    await this.notifyEnriched(label, response, ...rest);
    return this.returnData<D, E>(response, returnVal);
  }

  public returnData<D, E extends unknown = unknown>(
    response: HttpResponse<D, unknown>,
    onError?: E
  ) {
    return response.ok ? response.data : onError || undefined;
  }
}
