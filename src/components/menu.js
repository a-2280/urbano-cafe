import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

export default function Menu({ title, items, className }) {
  const sections = groupBySection(items);

  return (
    <section className={`menu p30 ${className ? `${className}` : ''}`}>
      <Image className="title" src={urlFor(title).url()} alt="" width={1000} height={200} />
      {sections.map(({ section, items: sectionItems }) => (
        <div key={section} className="menu-section">
          {section && <h3 className="menu-section-title">{section}</h3>}
          <ul className="menu-items">
            {sectionItems.map((item, i) => (
              <li key={i} className="menu-item flex space-between">
                <div>
                  <p className="bold">{item.name}</p>
                  {item.description && <p>{item.description}</p>}
                </div>
                {item.price && <p className="bold">{item.price}</p>}
              </li>
            ))}
          </ul>
        </div>
      ))}
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
