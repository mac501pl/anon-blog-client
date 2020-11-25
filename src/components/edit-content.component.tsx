import { IconButton } from '@material-ui/core';
import { Done } from '@material-ui/icons';
import { Formik, Form, Field } from 'formik';
import React from 'react';
import { contentNotEmpty, GenericFormValues } from './postform.component';
import { TextArea } from './textarea.component';

interface IEditContentProps {
  content: string;
  handleUpdate: (data: GenericFormValues) => Promise<void>;
}

const EditContentComponent: React.FC<IEditContentProps> = ({ content, handleUpdate }: IEditContentProps): JSX.Element => (
  <Formik initialValues={{ content: content }} onSubmit={(data): Promise<void> => handleUpdate(data)}>
    {({ errors }): JSX.Element => (
      <Form style={{ display: 'flex' }}>
        <Field validate={contentNotEmpty} errors={errors} name="content" component={TextArea} />
        <IconButton type="submit">
          <Done />
        </IconButton>
      </Form>
    )}
  </Formik>
);

export default EditContentComponent;
