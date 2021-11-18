import React, { useEffect, useState } from 'react';
import { onValue } from 'firebase/database';
import { Editable, EditableInput, EditablePreview, useEditableControls } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { generateUserName, getUserRef, setUserName } from '../database/users';

function EditableButton() {
  const { isEditing, getEditButtonProps } = useEditableControls();

  return <>{!isEditing && <EditIcon {...getEditButtonProps()} />}</>;
}

function NameEditable() {
  const [name, setName] = useState('');

  useEffect(() => {
    return onValue(getUserRef(), async (data) => {
      const newName = data.val();
      if (!newName.trim()) {
        await setUserName(generateUserName());
      } else {
        setName(newName);
      }
    });
  });

  const onEditName = (newName: string) => {
    return setUserName(newName || generateUserName());
  };

  return (
    <>
      <Editable value={name} onChange={onEditName} placeholder="<Your name>">
        <EditablePreview mr="0.5" />
        <EditableInput />
        <EditableButton />
      </Editable>
    </>
  );
}

export default NameEditable;
