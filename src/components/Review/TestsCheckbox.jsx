import React from 'react';
import { Card, Divider } from '@nextui-org/react';
import { CheckboxGroup, Checkbox, ScrollShadow } from '@nextui-org/react';
import styled from 'styled-components';

function TestsCheckbox({ task, selectedTests, setSelectedTests, gradesVector, viewOnly }) {
  const headers = {
    10: 'חלק 1- הצגת התפריט',
    14: 'חלק 2- הרכבת המנה',
    18: 'חלק 3- גביית תשלום',
    22: 'חלק 4- הוספת לקוחות',
    26: 'חלק 5- סגירת קופה',
    30: 'ראיתי שליטה ב:',
  };
  return (
    <div style={{ padding: '5%' }}>
      <Card>
        {/* <ScrollShadow className="h-[450px]" size={20}> */}
        <StyledCheckboxDiv>
          <CheckboxGroup label="הרצות" value={selectedTests} onValueChange={setSelectedTests} isDisabled={viewOnly}>
            <table>
              <tbody>
                {testsName(task).map((testName, index) => (
                  <React.Fragment key={index}>
                    {Object.keys(headers).includes(index.toString()) && (
                      <tr>
                        <td colSpan={2} style={{ textAlign: 'right', color: 'gray' }}>
                          {headers[index.toString()]}
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td>
                        <Checkbox value={index} radius="full">
                          {testName}
                        </Checkbox>
                      </td>
                      {!viewOnly && (
                        <td style={{ width: '20%', color: 'gray', fontSize: '80%', textAlign: 'center' }}>
                          {gradesVector && `${gradesVector[index]} נק'`}
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
