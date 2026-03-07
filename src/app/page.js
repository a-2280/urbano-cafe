import { sanityFetch } from "@/sanity/lib/live";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Menus from "@/components/menus";

const PAGE_QUERY = `{
  "header": *[_type == "header"][0],
  "hero": *[_type == "hero"][0],
  "menus": *[_type == "menus"][0].menus[]{ sheetName, title, imageOne, imageTwo, imageThree, warning, cssClass }
}`;

export const revalidate = 300;

export default async function Home() {
  const { data } = await sanityFetch({ query: PAGE_QUERY });
  const menus = data?.menus ?? [];

  return (
    <main>
      <Header data={data?.header} />
      <Hero data={data?.hero} />
      <Menus menus={menus} />
    </main>
  );
}
