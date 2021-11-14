import React, { useEffect, useState } from 'react';
import { onValue, query, ref } from 'firebase/database';
import { Editable, EditableInput, EditablePreview, useEditableControls } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { auth, db } from '../firebase';
import { generateUserName, setUserName } from '../db';

function EditableButton() {
  const { isEditing, getEditButtonProps } = useEditableControls();

  return <>{!isEditing && <EditIcon {...getEditButtonProps()} />}</>;
}

function NameEditable() {
  const [name, setName] = useState('Name');

  useEffect(() => {
    return onValue(query(ref(db, `users/${auth.currentUser?.uid}`)), async (data) => {
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
