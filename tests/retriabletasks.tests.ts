import "mocha";
import { expect } from "chai";

import * as task from "../src/task";
import { GetTestLoggerFactory } from "./common/gettestloggerfactory";
import { StaticResultTask } from "./common/staticresulttask";
import { LambdaTask } from "./common/lambdaresulttask";

let attempts: number = 10;
let delayInMs: number = 1000;
let testTimout: number = (attempts + 1) * delayInMs;

describe("Retriable Task Execution", () => {
  it("Should run", async () => {
    let toRetry: task.ITask = new StaticResultTask(true);
    let sut: task.IRetriableTask = new task.RetriableTask(
      toRetry,
      attempts,
      delayInMs,
      "RetriableTask",
      GetTestLoggerFactory()
    );

    await sut.RunAsync();
    await sut.GetResultAsync();
  }).timeout(testTimout);

  it("Should return true", async () => {
    let expectedResult: boolean = true;

    let toRetry: task.ITask = new StaticResultTask(expectedResult);
    let sut: task.IRetriableTask = new task.RetriableTask(
      toRetry,
      attempts,
      delayInMs,
      "RetriableTask",
      GetTestLoggerFactory()
    );

    await sut.RunAsync();
    let result: boolean = await sut.GetResultAsync();

    expect(result).to.equal(expectedResult);
  }).timeout(testTimout);

  it("Should return false", async () => {
    let expectedResult: boolean = false;

    let toRetry: task.ITask = new StaticResultTask(expectedResult);
    let sut: task.IRetriableTask = new task.RetriableTask(
      toRetry,
      attempts,
      delayInMs,
      "RetriableTask",
      GetTestLoggerFactory()
    );

    await sut.RunAsync();
    let result: boolean = await sut.GetResultAsync();

    expect(result).to.equal(expectedResult);
  }).timeout(testTimout);

  it("Should run 6 times", async () => {
    let targetAttempts: number = 6;
    let attemptsTracker: number = 0;

    let toRetry: task.ITask = new LambdaTask(() => ++attemptsTracker === targetAttempts);
    let sut: task.IRetriableTask = new task.RetriableTask(
      toRetry,
      attempts,
      delayInMs,
      "RetriableTask",
      GetTestLoggerFactory()
    );

    await sut.RunAsync();
    let result: boolean = await sut.GetResultAsync();

    expect(result).to.equal(true);
    expect(attemptsTracker).to.equal(targetAttempts);

    let currentAttempts: number = sut.GetCurrentAttempts();
    expect(currentAttempts).to.equal(targetAttempts);
  }).timeout(testTimout);
});
