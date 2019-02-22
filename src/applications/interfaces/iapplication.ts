import { IRuntime } from "../../runtimes";

export interface IApplication extends IRuntime {
  StopAsync(): Promise<boolean>;
}
