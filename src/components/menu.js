import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

export default function Menu({
  title,
  mobileTitle,
  items,
  className,
  images = [],
  warning,
}) {
  const sections = groupBySection(items);

  return (
    <section className={`menu p25 ${className ? `${className} theme-${className}` : ""}`} data-theme={className}>
      <div className="title ratio-16-3 pos-rel m-hide">
        <Image
          className="bg-image contain"
          src={urlFor(title).url()}
          alt=""
          width={1000}
          height={200}
        />
      </div>
      {mobileTitle && (
        <div className="m-title m-show">
          <Image
            src={urlFor(mobileTitle).url()}
            alt=""
            width={370}
            height={250}
          />
        </div>
      )}
      {sections.map(({ section, items: sectionItems }, i) => (
        <div key={section}>
          <div className="menu-section flex flex-col align-center">
            {section && (
              <h3 className="menu-section-title f-title">{section}</h3>
            )}
            <ul className="menu-items flex flex-col">
              {sectionItems.map((item, j) => (
                <li key={j} className="menu-item flex space-between align-end">
                  <p className="editorial-new f-48">
                    {item.name}
                    <span>{item.description && ` / ${item.description}`}</span>
                  </p>
                  <span className="menu-item-rule" />
                  {item.price && <p className="f-48">{item.price}</p>}
                </li>
              ))}
            </ul>
          </div>
          {images[i] && (
            <div className="menu-section-image">
              <Image
                src={urlFor(images[i]).url()}
                alt=""
                width={600}
                height={400}
              />
            </div>
          )}
        </div>
      ))}
      <div className="warning flex justify-center">
        {warning && <p className="text text-center">{warning}</p>}
      </div>
    </section>
  );
}

function groupBySection(items) {
  const result = [];
  let current = null;

  for (const item of items) {
    if (!current || (item.section && item.section !== current.section)) {
      current = { section: item.section, items: [] };
      result.push(current);
    }
    current.items.push(item);
  }

  return result;
}
