import { useState, useEffect } from 'react';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Card } from '@nextui-org/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import getRequest from '../../../requests/anew/getRequest';
import SubmitsDropdown from './SubmitsDropdown';
import { Loading } from '../../General/Messages';
import CustomScrollbar from '../../General/CustomScrollbar';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import SimpleDropdown from './SimpleDropdown';

import './StudentTracking.css';
import postRequest from '../../../requests/anew/postRequest';

const GRAY = '#92929F';

const LightTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(
  ({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      direction: 'rtl',
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[2],
      fontSize: 13,
      fontFamily: '"Varela Round", sans-serif',
      borderRadius: theme.shape.borderRadius,
    },
  }),
);

function StudentTracking({ group }) {
  const [students, setStudents] = useState(null);
  const [unitData, setUnitData] = useState(null);
  const [selectedKeys, setSelectedKeys] = useState(null);
  const [dropdownStates, setDropdownStates] = useState();

  useEffect(() => {
    async function fetchData() {
      const res = await getRequest({ getUrl: `getTrackingData?group=${group}` });
      setStudents(res.students);
      setUnitData(res.unitData);
      setSelectedKeys([res.unitData[res.unitData.length - 1].unit]);
    }

    fetchData();
  }, [group]);

  const renderStudents = () => {
    return (
      <TableHeader>
        <TableColumn key="tasks"></TableColumn>
        {students.map((student) => (
          <TableColumn key={student.id} width={'80px'}>
            <LightTooltip title={student.full_name}>
              <div
                style={{
                  width: '4em',
                  height: '2.4em',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  whiteSpace: 'normal',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  lineHeight: '1.2em',
                }}
              >
                {student.full_name}
              </div>
            </LightTooltip>
          </TableColumn>
        ))}
      </TableHeader>
    );
  };

  const renderRow = (unit, row, rowIdx) => {
    return (
      <TableRow key={`${unit.unit}_${rowIdx}`} className={unit.tasks[rowIdx].anchor ? 'anchor' : ''}>
        <TableCell>
          <LightTooltip title={unit.tasks[rowIdx].task}>
            <div
              style={{
                direction: 'rtl',
                textAlign: 'right',
                maxWidth: '10em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                cursor: 'pointer',
              }}
              onClick={() => window.open(`/submit/${unit.unitId}/${unit.tasks[rowIdx].task_id}`)}
            >
              {unit.tasks[rowIdx].task}
            </div>
          </LightTooltip>
        </TableCell>
        {row.map((cell) => renderCell(cell, unit.unit, rowIdx, unit.unitId))}
      </TableRow>
    );
  };

  const renderUnit = (unit) => {
    return (
      <AccordionItem key={unit.unit} aria-label={unit.unit} title={unit.unit}>
        <Table aria-label="Student tracking" isCompact>
          {renderStudents()}
          <TableBody>{unit.tableData.map((row, rowIdx) => renderRow(unit, row, rowIdx))}</TableBody>
        </Table>
      </AccordionItem>
    );
  };

  const selectRelevatSubmission = (cell) => {
    const reviewedSubmissions = cell.submissions.filter((submission) => submission.reviewed);
    const nonReviewedSubmissions = cell.submissions.filter((submission) => !submission.reviewed);

    const sortedReviewedSubmissions = reviewedSubmissions.sort((a, b) => {
      return new Date(b.time) - new Date(a.time);
    });

    const sortedNonReviewedSubmissions = nonReviewedSubmissions.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return new Date(b.time) - new Date(a.time);
    });

    if (sortedReviewedSubmissions.length > 0) {
      const latestReviewed = sortedReviewedSubmissions[0];

      const newerHigherScoreSubmission = sortedNonReviewedSubmissions.find(
        (submission) =>
          new Date(submission.time) > new Date(latestReviewed.time) && submission.score > latestReviewed.score,
      );

      if (newerHigherScoreSubmission) {
        return { ...latestReviewed, conflict: true };
      }

      return latestReviewed;
    }
    return sortedNonReviewedSubmissions.length > 0 ? sortedNonReviewedSubmissions[0] : null;
  };

  function getColor(score) {
    const START = [255, 123, 217];
    const END = [88, 134, 255];
    const diffs = START.map((x, i) => END[i] - x);
    const res = START.map((x, i) => x + score * diffs[i]);
    return `rgb(${Math.round(res[0])}, ${Math.round(res[1])}, ${Math.round(res[2])})`;
  }

  const postPracticeToUser = async (cellKey, unitId) => {
    const [taskId, userId] = cellKey.split('_');
    const object = { taskId, userId, unitId };
    const { practice } = await postRequest({ postUrl: 'postPracticeToUser', object, authMethod: 'jwt' });
    if (practice?.praticeId) {
      return true;
    }
  };

  function renderCell(cell, unitKey, rowIdx, unitId) {
    const cellKey = `${unitKey}_${rowIdx}_${cell.key}`;
    const isDropdownOpen = cellKey === dropdownStates;
    const selectedSubmission = cell.submissions?.length > 0 ? selectRelevatSubmission(cell) : cell;

    const dropdownItems = cell.submissions
      ? cell.submissions.map((submission) => ({
          id: submission.submission_id,
          time: submission.time,
          score: submission.score,
          link: `/review/${submission.submission_id}`,
          reviewed: submission.reviewed,
        }))
      : [];

    return (
      <TableCell key={cellKey} onClick={() => setDropdownStates(isDropdownOpen ? null : cellKey)}>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <svg width="50%" height="100%" viewBox="0 0 1 1" preserveAspectRatio="xMidYMid meet">
            {!(cell.lines & 1) ? null : <line x1="0.5" x2="0.5" y1="0" y2="0.5" stroke={GRAY} />}
            {!(cell.lines & 2) ? null : <line x1="0.5" x2="0.5" y1="1" y2="0.5" stroke={GRAY} />}
            {cell.active ? <ActiveSub /> : <NoActiveSub />}
          </svg>
          {!cell.active && (
            <div style={{ marginLeft: '10px', marginRight: '10px', position: 'absolute' }}>
              <SimpleDropdown
                isOpen={isDropdownOpen && selectedSubmission.score == null && cell.lines}
                setIsDropdownOpen={setDropdownStates}
                items={[
                  {
                    label: 'פתח תרגיל',
                    onClick: () => {
                      const succeed = postPracticeToUser(cell.key, unitId);
                      if (succeed) cell.active = true;
                    },
                  },
                ]}
              />
            </div>
          )}
          {selectedSubmission.score >= 0 && (
            <div style={{ marginLeft: '10px', marginRight: '10px', position: 'absolute' }}>
              <SubmitsDropdown
                isOpen={isDropdownOpen}
                setIsDropdownOpen={setDropdownStates}
                onToggle={(open) => setDropdownStates(open ? cellKey : null)}
                triggerContent={{
                  tooltip: `${Math.round(selectedSubmission.score * 100)}%`,
                  backgroundColor: getColor(selectedSubmission.score),
                  reviewed: selectedSubmission.reviewed,
                  conflict: selectedSubmission.conflict || null,
                }}
                items={dropdownItems}
              />
            </div>
          )}
        </div>
      </TableCell>
    );
  }

  const ActiveSub = () => <circle r=".12" cx=".5" cy=".5" stroke={GRAY} strokeWidth=".08" fill="white" />;
  const NoActiveSub = () => <circle r=".1" cx=".5" cy=".5" fill={GRAY} />;

  function renderLegend() {
    return (
      <Card style={{ width: 'auto', margin: '10px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="5em" viewBox="0 0 1 1">
          <circle cx="-1.5" cy=".4" r=".175" fill={getColor(0)} />
          <circle cx="-.5" cy=".4" r=".175" fill={getColor(0.25)} />
          <circle cx=".5" cy=".4" r=".175" fill={getColor(0.5)} />
          <circle cx="1.5" cy=".4" r=".175" fill={getColor(0.75)} />
          <circle cx="2.5" cy=".4" r=".175" fill={getColor(1)} />
          <text x="-1.5" y=".8" style={{ fontSize: '.012em' }} textAnchor="middle">
            0%
          </text>
          <text x="2.5" y=".8" style={{ fontSize: '.012em' }} textAnchor="middle">
            100%
          </text>
        </svg>
      </Card>
    );
  }

  return !unitData ? (
    <Loading />
  ) : (
    <div style={{ width: '80%' }}>
      {renderLegend()}
      <CustomScrollbar>
        <div style={{ width: '100%', height: '70vh' }}>
          <Accordion
            key={group}
            dir="rtl"
            isCompact
            aria-label="Unit selection"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            selectionMode="multiple"
          >
            {unitData.map(renderUnit)}
          </Accordion>
        </div>
      </CustomScrollbar>
    </div>
  );
}

export default StudentTracking;
