import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react';
import DonutChart from './Chart'; // adjust the import path to where your DonutChart component is located
import VersionsButton from './VersionsButton';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

export default function IntTestsTable() {
  return (
    <Table
      aria-label="Example table with client side sorting"
      dir="rtl"
      classNames={{
        table: 'min-h-[400px]',
      }}
    >
      <TableHeader>
        <TableColumn>שם</TableColumn>
        <TableColumn>תאריך</TableColumn>
        <TableColumn>טסטים</TableColumn>
        <TableColumn>גרסאות</TableColumn>
        <TableColumn>משוב</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map((student) => {
          const selectedVersion = getSelectedVersion(student.versions);
          const percentage =
            selectedVersion.tests !== 'N/A'
              ? (parseInt(selectedVersion.tests.split('/')[0]) / parseInt(selectedVersion.tests.split('/')[1])) * 100
              : 0;
          return (
            <TableRow key={student.name}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{selectedVersion.date}</TableCell>
              <TableCell>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {selectedVersion.tests} <DonutChart percentage={percentage} size={50} />
                </div>
              </TableCell>
              <TableCell>{student.versions.length > 1 && <VersionsButton versions={student.versions} />}</TableCell>
              <TableCell>
                {student.versions.length > 0 &&
                  (selectedVersion.review ? (
                    <CheckCircleRoundedIcon sx={{ color: '#005395' }} />
                  ) : (
                    <Button
                      radius="full"
                      isIconOnly
                      variant="faded"
                      onClick={() => window.open(`/review?ver=${selectedVersion.id}`, '_blank')}
                    >
                      <CreateRoundedIcon />
                    </Button>
                  ))}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

const getSelectedVersion = (versions) => {
  if (versions.length === 0) {
    return { date: 'N/A', tests: 'N/A' };
  }

  const versionWithReview = versions.find((version) => version.review);
  if (versionWithReview) {
    return versionWithReview;
  }

  const bestTestScore = Math.max(...versions.map((version) => parseInt(version.tests.split('/')[0])));
  const versionsWithBestTestScore = versions.filter(
    (version) => parseInt(version.tests.split('/')[0]) === bestTestScore,
  );
  if (versionsWithBestTestScore.length === 1) {
    return versionsWithBestTestScore[0];
  }

  const latestDate = Math.max(...versionsWithBestTestScore.map((version) => new Date(version.date).getTime()));
  return versionsWithBestTestScore.find((version) => new Date(version.date).getTime() === latestDate);
};

const data = [
  {
    name: 'יוסי אבולעפיה',
    versions: [
      { id: 1, date: '23/10/22', tests: '4/5', code: "print('hi')", review: 'you have to blala' },
      { id: 2, date: '22/10/22', tests: '3/5', code: "print('hhi')" },
      { id: 3, date: '22/10/22', tests: '1/5', code: "print('butr')" },
    ],
  },
  {
    name: 'דני סנדרסון',
    versions: [
      { id: 4, date: '23/10/22', tests: '2/5', code: "print('hello')", review: 'you need to blala' },
      { id: 5, date: '22/10/22', tests: '3/5', code: "print('world')" },
      { id: 6, date: '21/10/22', tests: '1/5', code: "print('!')" },
    ],
  },
  {
    name: 'רוני כהן',
    versions: [{ id: 8, date: '24/10/22', tests: '1/5', code: "print('hi')" }],
  },
  {
    name: 'אלון מזרחי',
    versions: [],
  },
];
