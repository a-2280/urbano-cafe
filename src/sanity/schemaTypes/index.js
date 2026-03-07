import { header } from "./_header";
import { hero } from "./_hero";
import { menus } from "./_menus";

export const singletonTypes = new Set(["header", "hero", "menus"]);

export const schema = {
  types: [header, hero, menus],
};