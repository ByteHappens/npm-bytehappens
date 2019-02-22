import * as internalLogging from "./logging";
import * as internalRuntimes from "./runtimes";
import * as internalApplications from "./applications";
import * as internalTasks from "./tasks";

export import logging = internalLogging;

export namespace runtimes {
  //  SCK: Not too happy about this, will change when i figure how to put it at root
  export import common = internalRuntimes;

  export import applications = internalApplications;
  export import tasks = internalTasks;
}
