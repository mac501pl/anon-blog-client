import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NewPostForm from './components/postform.component';
import Posts from './components/posts.component';
import { v4 as uuid } from 'uuid';
import cookie from 'cookie';
import CookieConsent from 'react-cookie-consent';


import './style.css';
import { IPost } from './components/post.view';
import { postsUrl } from './config';

const createCookie = (): string => {
  const serializedCookie = cookie.serialize('userId', uuid(), { expires: new Date(2147483647 * 1000), path: '/' });
  document.cookie = serializedCookie;
  return serializedCookie
};

const App: React.FC = (): JSX.Element => {
  const userId = cookie.parse(document.cookie).userId ?? createCookie();
  const [posts, setPosts] = useState<Array<IPost>>([]);

  const removePost = (id: string): void => {
    setPosts(posts.filter(post => post._id !== id));
  }

  const addPost = (post: IPost): void => {
    setPosts([post, ...posts]);
  }

  useEffect(() => {
    const fetchPosts = async (): Promise<void> => {
      const { status, data } = await axios.get<Array<IPost>>(`${postsUrl}/`);
      if (status === 200) {
        setPosts(data);
      }
    };
    void fetchPosts();
  }, []);

  return (
    <div style={{ width: '60vw' }}>
      <NewPostForm userId={userId} addPost={addPost} />
      <Posts userId={userId} posts={posts} removePost={removePost} />
      <CookieConsent buttonText="OK">Ta strona używa ciasteczek!</CookieConsent>
    </div>
  );
};

export default App;
