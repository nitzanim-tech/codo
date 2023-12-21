import React, { useState } from 'react';
import { Card, Divider } from '@nextui-org/react';
import { testsName } from '../../Tasks/TaskIndex';
import { CheckboxGroup, Checkbox } from '@nextui-org/react';
import styled from 'styled-components';

function TestsCheckbox({ task }) {
  const pass = [true, false, true, null, null, null, null];
  const passTestsIndexes = pass.reduce((acc, val, index) => (val === true ? [...acc, index] : acc), []);
  const [selectedTests, setSelectedTests] = useState(passTestsIndexes);

  return (
    <div style={{ padding: '25px' }}>
      <Card>
        <StyledCheckboxDiv>
          <CheckboxGroup label="פרמטרים" value={selectedTests} onValueChange={setSelectedTests}>
            {testsName(task).map((testName, index) => (
              <>
                <Checkbox value={index} radius="full" style={{ marginLeft: '5px' }}>
                  {testName}
                </Checkbox>
                {pass.indexOf(null) == index + 1 && <Divider />}
              </>
            ))}
          </CheckboxGroup>
        </StyledCheckboxDiv>
      </Card>
    </div>
  );
}

export default TestsCheckbox;

const StyledCheckboxDiv = styled.div`
  & span {
    margin-left: 1em;
  }
  direction: rtl;
  text-align: right;
  align-content: right;
  margin: 9px;
`;
