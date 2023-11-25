import ExcelIcon from '../../../assets/svg/excel.svg';
import React from 'react';
import { Button } from '@nextui-org/react';
import * as ExcelJS from 'exceljs';

export default function ExcelButton({ data }) {
  const handleDownloadExcel = async () => {
    const submissionsByIndex = [];
    data.forEach((student) => {
      student.submissions &&
        student.submissions.forEach((submission, index) => {
          if (!submissionsByIndex[index]) {
            submissionsByIndex[index] = [];
          }
          submissionsByIndex[index].push({
            name: student.name,
            lastName: student.lastName,
            region: student.region,
            group: student.group,
            pass: submission.trials[0].pass,
            review: submission.trials[0].review ? 'V' : '',
          });
        });
    });

    const workbook = new ExcelJS.Workbook();

    submissionsByIndex.forEach((submissions, index) => {
      const sheetName = `Task ${index + 1}`; // Naming the sheets
      const worksheet = workbook.addWorksheet(sheetName);
      worksheet.addRow(['Name', 'Last Name', 'Region', 'Group', 'Pass', 'Review']);
      submissions.forEach((student) => {
        worksheet.addRow([student.name, student.lastName, student.region, student.group, student.pass, student.review]);
      });
    });

    const blob = await workbook.xlsx.writeBuffer();

    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${data[0].group}.xlsx`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <Button
      isIconOnly
      variant="faded"
      onClick={handleDownloadExcel} // Call the download function
      radius="full"
      style={{ marginLeft: '-30px' }}
    >
      <img src={ExcelIcon} alt="ExcelIcon" />
    </Button>
  );
}
