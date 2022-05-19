import { useState, useEffect } from 'react';

import {
  Button,
  TextInput
} from '@mantine/core';

export default function VerifyMessage(properties) {
  let connection = properties.connection;

  const [messageToVerify, setMessageToVerify] = useState("");

  const changeMessageToVerify = async (event) => {
    setMessageToVerify(event.target.value);
  };

  async function verify() {
    let signedMessaged;
    try {
      signedMessaged = await connection.signMessage();
    } catch (error) {
      return;
    }
    console.log(signedMessaged)
  }

  return ([
    <TextInput
      key="messageToVerify"
      label="messageToVerify"
      value={messageToVerify}
      onChange={changeMessageToVerify}
      sx={{marginBottom: '5px', marginTop: '5px'}}
    />,
    <Button
      sx={{marginTop: '15px'}}
      onClick={() => {
        verify()
      }}
    >
      Sign message
    </Button>
  ]);
}
