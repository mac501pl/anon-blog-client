import * as React from 'react';
import PostView, { IPost } from './post.view';

interface IPosts {
  posts: Array<IPost>;
}

interface IProps {
  userId: string;
  removePost: (id: string) => void;
}

const Posts: React.FC<IPosts & IProps> = ({ posts, userId, removePost }: IProps & IPosts): JSX.Element => {
  return (
    <>
      {posts.map(post => (
        <PostView key={`post_${post._id}`} {...post} userId={userId} removePost={removePost} />
      ))}
    </>
  );
};
export default Posts;
