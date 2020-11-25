import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { GenericFormValues } from './postform.component';
import { Card, CardActions, CardContent, Typography } from '@material-ui/core';
import UpvotesComponent from './upvotes.component';
import EditAndDeleteComponent from './edit-and-delete.component';
import EditContentComponent from './edit-content.component';
import { postsUrl } from '../config';

export interface IComment {
  _id: string;
  commenterId: string;
  content: string;
  upvoters: Array<string>;
  downvoters: Array<string>;
  edited: boolean;
  created: Date;
}

interface ICommentProps {
  userId: string;
  postId: string;
  removeComment: (id: string) => void;
}

const CommentView: React.FC<IComment & ICommentProps> = ({ userId, removeComment, postId, ...commentProp }: IComment & ICommentProps): JSX.Element => {
  const [editing, setEditing] = useState<boolean>(false);
  const [comment, setComment] = useState<IComment>(commentProp);

  const { content, upvoters, downvoters, _id, commenterId } = comment;

  const isUpvoter = upvoters.includes(userId);
  const isDownvoter = downvoters.includes(userId);

  const handleUpvote = async (): Promise<void> => {
    if (isUpvoter) {
      const { data } = await axios.put<IComment>(`${postsUrl}/${postId}/comments/${_id}/remove_upvote`, { userId: userId });
      setComment(data);
    } else {
      if (isDownvoter) {
        await axios.put<IComment>(`${postsUrl}/${postId}/comments/${_id}/remove_downvote`, { userId: userId });
      }
      const { data } = await axios.put<IComment>(`${postsUrl}/${postId}/comments/${_id}/upvote`, { userId: userId });
      setComment(data);
    }
  };

  const handleDownvote = async (): Promise<void> => {
    if (isDownvoter) {
      const { data } = await axios.put<IComment>(`${postsUrl}/${postId}/comments/${_id}/remove_downvote`, { userId: userId });
      setComment(data);
    } else {
      if (isUpvoter) {
        await axios.put<IComment>(`${postsUrl}/${postId}/comments/${_id}/remove_upvote`, { userId: userId });
      }
      const { data } = await axios.put<IComment>(`${postsUrl}/${postId}/comments/${_id}/downvote`, { userId: userId });
      setComment(data);
    }
  };

  const handleDelete = async (): Promise<void> => {
    if (editing) {
      setEditing(false);
    }
    const { data: { _id: removedId } } = await axios.delete<IComment>(`${postsUrl}/${postId}/comments/${_id}/delete`, { data: { commenterId: userId } });
    removeComment(removedId);
  };

  const handleUpdate = async (data: GenericFormValues): Promise<void> => {
    const url = `${postsUrl}/${postId}/comments/${_id}/update`;
    const payload: { content: string; commenterId: string } = { ...data, commenterId: userId };
    const { data: responseData } = await axios.put<IComment>(url, payload);
    setEditing(false);
    setComment(responseData);
  };

  return (
    <Card variant="outlined" style={{ margin: '.5rem', backgroundColor: '#cccccc' }}>
      <CardContent style={{ padding: '.5rem' }}>{editing ? <EditContentComponent content={content} handleUpdate={handleUpdate} /> : <Typography variant="body2">{content}</Typography>}</CardContent>
      <CardActions disableSpacing style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <UpvotesComponent small handleDownvote={handleDownvote} handleUpvote={handleUpvote} isDownvoter={isDownvoter} isUpvoter={isUpvoter} upvotes={upvoters.length - downvoters.length} />
        {userId === commenterId && <EditAndDeleteComponent small editing={editing} handleDelete={handleDelete} setEditing={setEditing} />}
      </CardActions>
    </Card>
  );
};

export default CommentView;
