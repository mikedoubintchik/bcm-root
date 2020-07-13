import * as BCMLegacy from '@bcm/bcm-legacy';

import { registerApplication, start } from "single-spa";

if (process.env.activeDev === "legacy") {
  console.log("Active Dev: legacy");

  registerApplication({
    name: "@bcm/bcm-legacy",
    app: () => System.import("@bcm/bcm-legacy"),
    activeWhen: "/settings",
  });

  registerApplication({
    name: "@polyglot-mf/navbar",
    app: () => System.import("@polyglot-mf/navbar"),
    activeWhen: "/",
  });

  registerApplication({
    name: "@polyglot-mf/clients",
    app: () => System.import("@polyglot-mf/clients"),
    activeWhen: "/clients",
  });
} else if (process.env.activeDev === "react") {
  console.log("Active Dev: react");

  registerApplication({
    name: "@bcm/bcm-legacy",
    app: require("@bcm/bcm-legacy"),
    activeWhen: "/settings",
  });

  registerApplication({
    name: "@polyglot-mf/navbar",
    app: () => System.import("@polyglot-mf/navbar"),
    activeWhen: "/",
  });

  registerApplication({
    name: "@polyglot-mf/clients",
    app: () => System.import("@polyglot-mf/clients"),
    activeWhen: "/clients",
  });
} else {
  console.log("Active Dev: prod");

  registerApplication({
    name: "@bcm/bcm-legacy",
    // app: require("@bcm/bcm-legacy"),
    app: BCMLegacy,
    activeWhen: "/settings",
  });

  registerApplication({
    name: "@polyglot-mf/navbar",
    app: () => System.import("@polyglot-mf/navbar"),
    activeWhen: "/",
  });

  registerApplication({
    name: "@polyglot-mf/clients",
    app: () => System.import("@polyglot-mf/clients"),
    activeWhen: "/clients",
  });
}

start();
