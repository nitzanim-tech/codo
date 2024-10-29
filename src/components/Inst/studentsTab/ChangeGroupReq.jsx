import React, { useState } from 'react';
import { Button, Card } from '@nextui-org/react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import postRequest from '../../../requests/anew/postRequest';
import { ErrorMessage, SuccessMessage } from '../../general/Messages';

function ChangeGroupReq({ requests, setRequests }) {
  const approveOrRejectRequest = async (req, action) => {
    const object = { newGroup: req.requestedGroupId, userId: req.userId, action };
    const resp = await postRequest({ postUrl: `acceptOrRejectGroupReq`, authMethod: 'jwt', object });

    setRequests((prevRequests) =>
      prevRequests.map((r) => {
        if (r.requestedGroupId === req.requestedGroupId && r.userId === req.userId) {
          if (resp.error) {
            return { ...r, error: true };
          } else {
            return { ...r, success: true };
          }
        }
        return r;
      }),
    );
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {requests &&
        requests.map((req) => (
          <Card key={req.requestedGroupId} style={{ margin: '10px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ margin: '3px' }}>
                <p>
                  {req.userName} {req.lastName}
                </p>
                <p>{new Date(req.date).toLocaleString()}</p>
              </div>
              <div style={{ margin: '3px' }}>
                {req.error ? (
                  <ErrorMessage />
                ) : req.success ? (
                  <SuccessMessage />
                ) : (
                  <>
                    <Button
                      variant="light"
                      radius="full"
                      isIconOnly
                      onClick={() => approveOrRejectRequest(req, 'accept')}
                      color="success"
                    >
                      <DoneRoundedIcon />
                    </Button>
                    <Button
                      variant="light"
                      radius="full"
                      isIconOnly
                      onClick={() => approveOrRejectRequest(req, 'reject')}
                      color="danger"
                    >
                      <CloseRoundedIcon />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
    </div>
  );
}

export default ChangeGroupReq;
