import { useState, useEffect } from 'react';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Card, Spinner } from '@nextui-org/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from '@nextui-org/react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';
import './StudentTracking.css';
import getRequest from '../../../requests/anew/getRequest';

const GRAY = '#92929F';

function StudentTracking({ group }) {
  const [students, setStudents] = useState(null);
  const [unitData, setUnitData] = useState(null);
  const [selectedKeys, setSelectedKeys] = useState(null);
  const [dropdownStates, setDropdownStates] = useState({}); // Track open state for each cell

  useEffect(() => {
    async function fetchData() {
      const res = await getRequest({ getUrl: `getTrackingData?group=${group}` });
      console.log(res);
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
          <TableColumn key={student.id}>
            <Tooltip content={student.full_name} placement="bottomStart">
              <div
                style={{
                  width: '6em',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {student.full_name}
              </div>
            </Tooltip>
          </TableColumn>
        ))}
      </TableHeader>
    );
  };

  const renderRow = (unit, row, rowIdx) => {
    return (
      <TableRow key={`${unit.unit}_${rowIdx}`} className={unit.tasks[rowIdx].anchor ? 'anchor' : ''}>
        <TableCell>
          <Tooltip content={unit.tasks[rowIdx].task} placement="topStart">
            <div
              style={{
                maxWidth: '6em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                cursor: 'pointer',
              }}
              onClick={() => window.open(`/submit/${unit.unitId}/${unit.tasks[rowIdx].task_id}`)}
            >
              {unit.tasks[rowIdx].task}
            </div>
          </Tooltip>
        </TableCell>
        {row.map((cell) => renderCell(cell, unit.unit, rowIdx))}
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
    // Separate reviewed and non-reviewed submissions
    const reviewedSubmissions = cell.submissions.filter((submission) => submission.reviewed);
    const nonReviewedSubmissions = cell.submissions.filter((submission) => !submission.reviewed);

    // Sort reviewed submissions first by score (highest to lowest), then by the latest date
    const sortedReviewedSubmissions = reviewedSubmissions.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score; // Sort by score
      }
      return new Date(b.date) - new Date(a.date); // If scores are equal, sort by date
    });

    // If there are reviewed submissions, return the highest scored one
    if (sortedReviewedSubmissions.length > 0) {
      return sortedReviewedSubmissions[0]; // Return the full submission object
    }

    // If no reviewed submissions, sort non-reviewed submissions similarly
    const sortedNonReviewedSubmissions = nonReviewedSubmissions.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score; // Sort by score
      }
      return new Date(b.date) - new Date(a.date); // If scores are equal, sort by date
    });

    // Return the highest grade and latest date submission from non-reviewed ones, including pass and reviewed fields
    return sortedNonReviewedSubmissions.length > 0 ? sortedNonReviewedSubmissions[0] : null;
  };
  const handleDropdownToggle = (cellKey) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [cellKey]: !prevState[cellKey],
    }));
  };

  function renderCell(cell, unitKey, rowIdx) {
    const cellKey = `${unitKey}_${rowIdx}_${cell.key}`;
    const isDropdownOpen = cellKey in dropdownStates ? dropdownStates[cellKey] : false;
    const selectedSubmission = cell.submissions?.length > 0 ? cell.submissions[0] : cell;

    // cell.submissions?.length > 1 ? selectRelevatSubmission(cell) : cell;
    console.log(selectedSubmission);

    return (
      <TableCell key={cellKey} onClick={() => handleDropdownToggle(cellKey)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="5em" height="3em" viewBox="0 0 1 1">
          {!(cell.lines & 1) ? '' : <line x1=".5" x2=".5" y1="0" y2=".5" stroke={GRAY} />}
          {!(cell.lines & 2) ? '' : <line x1=".5" x2=".5" y1="1" y2=".5" stroke={GRAY} />}
          {selectedSubmission.score >= 0 ? (
            <Dropdown isOpen={isDropdownOpen} onOpenChange={(open) => handleDropdownToggle(cellKey)}>
              <DropdownTrigger>
                <Tooltip content={`${Math.round(selectedSubmission.score * 100)}%`} placement="topStart" delay={500}>
                  {/* <a href={`/review/${selectedSubmission ? selectedSubmission.submission_id : ''}`} target="_blank"> */}
                    <circle r=".25" cx=".5" cy=".5" fill={getColor(selectedSubmission.score)} />
                  {/* </a> */}
                </Tooltip>
              </DropdownTrigger>
              <DropdownMenu>
                {cell.submissions &&
                  cell.submissions.map((submission) => (
                    <DropdownItem key={submission.submission_id}>
                      <a href={`/review/${submission.submission_id}`} target="_blank">
                        {'Submission ' + submission.submission_id}
                      </a>
                    </DropdownItem>
                  ))}
              </DropdownMenu>
            </Dropdown>
          ) : cell.lines > 0 ? (
            cell.active ? (
              <circle r=".12" cx=".5" cy=".5" stroke={GRAY} strokeWidth=".08" fill="white" />
            ) : (
              <circle r=".1" cx=".5" cy=".5" fill={GRAY} />
            )
          ) : (
            <></>
          )}
          {!selectedSubmission.reviewed ? (
            ''
          ) : (
            <path
              d="M0.4 0.53 L0.47 0.6 L0.62 0.45"
              stroke="white"
              strokeWidth=".05"
              fill="none"
              strokeLinecap="round"
            />
          )}
        </svg>
      </TableCell>
    );
  }

  function getColor(score) {
    const START = [255, 123, 217];
    const END = [88, 134, 255];
    const diffs = START.map((x, i) => END[i] - x);
    const res = START.map((x, i) => x + score * diffs[i]);
    return `rgb(${Math.round(res[0])}, ${Math.round(res[1])}, ${Math.round(res[2])})`;
  }

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
    <Spinner />
  ) : (
    <div style={{ width: '75%' }}>
      {renderLegend()}
      <div style={{ width: '100%' }}>
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
    </div>
  );
}

export default StudentTracking;
