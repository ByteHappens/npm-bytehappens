import { ILog, ILogger, ILoggerFactory } from "../logging";

import { ITask } from "./interfaces/itask";
import { IRetriableTask } from "./interfaces/iretriabletask";
import { BaseTask } from "./bases/basetask";

export class RetriableTask<
  TLog extends ILog,
  TLogger extends ILogger<TLog>,
  TLoggerFactory extends ILoggerFactory<TLog, TLogger>,
  TExecute extends ITask
> extends BaseTask<TLog, TLogger, TLoggerFactory> implements IRetriableTask {
  private readonly _onExecute: TExecute;
  private readonly _maxAttempts: number;
  private readonly _delayInMs: number;

  private __currentAttempts: number;

  public constructor(
    onExecute: TExecute,
    maxAttempts: number,
    delayInMs: number,
    taskName: string,
    loggerFactory: TLoggerFactory
  ) {
    super(taskName, loggerFactory);

    this._onExecute = onExecute;
    this._maxAttempts = maxAttempts;
    this._delayInMs = delayInMs;
  }

  protected async ExecuteInternalAsync(): Promise<boolean> {
    let response: boolean = false;

    this.__currentAttempts = 0;
    let shouldRetry: boolean = false;
    do {
      try {
        await this._onExecute.RunAsync();
        response = await this._onExecute.GetResultAsync();
      } catch (error) {
        this._logger.Log(<TLog>{ level: "error", message: "Unexpected error when running task", meta: { error } });
      }

      this.__currentAttempts++;
      shouldRetry = !response && this.__currentAttempts < this._maxAttempts;

      if (shouldRetry) {
        this._logger.Log(<TLog>{
          level: "error",
          message: "Retrying task after delay",
          meta: {
            currentAttempts: this.__currentAttempts,
            maxAttempts: this._maxAttempts,
            delayInMs: this._delayInMs
          }
        });

        await new Promise((resolve, reject) => {
          setTimeout(async function() {
            resolve();
          }, this._delayInMs);
        });
      }
    } while (shouldRetry);

    return response;
  }

  public GetCurrentAttempts(): number {
    return this.__currentAttempts;
  }
}
