import { logging, runtimes } from "../../../lib";

import { GetTestLoggerFactory } from "../../common/gettestloggerfactory";

export class StaticResultTask<
  TLog extends logging.ILog,
  TLogger extends logging.DmpLogger<TLog>,
  TLoggerFactory extends logging.DmpLoggerFactory<TLog, TLogger>
> extends runtimes.tasks.BaseTask<TLog, TLogger, TLoggerFactory> {
  private readonly _staticResult: boolean;

  public constructor(staticResult: boolean) {
    super(`StaticResultTask-${staticResult}`, <TLoggerFactory>GetTestLoggerFactory());

    this._staticResult = staticResult;
  }

  protected async ExecuteInternalAsync(): Promise<boolean> {
    return this._staticResult;
  }
}
