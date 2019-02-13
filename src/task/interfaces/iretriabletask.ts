import { ITask } from "./itask";

export interface IRetriableTask extends ITask {
  GetCurrentAttempts(): number;
}
