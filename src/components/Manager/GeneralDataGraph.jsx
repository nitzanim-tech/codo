import React from 'react';
import Histogram from './Histogram';
import { groupAnalysis, calculateGrades } from './utils';

const GeneralDataGraph = ({ students }) => {
  const parameters = groupAnalysis(students);
  const { grades, noSubmit } = calculateGrades(students);
  
  const histogramDataA = createHistogramData(grades['firstTest']);
  const histogramDataB = createHistogramData(grades['secondTest']);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '50%', textAlign: 'center' }}>
          <CustomNumber text={'משובים'} number={parameters.reviews} />
          <CustomNumber text={'הגשות'} number={parameters.submissions} />
          <CustomNumber text={'חניכים'} number={students.length} />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '50%', textAlign: 'center' }}>
        <Histogram title="בוחן 2" data={histogramDataB} barColor="#82ca9d" noSubmit={noSubmit['secondTest']} />
        <Histogram title="בוחן 1" data={histogramDataA} barColor="#8884d8" noSubmit={noSubmit['firstTest']} />
      </div>
    </>
  );
};
export default GeneralDataGraph;

const CustomNumber = ({ text, number }) => {
  return (
    <div>
      <h1>{number}</h1>
      <p>{text}</p>
    </div>
  );
};

const createHistogramData = (grades, binSize = 10, numBins = 12) => {
  const bins = Array.from({ length: numBins }, (_, index) => ({
    range: `${index * binSize}-${(index + 1) * binSize}`,
    count: 0,
  }));

  grades.forEach((grade) => {
    const binIndex = Math.min(Math.floor(grade / binSize), bins.length - 1);
    bins[binIndex].count += 1;
  });

  return bins;
};
