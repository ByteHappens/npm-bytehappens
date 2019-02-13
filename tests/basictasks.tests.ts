import "mocha";
import { expect } from "chai";

import * as task from "../src/task";
import { ExpectedResultTask } from "./common/expectedresulttask";

describe("Basic Task Execution", () => {
  it("Should run", async () => {
    let sut: task.ITask = new ExpectedResultTask(true);

    await sut.RunAsync();
    await sut.GetResultAsync();
  });

  it("Should return true", async () => {
    let expectedResult: boolean = true;

    let sut: task.ITask = new ExpectedResultTask(expectedResult);

    await sut.RunAsync();
    let result: boolean = await sut.GetResultAsync();

    expect(result).to.equal(expectedResult);
  });

  it("Should return false", async () => {
    let expectedResult: boolean = false;

    let sut: task.ITask = new ExpectedResultTask(expectedResult);

    await sut.RunAsync();
    let result: boolean = await sut.GetResultAsync();

    expect(result).to.equal(expectedResult);
  });
});
