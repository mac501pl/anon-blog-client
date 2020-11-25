import * as React from 'react';
import { TextArea } from './textarea.component';
import { Field, Formik, Form } from 'formik';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { IPost } from './post.view';
import { postsUrl } from '../config';

interface NewPostFormProps {
  addPost: (post: IPost) => void;
  userId: string;
}

export interface GenericFormValues {
  content: string;
}

export const contentNotEmpty = (value: string): string | undefined => (value.trim() ? undefined : 'To pole jest wymagane');

const NewPostForm: React.FC<NewPostFormProps> = ({ userId, addPost }: NewPostFormProps): JSX.Element => {
  const initialValues: GenericFormValues = { content: '' };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (data, { setSubmitting, resetForm }): Promise<void> => {
        const url = `${postsUrl}/add`;
        const { data: responseData, status } = await axios.post<IPost>(url, { posterId: userId, ...data });
        if ([200, 201].includes(status)) {
          addPost(responseData);
          resetForm({});
        }
        setSubmitting(false);
      }}
      validateOnMount={false}
    >
      {({ isSubmitting, errors, isValid }): JSX.Element => {
        return (
          <Form style={{ display: 'flex', margin: '1rem 1rem 2rem 1rem' }}>
            <Field validate={contentNotEmpty} errors={errors} placeholder="Treść Twojego posta" name="content" component={TextArea} />
            <Button disabled={isSubmitting || !isValid} type="submit" variant="outlined" color="primary">
              Zatwierdź
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default NewPostForm;
