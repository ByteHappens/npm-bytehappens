import { IRuntime } from "../../runtime";

export interface ITask extends IRuntime {
  GetResultAsync(): Promise<boolean>;
}
