import React from 'react';
import { Card, Divider } from '@nextui-org/react';
import { CheckboxGroup, Checkbox, ScrollShadow } from '@nextui-org/react';
import styled from 'styled-components';

function TestsCheckbox({ task, selectedTests, setSelectedTests, viewOnly }) {
  return (
    <div style={{ padding: '5%' }}>
      <Card>
        {/* <ScrollShadow className="h-[450px]" size={20}> */}
        <StyledCheckboxDiv>
          <CheckboxGroup label="הרצות" value={selectedTests} onValueChange={setSelectedTests} isDisabled={viewOnly}>
            <table>
              <tbody>
                {task.tests.map((test, index) => (
                  <React.Fragment key={index}>
                    {task.headers && Object.keys(task.headers).includes(index.toString()) && (
                      <tr>
                        <td colSpan={2} style={{ textAlign: 'right', color: 'gray' }}>
                          {task.headers[index.toString()]}
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td>
                        <Checkbox value={index} radius="full">
                          {test.name}
                        </Checkbox>
                      </td>
                      {!viewOnly && (
                        <td style={{ width: '20%', color: 'gray', fontSize: '80%', textAlign: 'center' }}>
                          {`${test.score} נק'`}
                        </td>
                      )}
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </CheckboxGroup>
        </StyledCheckboxDiv>
        {/* </ScrollShadow> */}
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
  display: 'flex';
  justifycontent: 'center';
`;
