import * as logging from "../../src/logging";
import * as task from "../../src/task";

import { GetTestLoggerFactory } from "./gettestloggerfactory";

export class ExpectedResultTask<
  TLog extends logging.ILog,
  TLogger extends logging.DmpLogger<TLog>,
  TLoggerFactory extends logging.DmpLoggerFactory<TLog, TLogger>
> extends task.BaseTask<TLog, TLogger, TLoggerFactory> {
  private readonly _expectedResult: boolean;

  constructor(expectedResult: boolean) {
    super(`ExpectedResultTask-${expectedResult}`, <TLoggerFactory>GetTestLoggerFactory());

    this._expectedResult = expectedResult;
  }

  protected async ExecuteInternalAsync(): Promise<boolean> {
    return this._expectedResult;
  }
}
