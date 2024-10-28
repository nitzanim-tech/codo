import { useState, useEffect, useContext } from 'react';
import {Accordion, AccordionItem} from "@nextui-org/accordion";
import {Spinner} from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip} from "@nextui-org/react";
import "./StudentTracking.css";
import getRequest from '../../../requests/anew/getRequest';

const GRAY = "#92929F";

function reindex(data, key) {
    let res = {};
    data.forEach((o, idx) => {
        o.arrayIndex = idx;
        res[o[key]] = o;
    });

    return res;
}

function preprocessTasks(unitTasks) {
    unitTasks.forEach((o, idx) => {
        const total = o.test_weights.reduce((x, y) => x + y, 0);
        o.test_weights = o.test_weights.map(x => x / total);
        let lines = 0;
        if (o.personal_queue) {
            if (idx > 0 && unitTasks[idx - 1].personal_queue) lines |= 1;
            if (idx + 1 < unitTasks.length && unitTasks[idx + 1].personal_queue) lines |= 2;
        }

        o.lines = lines;
    });
}

function processUnitData(unit, students, status, tasks) {
    const unitTasks = tasks.filter(t => t.unit == unit);
    preprocessTasks(unitTasks);

    const tasksDict = reindex(unitTasks, 'task_id');
    const studentsDict = reindex(students, 'id');

    const unitStatus = status.filter(o => tasksDict[o.task_id] !== undefined && studentsDict[o.user_id] !== undefined);

    const tableData = (
        [...new Array(unitTasks.length)]
        .map((_, taskIdx) => [...new Array(students.length)]
                   .map((_, studentIdx) => {return {
                        lines: unitTasks[taskIdx].lines,
                        key: `${unitTasks[taskIdx].task_id}_${students[studentIdx].id}`
                    };}))
    );

    unitStatus.forEach(o => {
        const w = tasksDict[o.task_id].test_weights;
        o.score = o.pass === null ? -1 : (
            o.pass
            .map((pass, idx) => pass * w[idx])
            .reduce((x, y) => x + y, 0)
        );

        const rowIdx = tasksDict[o.task_id].arrayIndex;
        const colIdx = studentsDict[o.user_id].arrayIndex;
        const cellData = tableData[rowIdx][colIdx];
        cellData.score = o.score;
        cellData.submission = o.submission_id;
        cellData.reviewed = o.reviewed;
        cellData.active = o.submission_id === null;
    });

    return { unit, tasks: unitTasks, tableData, size: unitStatus.length };
}

function prepareTrackingData(data) {
    const { students, status, tasks } = data;
    const units = [...new Set(tasks.map(x => x.unit))];
    const unitData = units.map(unit => processUnitData(unit, students, status, tasks)).filter(u => u.size > 0);

    return { students, unitData };
}

function renderCell(cell) {
    return (
        <TableCell key={cell.key}>
            <svg xmlns="http://www.w3.org/2000/svg"
                 width="5em" height="3em"
                 viewBox="0 0 1 1">
                ({
                    !(cell.lines & 1) ? "" :
                    <line x1=".5" x2=".5" y1="0" y2=".5" stroke={GRAY} />
                })
                ({
                    !(cell.lines & 2) ? "" :
                    <line x1=".5" x2=".5" y1="1" y2=".5" stroke={GRAY} />
                })
                ({cell.score >= 0 ? (
                    <Tooltip content={`${Math.round(cell.score * 100)}%`} placement="topStart" delay={500}>
                        <a href={`/review/${cell.submission}`} target="_blank">
                            <circle r=".25" cx=".5" cy=".5" fill={getColor(cell.score)} />
                        </a>
                    </Tooltip>
                ) : (
                    cell.lines > 0 ? (
                        (cell.active ?
                            <circle r=".25" cx=".5" cy=".5" stroke={GRAY} strokeWidth=".08" fill="white" /> :
                            <circle r=".1" cx=".5" cy=".5" fill={GRAY} />)
                    ) : (
                        <></>
                    )
                )})
                ({!cell.reviewed ? "" :
                    <path d="M0.4 0.53 L0.47 0.6 L0.62 0.45" stroke="white" strokeWidth=".05" fill="none"
                          strokeLinecap="round" />
                })
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
        <div style={{ width: '100%' }}>
            <svg xmlns="http://www.w3.org/2000/svg"
                 width="100%" height="5em"
                 viewBox="0 0 1 1"
             >
                <circle cx="-2" cy=".3" r=".175" fill={getColor(0)} />
                <circle cx="-1" cy=".3" r=".175" fill={getColor(.25)} />
                <circle cx="0" cy=".3" r=".175" fill={getColor(.5)} />
                <circle cx="1" cy=".3" r=".175" fill={getColor(.75)} />
                <circle cx="2" cy=".3" r=".175" fill={getColor(1)} />
                <text x="-2" y=".7" style={{ fontSize: ".012em" }} textAnchor="middle">0%</text>
                <text x="2" y=".7" style={{ fontSize: ".012em" }} textAnchor="middle">100%</text>
            </svg>
        </div>
    );
}

function StudentTracking({ group }) {
    const [students, setStudents] = useState(null);
    const [unitData, setUnitData] = useState(null);
    const [selectedKeys, setSelectedKeys] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const res = await getRequest({ getUrl: `getTrackingData?group=${group}` });
            const formattedData = prepareTrackingData(res);
            setStudents(formattedData.students);
            setUnitData(formattedData.unitData);
            setSelectedKeys([formattedData.unitData[formattedData.unitData.length - 1].unit]);
        }

        fetchData();
    }, [group]);

    const renderStudents = () => {
        return (
            <TableHeader>
                <TableColumn key="tasks"></TableColumn>
                {students.map(student => (
                    <TableColumn key={student.id}>
                        <Tooltip content={student.full_name} placement="bottomStart">
                            <div style={{
                                width: '6em',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}>
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
            <TableRow key={`${unit.unit}_${rowIdx}`}
                      className={unit.tasks[rowIdx].anchor ? "anchor" : ""}>
                <TableCell>
                    <Tooltip content={unit.tasks[rowIdx].task} placement="topStart">
                        <div style={{
                            maxWidth: '6em',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}>
                            {unit.tasks[rowIdx].task}
                        </div>
                    </Tooltip>
                </TableCell>
                {row.map(renderCell)}
            </TableRow>
        );
    };

    const renderUnit = unit => {
        return (
            <AccordionItem key={unit.unit} aria-label={unit.unit} title={unit.unit}>
                <Table aria-label="Student tracking" isCompact>
                    {renderStudents()}
                    <TableBody>
                        {unit.tableData.map((row, rowIdx) => renderRow(unit, row, rowIdx))}
                    </TableBody>
                </Table>
            </AccordionItem>
        );
    };

    return (
        !unitData ? <Spinner/> : (
            <div style={{ width: '75%' }}>
                {renderLegend()}
                <div style={{ width: '100%' }}>
                    <Accordion key={group} dir="rtl" isCompact aria-label="Unit selection"
                                    selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}
                                    selectionMode="multiple">
                        {unitData.map(renderUnit)}
                    </Accordion>
                </div>
            </div>
        )
    );
}

export default StudentTracking;