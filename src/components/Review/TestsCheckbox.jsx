import React, { useState } from 'react';
import { Card, Divider } from '@nextui-org/react';
import { testsName } from '../../Tasks/TaskIndex';
import { CheckboxGroup, Checkbox } from '@nextui-org/react';
import styled from 'styled-components';

function TestsCheckbox({ task, selectedTests, setSelectedTests, pass }) {
  return (
    <div style={{ padding: '5%' }}>
      <Card>
        <StyledCheckboxDiv>
          <CheckboxGroup label="פרמטרים" value={selectedTests} onValueChange={setSelectedTests}>
            {testsName(task).map((testName, index) => (
              <React.Fragment key={index}>
                <Checkbox value={index} radius="full" style={{ marginLeft: '5px' }}>
                  {testName}
                </Checkbox>
                {pass.length == index + 1 && <Divider />}
              </React.Fragment>
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
