import "mocha";
import { expect } from "chai";

import { tasks } from "../lib";

import { GetTestLoggerFactory } from "./common/gettestloggerfactory";
import { StaticResultTask } from "./common/staticresulttask";

describe("Task Chain Execution", () => {
  it("Should run", async () => {
    let onExecute: tasks.ITask = new StaticResultTask(true);
    let onSuccess: tasks.ITask = new StaticResultTask(true);
    let onFailure: tasks.ITask = new StaticResultTask(false);

    let sut: tasks.ITask = new tasks.TaskChain(onExecute, onSuccess, onFailure, "TaskChain", GetTestLoggerFactory());

    await sut.RunAsync();
    await sut.GetResultAsync();
  });

  it("Should return true", async () => {
    let expectedResult: boolean = true;

    let onExecute = new StaticResultTask(expectedResult);
    let onSuccess = new StaticResultTask(true);
    let onFailure = new StaticResultTask(false);

    let sut: tasks.ITask = new tasks.TaskChain(onExecute, onSuccess, onFailure, "TaskChain", GetTestLoggerFactory());

    await sut.RunAsync();
    let result: boolean = await sut.GetResultAsync();

    expect(result).to.equal(expectedResult);
  });

  it("Should return false", async () => {
    let expectedResult: boolean = false;

    let onExecute = new StaticResultTask(expectedResult);
    let onSuccess = new StaticResultTask(true);
    let onFailure = new StaticResultTask(false);

    let sut: tasks.ITask = new tasks.TaskChain(onExecute, onSuccess, onFailure, "TaskChain", GetTestLoggerFactory());

    await sut.RunAsync();
    let result: boolean = await sut.GetResultAsync();

    expect(result).to.equal(expectedResult);
  });
});
