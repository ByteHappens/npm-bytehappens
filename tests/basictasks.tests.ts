import "mocha";
import { expect } from "chai";

import * as task from "../src/task";
import { StaticResultTask } from "./common/staticresulttask";

describe("Basic Task Execution", () => {
  it("Should run", async () => {
    let sut: task.ITask = new StaticResultTask(true);

    await sut.RunAsync();
    await sut.GetResultAsync();
  });

  it("Should return true", async () => {
    let expectedResult: boolean = true;

    let sut: task.ITask = new StaticResultTask(expectedResult);

    await sut.RunAsync();
    let result: boolean = await sut.GetResultAsync();

    expect(result).to.equal(expectedResult);
  });

  it("Should return false", async () => {
    let expectedResult: boolean = false;

    let sut: task.ITask = new StaticResultTask(expectedResult);

    await sut.RunAsync();
    let result: boolean = await sut.GetResultAsync();

    expect(result).to.equal(expectedResult);
  });
});
