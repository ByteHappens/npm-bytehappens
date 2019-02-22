import "mocha";
import { expect } from "chai";

import { tasks } from "../lib";

import { StaticResultTask } from "./common/staticresulttask";

describe("Task Execution", () => {
  it("Should run", async () => {
    let sut: tasks.ITask = new StaticResultTask(true);

    await sut.RunAsync();
    await sut.GetResultAsync();
  });

  it("Should return true", async () => {
    let expectedResult: boolean = true;

    let sut: tasks.ITask = new StaticResultTask(expectedResult);

    await sut.RunAsync();
    let result: boolean = await sut.GetResultAsync();

    expect(result).to.equal(expectedResult);
  });

  it("Should return false", async () => {
    let expectedResult: boolean = false;

    let sut: tasks.ITask = new StaticResultTask(expectedResult);

    await sut.RunAsync();
    let result: boolean = await sut.GetResultAsync();

    expect(result).to.equal(expectedResult);
  });
});
