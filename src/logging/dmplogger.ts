import { ILog } from "./interfaces/ilog";
import { ILogger } from "./interfaces/ilogger";

export class DmpLogger<TLog extends ILog> implements ILogger<TLog> {
  Log(log: TLog): void {
    // SCK: Suppressing
  }
}
