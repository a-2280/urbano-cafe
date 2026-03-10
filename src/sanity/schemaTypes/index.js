import { header } from "./_header";
import { hero } from "./_hero";
import { menus } from "./_menus";
import { footer } from "./_footer";

export const singletonTypes = new Set(["header", "hero", "menus", "footer"]);

export const schema = {
  types: [header, hero, menus, footer],
};