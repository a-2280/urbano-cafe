import { getMenuItems } from "@/lib/sheets";
import Menu from "@/components/menu";

export default async function Menus({ menus }) {
  const menuItems = await Promise.all(menus.map((m) => getMenuItems(m.sheetName)));

  return menus.map((menu, i) => (
    <Menu key={menu.sheetName} title={menu.title} className={menu.cssClass} items={menuItems[i]} images={[menu.imageOne, menu.imageTwo, menu.imageThree].filter(Boolean)} warning={menu.warning} />
  ));
}
