import * as logging from "../../src/logging";
import * as task from "../../src/task";

import { GetTestLoggerFactory } from "./gettestloggerfactory";

export class StaticResultTask<
  TLog extends logging.ILog,
  TLogger extends logging.DmpLogger<TLog>,
  TLoggerFactory extends logging.DmpLoggerFactory<TLog, TLogger>
> extends task.BaseTask<TLog, TLogger, TLoggerFactory> {
  private readonly _staticResult: boolean;

  constructor(staticResult: boolean) {
    super(`StaticResultTask-${staticResult}`, <TLoggerFactory>GetTestLoggerFactory());

    this._staticResult = staticResult;
  }

  protected async ExecuteInternalAsync(): Promise<boolean> {
    return this._staticResult;
  }
}
