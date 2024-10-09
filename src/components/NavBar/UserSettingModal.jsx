import React, { useState } from 'react';

import { ModalBody, ModalFooter, Button } from '@nextui-org/react';
import { Modal, ModalHeader, ModalContent, Divider } from '@nextui-org/react';
import GoogleIcon from '@mui/icons-material/Google';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import getRequest from '../../requests/anew/getRequest';
import { Grid, Paper, Box } from '@mui/material';
import { Listbox, ListboxItem } from '@nextui-org/react';

const UserSettingModal = ({ auth, isOpen, onOpenChange, onClose }) => {
  const [error, setError] = useState('');
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} placement="top-center" dir="rtl" size="xl">
        <ModalContent>
          {(close) => (
            <>
              <ModalHeader>הגדרות</ModalHeader>
              <ModalBody>
                <>
                  <Grid container spacing={1} sx={{ height: '100%', width: '100%', padding: '10px' }}>
                    {/* Right column */}
                    <Grid item xs={4}>
                      <>
                        <ListboxWrapper>
                          <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
                            <ListboxItem key="changeGroup">שינוי קבוצה</ListboxItem>
                            <ListboxItem key="new">רמת קושי</ListboxItem>
                            <ListboxItem key="copy">עוד משהו</ListboxItem>
                          </Listbox>
                        </ListboxWrapper>
                      </>
                    </Grid>

                    {/* Left column */}
                    <Grid item xs={8}>
                      <Grid item>

                      </Grid>
                    </Grid>
                  </Grid>

                  <Divider />

                  {error && (
                    <p style={{ fontWeight: 'bold', color: 'red' }}>
                      <CancelRoundedIcon />
                      {error}
                    </p>
                  )}
                </>
              </ModalBody>
              <ModalFooter>
                <button onClick={onClose}>סגור</button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserSettingModal;

const ListboxWrapper = ({ children }) => (
  <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);
