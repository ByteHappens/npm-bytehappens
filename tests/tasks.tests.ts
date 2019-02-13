import "mocha";
import { expect } from "chai";

import * as logging from "../src/logging";
import * as task from "../src/task";

function GetTestLoggerFactory(): logging.DmpLoggerFactory<logging.ILog, logging.DmpLogger<logging.ILog>> {
  return new logging.DmpLoggerFactory();
}

class TestTask<
  TLog extends logging.ILog,
  TLogger extends logging.DmpLogger<TLog>,
  TLoggerFactory extends logging.DmpLoggerFactory<TLog, TLogger>
> extends task.BaseTask<TLog, TLogger, TLoggerFactory> {
  private readonly _expectedResult: boolean;

  constructor(expectedResult: boolean) {
    super("TestTask", <TLoggerFactory>GetTestLoggerFactory());

    this._expectedResult = expectedResult;
  }

  protected async ExecuteInternalAsync(): Promise<boolean> {
    return this._expectedResult;
  }
}

describe("Basic Task execution", () => {
  it("Should run", async () => {
    let sut: task.ITask = new TestTask(true);

    await sut.RunAsync();
    await sut.GetResultAsync();
  });

  it("Should return true", async () => {
    let expectedResult: boolean = true;

    let sut: task.ITask = new TestTask(expectedResult);

    await sut.RunAsync();
    let result: boolean = await sut.GetResultAsync();

    expect(result).to.equal(expectedResult);
  });

  it("Should return false", async () => {
    let expectedResult: boolean = false;

    let sut: task.ITask = new TestTask(expectedResult);

    await sut.RunAsync();
    let result: boolean = await sut.GetResultAsync();

    expect(result).to.equal(expectedResult);
  });
});
