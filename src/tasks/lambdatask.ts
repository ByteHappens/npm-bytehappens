import { ILog, ILogger, ILoggerFactory } from "../logging";

import { BaseTask } from "./bases/basetask";

export class LambdaTask<
  TLog extends ILog,
  TLogger extends ILogger<TLog>,
  TLoggerFactory extends ILoggerFactory<TLog, TLogger>
> extends BaseTask<TLog, TLogger, TLoggerFactory> {
  private readonly _lambda: () => Promise<boolean>;

  public constructor(lambda: () => Promise<boolean>, taskName: string, loggerFactory: TLoggerFactory) {
    super(taskName, loggerFactory);

    this._lambda = lambda;
  }

  protected ExecuteInternalAsync(): Promise<boolean> {
    return this._lambda();
  }
}
