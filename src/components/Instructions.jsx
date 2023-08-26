import * as React from 'react';
import { Chip } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";

export default function Instructions() {
  return (
    <div style={{ width: "100%", textAlign: "right", direction: "rtl" }}>
      <Accordion dir="rtl" variant="splitted" selectionMode="multiple">
        <AccordionItem title="מה צריך לדעת?">
          <p style={{ marginBottom: "10px" }}>נושאים עיקריים: </p>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <Chip>משתנים</Chip>
            <Chip>ביטויים בוליאניים</Chip>
            <Chip>תנאים</Chip>
          </div>
        </AccordionItem>

        <AccordionItem title="תיאור המשימה">
          <p>
            בבניין רב קומות יש שתי מעליות – A וB המעליות נמצאות בקומות שונות.
            <br />
            כשאליס תזמין מעלית, תגיע אליה המעלית הקרובה ביותר לקומה שנמצאת בה
            עכשיו.
            <br />
            קלטו מהמשתמש את הקומה של שבה המעלית A נמצאת עכשיו, ואת הקומה שבה B
            נמצאת.
            <br />
            לאחר מכן קלטו את הקומה בה אליס נמצאת. הדפיסו את שם המעלית הקרובה
            ביותר לאליס - A או B. אם שתיהן קרובות באותה המידה הדפיסו אחת מהן
            (שתי הבחירות נכונות)
          </p>
        </AccordionItem>

        <AccordionItem title="דוגמאות הרצה">
          <p style={{ textAlign: "right" }}>
            דג גדול שט לו בים ובלב שלנו את תמיד תהיי פרח השכונות
            <br />
            דוגמה לקוד:
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
