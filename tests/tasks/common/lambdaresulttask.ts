import { logging, runtimes } from "../../../lib";

import { GetTestLoggerFactory } from "../../common/gettestloggerfactory";

export class LambdaTask<
  TLog extends logging.ILog,
  TLogger extends logging.DmpLogger<TLog>,
  TLoggerFactory extends logging.DmpLoggerFactory<TLog, TLogger>
> extends runtimes.tasks.BaseTask<TLog, TLogger, TLoggerFactory> {
  private readonly _lambda: () => boolean;

  constructor(lambda: () => boolean) {
    super("LambdaResultTask", <TLoggerFactory>GetTestLoggerFactory());

    this._lambda = lambda;
  }

  protected async ExecuteInternalAsync(): Promise<boolean> {
    return this._lambda();
  }
}
