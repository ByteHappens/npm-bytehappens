import { ILog, ILogger, ILoggerFactory } from "../logging";
import { IApplication } from "../applications";

import { BaseTask } from "./bases/basetask";

export class StopApplicationTask<
  TLog extends ILog,
  TLogger extends ILogger<TLog>,
  TLoggerFactory extends ILoggerFactory<TLog, TLogger>
> extends BaseTask<TLog, TLogger, TLoggerFactory> {
  private _application: IApplication;

  public constructor(application: IApplication, taskName: string, loggerFactory: TLoggerFactory) {
    super(taskName, loggerFactory);

    this._application = application;
  }

  protected async ExecuteInternalAsync(): Promise<boolean> {
    return this._application.StopAsync();
  }
}
