import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Switch } from '@nextui-org/react';
import { Bar, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Tooltip, Legend, BarElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import getRequest from '../../../requests/anew/getRequest';
import getColor from '../../../util/getColor';

ChartJS.register(ChartDataLabels);
ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend, BarElement); // Register BarElement

const calculateStudentStatus = (averageGrade, anchorTasksSubmitted) => {
  const numericAverageGrade = parseFloat(averageGrade) || 0;
  const anchorTasksPercentage = (anchorTasksSubmitted / 20) * 100;
  const studentStatus = (numericAverageGrade + anchorTasksPercentage) / 2;
  return studentStatus;
};

const StudentTaskTable = ({ group }) => {
  const [data, setData] = useState([]);
  const [unitTableData, setUnitTableData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await getRequest({ getUrl: `getTrackingData?group=${group}` });

      const tableData = res.students.map((student) => {
        let totalTasksSubmitted = 0;
        let anchorTasksSubmitted = 0;
        let totalScoreSum = 0;
        let totalReviews = 0;

        res.unitData.forEach((unit) => {
          unit.tasks.forEach((task) => {
            const cellData = unit.tableData[task.arrayIndex]?.find((cell) => cell.key.includes(`_${student.id}`));
            if (cellData) {
              const submissions = cellData.submissions || [];

              totalReviews += submissions.filter((sub) => sub.reviewed).length;

              if (submissions.length > 0) {
                totalTasksSubmitted += 1;

                const highestScore = Math.max(Math.max(...submissions.map((sub) => sub.score)), 0);
                const taskMaxScore = task.test_weights.reduce((sum, weight) => sum + weight, 0);
                totalScoreSum += (highestScore / taskMaxScore) * 100;
                if (task.anchor) anchorTasksSubmitted += 1;
              }
            }
          });
        });

        return {
          id: student.id,
          name: student.full_name,
          totalTasksSubmitted,
          anchorTasksSubmitted,
          averageGrade: totalTasksSubmitted > 0 ? (totalScoreSum / totalTasksSubmitted).toFixed(2) : 'N/A',
          totalReviews,
        };
      });

      const unitTableData = res.unitData.map((unit) => {
        let totalUnitSubmissions = 0;
        let totalUnitReviews = 0;
        console.log(res);
        unit.tasks.forEach((task) => {
          res.students.forEach((student) => {
            const cellData = unit.tableData[task.arrayIndex]?.find((cell) => cell.key.includes(`_${student.id}`));
            if (cellData) {
              const submissions = cellData.submissions || [];
              totalUnitSubmissions += submissions.length;
              totalUnitReviews += submissions.filter((sub) => sub.reviewed).length;
            }
          });
        });

        return {
          unitId: unit.unitId,
          unitName: unit.unit,
          totalSubmissions: totalUnitSubmissions,
          totalReviews: totalUnitReviews,
        };
      });
      console.log(unitTableData);
      setUnitTableData(unitTableData);
      setData(tableData);
    }

    fetchData();
  }, [group]);

  const scatterData = {
    datasets: [
      {
        label: 'Anchor Sum vs. Average Grade',
        data: data.map((student) => ({
          x: parseFloat(student.averageGrade) || 0,
          y: student.anchorTasksSubmitted,
          name: student.name, // Label for the point
        })),
        backgroundColor: data.map((student) =>
          getColor(calculateStudentStatus(student.averageGrade, student.anchorTasksSubmitted)),
        ),
      },
    ],
  };

  const scatterOptions = {
    scales: {
      x: {
        title: { display: true, text: 'ממוצע ציונים' },
        beginAtZero: true,
        max: 100, // Set the maximum value of the y-axis
      },
      y: {
        title: { display: true, text: 'עוגנים' },

        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
      },
      datalabels: {
        align: 'center', // Center the label horizontally on the point
        anchor: 'center', // Center the label vertically on the point
        formatter: (value) => value.name.split(' ')[0], // Display the name property as the label
        font: {
          size: 10,
        },
        color: '#000', // Set label color
      },
    },
    elements: {
      point: {
        radius: 7, // Ensure enough space for the label within the point
        hoverRadius: 8, // Slightly enlarge the point on hover
      },
    },
  };

  const submissionChartData = {
    labels: unitTableData.map((unit) => unit.unitName),
    datasets: [
      {
        label: 'Submissions',
        data: unitTableData.map((unit) => unit.totalSubmissions), // Total submissions for each unit
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderWidth: 1,
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const reviewChartData = {
    labels: unitTableData.map((unit) => unit.unitName), // Unit names on the y-axis
    datasets: [
      {
        label: 'Reviews',
        data: unitTableData.map((unit) => unit.totalReviews), // Total reviews for each unit
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        borderRadius: 5,
      },
    ],
  };

  const barOptions = {
    indexAxis: 'y', // Makes the bars horizontal
    plugins: {
      legend: { display: true },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        title: {
          display: true,
          text: 'Units',
        },
      },
    },
  };

  return (
    data.length > 0 && (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          backgroundColor: 'rgba(255,255,255,0.9)',
          padding: '20px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
          <div style={{ flex: '1', overflowX: 'auto' }}>
            <h2>Student Task Table</h2>
            <Table>
              <TableHeader>
                <TableColumn>שם</TableColumn>
                <TableColumn>משימות שהוגשו</TableColumn>
                <TableColumn>עוגנים</TableColumn>
                <TableColumn>ציון ממוצע</TableColumn>
                <TableColumn>משובים</TableColumn>
                <TableColumn>צבע</TableColumn>
              </TableHeader>
              <TableBody>
                {Array.isArray(data) &&
                  data
                    .sort((a, b) => {
                      const statusA = calculateStudentStatus(a.averageGrade, a.anchorTasksSubmitted);
                      const statusB = calculateStudentStatus(b.averageGrade, b.anchorTasksSubmitted);
                      return statusA - statusB;
                    })
                    .map((student) => {
                      const studentStatus = calculateStudentStatus(student.averageGrade, student.anchorTasksSubmitted);
                      return (
                        <TableRow key={student.id}>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.totalTasksSubmitted}</TableCell>
                          <TableCell>{student.anchorTasksSubmitted}</TableCell>
                          <TableCell>{student.averageGrade}</TableCell>
                          <TableCell>{student.totalReviews}</TableCell>
                          <TableCell>
                            <div
                              style={{
                                width: '20px',
                                height: '20px',
                                // borderRadius: '50%',
                                backgroundColor: getColor(studentStatus),
                              }}
                            ></div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </div>

          {/* <Switch defaultSelected color="success" endContent={<TableSvg />} size="lg" startContent={<ScatterPlotSvg />}>
            Dark mode
          </Switch>

          <Switch
            defaultSelected
            color="secondary"
            size="lg"
            thumbIcon={({ isSelected, className }) => (isSelected ? <TableSvg /> : <ScatterPlotSvg />)}
          >
            Dark mode
          </Switch> */}

          <div style={{ flex: '1' }}>
            <h3>Scatter Plot</h3>
            <Scatter data={scatterData} options={scatterOptions} key={`scatter-${group}`} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: '1' }}>
            <h3>Submissions by Unit</h3>
            <Bar data={submissionChartData} options={barOptions} key={`bar-submissions-${group}`} />
          </div>
          <div style={{ flex: '1' }}>
            <h3>Reviews by Unit</h3>
            <Bar data={reviewChartData} options={barOptions} key={`bar-reviews-${group}`} />
          </div>
        </div>
      </div>
    )
  );
};

export default StudentTaskTable;

const TableSvg = () => (
  <svg fill="#000000" width="800px" height="800px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1800 1320v420c0 33-27 60-60 60h-420v-480h480Zm-600 0v480H720v-480h480Zm-600 0v480H180c-33 0-60-27-60-60v-420h480Zm1200-600v480h-480V720h480Zm-600 0v480H720V720h480Zm-600 0v480H120V720h480Zm1140-600c33 0 60 27 60 60v420h-480V120h420Zm-540 0v480H720V120h480Zm-600 0v480H120V180c0-33 27-60 60-60h420ZM1740 0H180C80.76 0 0 80.76 0 180v1560c0 99.24 80.76 180 180 180h1560c99.24 0 180-80.76 180-180V180c0-99.24-80.76-180-180-180Z"
      fill-rule="evenodd"
    />
  </svg>
);

const ScatterPlotSvg = () => (
  <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.5 4.5a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm-2 5a1 1 0 1 0 1-1 1 1 0 0 0-1 1zm-10 8a1 1 0 1 0-1 1 1 1 0 0 0 1-1zm5-2a1 1 0 1 0 1-1 1 1 0 0 0-1 1zm0-8a1 1 0 1 0 1 1 1 1 0 0 0-1-1zM2 1H1v22h22v-1H2z" />
    <path fill="none" d="M0 0h24v24H0z" />
  </svg>
);
