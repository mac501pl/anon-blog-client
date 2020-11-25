import * as React from 'react';
import { TextArea } from './textarea.component';
import { Field, Formik, Form } from 'formik';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { contentNotEmpty, GenericFormValues } from './postform.component';
import { IComment } from './comment.view';
import { postsUrl } from '../config';

interface NewCommentFormProps {
  addComment: (comment: IComment) => void;
  userId: string;
  postId: string;
}

const NewCommentForm: React.FC<NewCommentFormProps> = ({ userId, postId, addComment }: NewCommentFormProps): JSX.Element => {
  const initialValues: GenericFormValues = { content: '' };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (data, { setSubmitting, resetForm }): Promise<void> => {
        const url = `${postsUrl}/${postId}/add_comment`;
        const { data: responseData, status } = await axios.post<IComment>(url, { commenterId: userId, ...data });
        if ([200, 201].includes(status)) {
          addComment(responseData);
          resetForm({});
        }
        setSubmitting(false);
      }}
      validateOnMount={false}
    >
      {({ isSubmitting, errors, isValid }): JSX.Element => {
        return (
          <Form style={{ display: 'flex', margin: '.5rem .5rem 1rem .5rem' }}>
            <Field validate={contentNotEmpty} errors={errors} placeholder="Dodaj komentarz" name="content" component={TextArea} />
            <Button disabled={isSubmitting || !isValid} type="submit" variant="outlined" color="primary" size="small" style={{ padding: '0' }}>
              Dodaj komentarz
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default NewCommentForm;
