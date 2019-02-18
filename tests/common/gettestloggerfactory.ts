import { logging } from "../../lib";

export function GetTestLoggerFactory(): logging.DmpLoggerFactory<logging.ILog, logging.DmpLogger<logging.ILog>> {
  return new logging.DmpLoggerFactory();
}
