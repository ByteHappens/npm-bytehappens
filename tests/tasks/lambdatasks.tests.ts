import "mocha";
import { expect } from "chai";

import { runtimes } from "../../lib";

import { GetTestLoggerFactory } from "../common/gettestloggerfactory";

describe("Lambda Task Execution", () => {
  it("Should run", async () => {
    let sut: runtimes.tasks.ITask = new runtimes.tasks.LambdaTask(() => true, "LambdaTask", GetTestLoggerFactory());

    await sut.RunAsync();
    await sut.GetResultAsync();
  });

  it("Should return true", async () => {
    let expectedResult: boolean = true;

    let sut: runtimes.tasks.ITask = new runtimes.tasks.LambdaTask(() => expectedResult, "LambdaTask", GetTestLoggerFactory());

    await sut.RunAsync();
    let result: boolean = await sut.GetResultAsync();

    expect(result).to.equal(expectedResult);
  });

  it("Should return false", async () => {
    let expectedResult: boolean = false;

    let sut: runtimes.tasks.ITask = new runtimes.tasks.LambdaTask(() => expectedResult, "LambdaTask", GetTestLoggerFactory());

    await sut.RunAsync();
    let result: boolean = await sut.GetResultAsync();

    expect(result).to.equal(expectedResult);
  });
});
