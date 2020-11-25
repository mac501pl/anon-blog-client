import * as React from 'react';
import CommentView, { IComment } from './comment.view';

interface IComments {
  comments: Array<IComment>;
}

interface IProps {
  userId: string;
  postId: string;
  removeComment: (id: string) => void;
}

const Comments: React.FC<IComments & IProps> = ({ comments, userId, postId, removeComment }: IProps & IComments): JSX.Element => (
  <>
    {comments.map(comment => (
      <CommentView key={`comment_${comment._id}`} {...comment} userId={userId} postId={postId} removeComment={removeComment} />
    ))}
  </>
);
export default Comments;
