import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { Card, CardActions, CardContent } from '@material-ui/core';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GenericFormValues } from './postform.component';
import NewCommentForm from './commentform.component';
import Comments from './comments.component';
import { IComment } from './comment.view';
import UpvotesComponent from './upvotes.component';
import EditAndDeleteComponent from './edit-and-delete.component';
import EditContentComponent from './edit-content.component';
import { postsUrl } from '../config';

export interface IPost {
  _id: string;
  posterId: string;
  content: string;
  upvoters: Array<string>;
  downvoters: Array<string>;
  created: Date;
  edited: boolean;
  comments: Array<IComment>
}

interface PostViewProps {
  userId: string;
  removePost: (id: string) => void;
}

const PostView: React.FC<IPost & PostViewProps> = ({ userId, removePost, ...postProp }: PostViewProps & IPost): JSX.Element => {
  const [editing, setEditing] = useState<boolean>(false);
  const [post, setPost] = useState<IPost>(postProp);
  const [comments, setComments] = useState<Array<IComment>>([]);

  const { content, upvoters, downvoters, created, _id, posterId, edited, comments: _comments } = post;

  useEffect(() => {
    setComments(_comments);
    // eslint-disable-next-line
  }, []);

  const isUpvoter = upvoters.includes(userId);
  const isDownvoter = downvoters.includes(userId);

  const addComment = (comment: IComment): void => {
    setComments([comment, ...comments]);
  }

  const removeComment = (id: string): void => {
    setComments(comments.filter(comment => comment._id !== id))
  }

  const handleUpvote = async (): Promise<void> => {
    if (isUpvoter) {
      const { data } = await axios.put<IPost>(`${postsUrl}/${_id}/remove_upvote`, { userId: userId });
      setPost(data);
    } else {
      if (isDownvoter) {
        await axios.put<IPost>(`${postsUrl}/${_id}/remove_downvote`, { userId: userId });
      }
      const { data } = await axios.put<IPost>(`${postsUrl}/${_id}/upvote`, { userId: userId });
      setPost(data);
    }
  };

  const handleDownvote = async (): Promise<void> => {
    if (isDownvoter) {
      const { data } = await axios.put<IPost>(`${postsUrl}/${_id}/remove_downvote`, { userId: userId });
      setPost(data);
    } else {
      if (isUpvoter) {
        await axios.put<IPost>(`${postsUrl}/${_id}/remove_upvote`, { userId: userId });
      }
      const { data } = await axios.put<IPost>(`${postsUrl}/${_id}/downvote`, { userId: userId });
      setPost(data);
    }
  };

  const handleDelete = async (): Promise<void> => {
    if (editing) {
      setEditing(false);
    }
    const { status } = await axios.delete<IPost>(`${postsUrl}/${_id}/delete`, { data: { posterId: userId } });
    if (status === 200) {
      removePost(_id);
    }
  };

  const handleUpdate = async (data: GenericFormValues): Promise<void> => {
    const url = `${postsUrl}/${_id}/update`;
    const payload: { content: string; posterId: string } = { ...data, posterId: userId };
    const { data: responseData } = await axios.put<IPost>(url, payload);
    setEditing(false);
    setPost(responseData);
  };

  return (
    <Card variant="outlined" style={{ marginBottom: '2rem', backgroundColor: '#dddddd' }}>
      <CardContent>
        <Typography color="textSecondary" variant="caption">
          {new Date(created).toLocaleString()}
          {edited && ' (zmodyfikowano)'}
        </Typography>
        {editing ? <EditContentComponent content={content} handleUpdate={handleUpdate} /> : <Typography variant="body1">{content}</Typography>}
      </CardContent>
      <CardActions disableSpacing style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#dddddd' }}>
        <UpvotesComponent handleDownvote={handleDownvote} handleUpvote={handleUpvote} isDownvoter={isDownvoter} isUpvoter={isUpvoter} upvotes={upvoters.length - downvoters.length} />
        {userId === posterId && <EditAndDeleteComponent editing={editing} handleDelete={handleDelete} setEditing={setEditing} />}
      </CardActions>
      <div className="comment-form">
        <NewCommentForm postId={_id} userId={userId} addComment={addComment} />
        <Comments userId={userId} removeComment={removeComment} comments={comments} postId={_id} />
      </div>
    </Card>
  );
};

export default PostView;
