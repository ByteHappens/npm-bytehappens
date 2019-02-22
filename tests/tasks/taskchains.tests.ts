import "mocha";
import { expect } from "chai";

import { runtimes } from "../../lib";

import { GetTestLoggerFactory } from "../common/gettestloggerfactory";
import { StaticResultTask } from "./common/staticresulttask";

describe("Task Chain Execution", () => {
  it("Should run", async () => {
    let onExecute: runtimes.tasks.ITask = new StaticResultTask(true);
    let onSuccess: runtimes.tasks.ITask = new StaticResultTask(true);
    let onFailure: runtimes.tasks.ITask = new StaticResultTask(false);

    let sut: runtimes.tasks.ITask = new runtimes.tasks.TaskChain(
      onExecute,
      onSuccess,
      onFailure,
      "TaskChain",
      GetTestLoggerFactory()
    );

    await sut.RunAsync();
    await sut.GetResultAsync();
  });

  it("Should return true", async () => {
    let expectedResult: boolean = true;

    let onExecute = new StaticResultTask(expectedResult);
    let onSuccess = new StaticResultTask(true);
    let onFailure = new StaticResultTask(false);

    let sut: runtimes.tasks.ITask = new runtimes.tasks.TaskChain(
      onExecute,
      onSuccess,
      onFailure,
      "TaskChain",
      GetTestLoggerFactory()
    );

    await sut.RunAsync();
    let result: boolean = await sut.GetResultAsync();

    expect(result).to.equal(expectedResult);
  });

  it("Should return false", async () => {
    let expectedResult: boolean = false;

    let onExecute = new StaticResultTask(expectedResult);
    let onSuccess = new StaticResultTask(true);
    let onFailure = new StaticResultTask(false);

    let sut: runtimes.tasks.ITask = new runtimes.tasks.TaskChain(
      onExecute,
      onSuccess,
      onFailure,
      "TaskChain",
      GetTestLoggerFactory()
    );

    await sut.RunAsync();
    let result: boolean = await sut.GetResultAsync();

    expect(result).to.equal(expectedResult);
  });
});
