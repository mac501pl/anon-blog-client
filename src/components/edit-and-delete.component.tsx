import { IconButton } from '@material-ui/core';
import { Delete, Cancel, Edit } from '@material-ui/icons';
import React from 'react';

interface IEditAndDeleteProps {
  editing: boolean;
  setEditing: (value: boolean) => void;
  handleDelete: () => Promise<void>;
  small?: boolean;
}

const EditAndDeleteComponent: React.FC<IEditAndDeleteProps> = ({ handleDelete, setEditing, editing, small }: IEditAndDeleteProps): JSX.Element => (
  <div>
    <IconButton onClick={handleDelete}>
      <Delete fontSize={small ? 'small' : 'default'} />
    </IconButton>
    <IconButton
      onClick={(): void => {
        setEditing(!editing);
      }}
    >
      {editing ? <Cancel fontSize={small ? 'small' : 'default'} /> : <Edit fontSize={small ? 'small' : 'default'} />}
    </IconButton>
  </div>
);

export default EditAndDeleteComponent;
