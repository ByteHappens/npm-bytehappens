import { ILog } from "./interfaces/ilog";
import { ILoggerFactory } from "./interfaces/iloggerfactory";

import { DmpLogger } from "./dmplogger";

export class DmpLoggerFactory<TLog extends ILog, TLogger extends DmpLogger<TLog>> implements ILoggerFactory<TLog, TLogger> {
  public async CreateLoggerAsync(): Promise<TLogger> {
    let response: TLogger = <TLogger>new DmpLogger<TLog>();
    return response;
  }
}
