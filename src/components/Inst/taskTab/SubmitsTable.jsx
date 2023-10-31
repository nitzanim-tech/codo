import React, { useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react';
import DonutChart from '../Chart';
import VersionsButton from './VersionsButton';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

export default function SubmitsTable({ data }) {
  const [sortOrder, setSortOrder] = useState('name');

  const handleSortByName = () => {
    setSortOrder('name');
  };

  const handleSortByTestsSuccess = () => {
    setSortOrder('testsSuccess');
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortOrder === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === 'testsSuccess') {
      const aTestPercentage =
        a.versions.length > 0 && a.versions[0].tests !== ''
          ? (parseInt(a.versions[0].tests.split('/')[0]) / parseInt(a.versions[0].tests.split('/')[1])) * 100
          : 0;
      const bTestPercentage =
        b.versions.length > 0 && b.versions[0].tests !== ''
          ? (parseInt(b.versions[0].tests.split('/')[0]) / parseInt(b.versions[0].tests.split('/')[1])) * 100
          : 0;
      return bTestPercentage - aTestPercentage;
    } else {
      return 0;
    }
  });

  return (
    <>
      <Button onClick={handleSortByName}>מיין לפי שם</Button>
      <Button onClick={handleSortByTestsSuccess}>מיין לפי הצלחת טסטים</Button>

      <Table
        aria-label="Example table with client side sorting"
        classNames={{
          table: 'min-h-[400px]',
        }}
      >
        <TableHeader>
          <TableColumn style={{ textAlign: 'center' }}>משוב</TableColumn>
          <TableColumn style={{ textAlign: 'center' }}>גרסאות</TableColumn>
          <TableColumn style={{ textAlign: 'center' }}>טסטים</TableColumn>
          <TableColumn style={{ textAlign: 'center' }}>תאריך</TableColumn>
          <TableColumn style={{ textAlign: 'center' }}>שם</TableColumn>
        </TableHeader>
        <TableBody>
          {sortedData.map((student, index) => {
            const selectedVersion = getSelectedVersion(student.versions);
            const percentage =
              selectedVersion.tests !== ''
                ? (parseInt(selectedVersion.tests.split('/')[0]) / parseInt(selectedVersion.tests.split('/')[1])) * 100
                : 0;
            return (
              <TableRow key={`${student.name}-${index}`}>
                <TableCell>
                  {student.versions.length > 0 &&
                    (selectedVersion.review ? (
                      <CheckCircleRoundedIcon sx={{ color: '#005395' }} />
                    ) : (
                      <Button
                        radius="full"
                        isIconOnly
                        variant="faded"
                        onClick={() => {
                          const newWindow = window.open('/review', '_blank');
                          newWindow.addEventListener('load', () => {
                            const versionToCheck = {
                              ... selectedVersion,
                              name: student.name,
                            };

                            newWindow.postMessage(versionToCheck);
                          });
                        }}
                      >
                        <CreateRoundedIcon />
                      </Button>
                    ))}
                </TableCell>
                <TableCell>{student.versions.length > 1 && <VersionsButton versions={student.versions} />}</TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DonutChart ratio={selectedVersion.tests} percentage={percentage} size={50} />
                  </div>
                </TableCell>
                <TableCell>{formatDate(selectedVersion.date)}</TableCell>
                <TableCell>{student.name}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

const getSelectedVersion = (versions) => {
  if (versions.length === 0) {
    return { date: '', tests: '' };
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

const formatDate = (dateString) => {
  const dateObj = new Date(dateString);
  return `${dateObj.getUTCDate().toString().padStart(2, '0')}.${(dateObj.getUTCMonth() + 1)
    .toString()
    .padStart(2, '0')}.${dateObj.getUTCFullYear()} | ${dateObj.getUTCHours().toString().padStart(2, '0')}:${dateObj
    .getUTCMinutes()
    .toString()
    .padStart(2, '0')}`;
};

