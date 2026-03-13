import { sanityFetch } from "@/sanity/lib/live";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Menus from "@/components/menus";
import Footer from "@/components/footer";
import ThemeController from "@/components/ThemeController";

const PAGE_QUERY = `{
  "header": *[_type == "header"][0],
  "hero": *[_type == "hero"][0],
  "menus": *[_type == "menus"][0].menus[]{ sheetName, title, mobileTitle, imageOne, imageTwo, imageThree, warning, cssClass },
  "footer": *[_type == "footer"][0]{ title, pressLinks, instagramLink, careersLink, description, copyright },
  "siteInfo": *[_type == "header"][0]{ hours, phone, address, handle, logo }
}`;

export const revalidate = 300;

export default async function Home() {
  const { data } = await sanityFetch({ query: PAGE_QUERY });
  const menus = data?.menus ?? [];

  return (
    <>
      <ThemeController />
      <Header data={data?.header} />
      <main>
        <Hero data={data?.hero} reservation={data?.header?.reservation} />
        <Menus menus={menus} />
      </main>
      <Footer data={data?.footer} siteInfo={data?.siteInfo} />
    </>
  );
}
