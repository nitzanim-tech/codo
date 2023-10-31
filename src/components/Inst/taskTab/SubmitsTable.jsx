import React, { useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react';
import DonutChart from '../Chart';
import VersionsButton from './VersionsButton';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import formatDate from '../../../util/formatDate';
export default function SubmitsTable({ data }) {
  const [sortOrder, setSortOrder] = useState('name');

  const calculatePresent = (stringRatio) =>
    (parseInt(stringRatio.split('/')[0]) / parseInt(stringRatio.split('/')[1])) * 100;

  const handleSortByName = () => {
    setSortOrder('name');
  };

  const handleSortByTestsSuccess = () => {
    setSortOrder('testsSuccess');
  };

  const sortedData = [...data].sort((a, b) => {
    switch (sortOrder) {
      case 'name':
        return a.name.localeCompare(b.name);

      case 'testsSuccess':
        const aTestPercentage =
          a.versions.length > 0 && a.versions[0].tests !== '' ? calculatePresent(a.versions[0].tests) : 0;
        const bTestPercentage =
          b.versions.length > 0 && b.versions[0].tests !== '' ? calculatePresent(b.versions[0].tests) : 0;
        return bTestPercentage - aTestPercentage;

      default:
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
            const percentage = selectedVersion.tests !== '' ? calculatePresent(selectedVersion.tests) : 0;
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
                          const versionToCheck = {
                            ...selectedVersion,
                            name: student.name,
                          };
                          localStorage.setItem('versionToCheck', JSON.stringify(versionToCheck));

                          window.open('/review', '_blank');
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
                <TableCell>{selectedVersion.date ? formatDate(selectedVersion.date) : ''}</TableCell>
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

  

