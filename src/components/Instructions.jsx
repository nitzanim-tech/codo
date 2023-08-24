import * as React from 'react';
import { Chip } from "@nextui-org/react";

import { Accordion, AccordionItem } from "@nextui-org/react";

export default function BasicAccordion() {
  return (
    <div>
      <Accordion dir="rtl">
        <AccordionItem title="מה צריך לדעת?">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </p>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <Chip>משתנים</Chip>
            <Chip>תנאים</Chip>
            <Chip>לולאות</Chip>
          </div>
        </AccordionItem>

        <AccordionItem title="תיאור המשימה">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </p>
        </AccordionItem>

        <AccordionItem title="דוגמאות הרצה">
          <p style={{ direction: "rtl", textAlign: "right" }}>
            דג גדול שט לו בים ובלב שלנו את תמיד תהיי פרח השכונות
            <br />
            דוגמה לקוד:{" "}
            <code>
              print(a)
              <br />
            </code>
          </p>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
