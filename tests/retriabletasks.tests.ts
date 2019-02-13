import "mocha";
import { expect } from "chai";

import * as task from "../src/task";
import { GetTestLoggerFactory } from "./common/gettestloggerfactory";
import { ExpectedResultTask } from "./common/expectedresulttask";
    
let attempts: number = 10;
let delayInMs: number = 1000;
let testTimout: number = (attempts + 1) * delayInMs

describe("Retriable Task Execution", () => {
  it("Should run", async () => {
    let toRetry: task.ITask = new ExpectedResultTask(true);
    let sut: task.ITask = new task.RetriableTask(toRetry, attempts, delayInMs, "RetriableTask", GetTestLoggerFactory());

    await sut.RunAsync();
    await sut.GetResultAsync();
  }).timeout(testTimout);

  it("Should return true", async () => {
    let expectedResult: boolean = true;

    let toRetry: task.ITask = new ExpectedResultTask(expectedResult);
    let sut: task.ITask = new task.RetriableTask(toRetry, attempts, delayInMs, "RetriableTask", GetTestLoggerFactory());

    await sut.RunAsync();
    let result: boolean = await sut.GetResultAsync();

    expect(result).to.equal(expectedResult);
  }).timeout(testTimout);

  it("Should return false", async () => {
    let expectedResult: boolean = false;

    let toRetry: task.ITask = new ExpectedResultTask(expectedResult);
    let sut: task.ITask = new task.RetriableTask(toRetry, attempts, delayInMs, "RetriableTask", GetTestLoggerFactory());

    await sut.RunAsync();
    let result: boolean = await sut.GetResultAsync();

    expect(result).to.equal(expectedResult);
  }).timeout(testTimout);
});
