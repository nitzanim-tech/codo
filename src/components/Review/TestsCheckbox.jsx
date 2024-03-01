import React, { useState } from 'react';
import { Card, Button } from '@nextui-org/react';
import { CheckboxGroup, Checkbox, useDisclosure } from '@nextui-org/react';
import styled from 'styled-components';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import ModalExplanation from '../TestsList/ModalExplanation';

function TestsCheckbox({ task, selectedTests, setSelectedTests, viewOnly, testsOutputs }) {
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedModalTest, setSelectedModalTest] = useState();
  
  const handleSelect = (value) => {
    const selectedObject = testsOutputs.find((obj) => obj.name === value);
    setSelectedModalTest(selectedObject);
    onOpen();
  };

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
                      <td>
                        <Button radius="full" size="sm" isIconOnly variant="faded" onClick={() => {}}>
                          <ChatRoundedIcon style={{ color: '#005395', fontSize: 'medium' }} />
                        </Button>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </CheckboxGroup>
        </StyledCheckboxDiv>
        {/* </ScrollShadow> */}
      </Card>
      <ModalExplanation selectedValue={selectedModalTest} taskObject={task} isOpen={isOpen} onClose={onClose} />
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
