import { IRuntime } from "../../runtime";

export interface IApplication extends IRuntime {
  StopAsync(): Promise<boolean>;
}
