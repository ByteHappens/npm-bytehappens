import { IRuntime } from "../../runtimes";

export interface ITask extends IRuntime {
  GetResultAsync(): Promise<boolean>;
}
