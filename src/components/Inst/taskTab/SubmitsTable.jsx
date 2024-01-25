import React, { useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import DonutChart from '../Chart';
import VersionsButton from './VersionsButton';
import formatDate from '../../../util/formatDate';
import ReviewButton from './ReviewButton';

export default function SubmitsTable({ data, task }) {
  const [sortDescriptor, setSortDescriptor] = useState({ column: 'name', direction: 'ascending' });

  const calculateGrade = (scores, selectedTests) => {
    const selectedTestsNumeric = selectedTests.map(Number);
    return selectedTestsNumeric.reduce((sum, value, index) => sum + value * scores[index], 0);
  };

  const sortedData = [...data].sort((a, b) => {
    switch (sortDescriptor.column) {
      case 'name':
        return sortDescriptor.direction === 'ascending' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);

      case 'date':
        const aDate = maxDateInVersion(a.versions);
        const bDate = maxDateInVersion(b.versions);
        return sortDescriptor.direction === 'ascending' ? aDate - bDate : bDate - aDate;

      case 'testsSuccess':
        const aTestPercentage = maxTestInVersion(a.versions);
        const bTestPercentage = maxTestInVersion(b.versions);
        return sortDescriptor.direction === 'ascending'
          ? aTestPercentage - bTestPercentage
          : bTestPercentage - aTestPercentage;
    }
  });

  const handleSortChange = (descriptorClicked) => {
    if (sortDescriptor.column === descriptorClicked.column) {
      setSortDescriptor({
        column: descriptorClicked.column,
        direction: sortDescriptor.direction === 'ascending' ? 'descending' : 'ascending',
      });
    } else {
      setSortDescriptor({ column: descriptorClicked.column, direction: 'ascending' });
    }
  };

  return (
    <>
      <Table
        aria-label="Students submit table"
        sortDescriptor={sortDescriptor}
        onSortChange={handleSortChange}
        classNames={{
          table: 'min-h-[400px]',
        }}
      >
        <TableHeader>
          <TableColumn style={{ textAlign: 'center' }}>משוב</TableColumn>
          <TableColumn style={{ textAlign: 'center' }}>גרסאות</TableColumn>
          <TableColumn key="testsSuccess" style={{ textAlign: 'center' }} allowsSorting>
            טסטים
          </TableColumn>
          <TableColumn key="date" style={{ textAlign: 'center' }} allowsSorting>
            תאריך
          </TableColumn>
          <TableColumn key="name" style={{ textAlign: 'center' }} allowsSorting>
            שם
          </TableColumn>
        </TableHeader>

        <TableBody>
          {sortedData.map((student, index) => {
            const versionsWithGrades = student.versions.map((version) => ({
              ...version,
              grade: calculateGrade(task.scores, version.tests),
            }));
            const selectedVersion = getSelectedVersion(versionsWithGrades) || { date: '', tests: '', grade: 0 };

            return (
              <TableRow key={`${student.name}-${index}`}>
                <TableCell>
                  {student.versions.length > 0 && (
                    <ReviewButton
                      selectedVersion={{ ...selectedVersion, task: student.task }}
                      student={{ name: student.name, uid: student.uid }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {student.versions.length > 1 && (
                    <VersionsButton versions={versionsWithGrades} scoreSum={task.scoreSum} />
                  )}
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DonutChart
                      ratio={`${selectedVersion.grade || 0}/${task.scoreSum}`}
                      percentage={(selectedVersion.grade / task.scoreSum) * 100}
                      size={45}
                      showPrecent={task.isTest}
                    />
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
    return { date: '', tests: [] };
  }
  const versionWithReview = versions.find((version) => version?.review);
  if (versionWithReview) {
    return versionWithReview; // there is a review
  }
  const bestTestScore = Math.max(...versions.map((version) => version.tests.filter(Boolean).length));
  const versionsWithBestTestScore = versions.filter(
    (version) => version.tests.filter(Boolean).length === bestTestScore,
  );
  if (versionsWithBestTestScore.length === 1) {
    return versionsWithBestTestScore[0]; // unique best score
  }
  const latestDate = Math.max(...versionsWithBestTestScore.map((version) => new Date(version.date).getTime()));
  return versionsWithBestTestScore.find((version) => new Date(version.date).getTime() === latestDate);
};

const maxTestInVersion = (versions) => {
  let maxTests = -1;
  for (const version of versions) {
    if (version.tests !== '') {
      const passes = version.tests.filter(Boolean).length;
      maxTests = maxTests < passes ? passes : maxTests;
    }
  }
  return maxTests;
};

const maxDateInVersion = (versions) => {
  let maxDate = new Date(0);
  for (const version of versions) {
    if (version.date !== '') {
      const newDate = new Date(version.date);
      maxDate = maxDate < newDate ? newDate : maxDate;
    }
  }
  return maxDate;
};
