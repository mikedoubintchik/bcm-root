import * as BCMLegacy from "@bcm/bcm-legacy";

import { registerApplication, start } from "single-spa";

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

registerApplication({
  name: "@bcm/bcm-legacy",
  app: BCMLegacy,
  activeWhen: "/settings",
});

start();
