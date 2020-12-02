const baseurl = process.env.NODE_ENV === 'production' ? 'http://77.55.218.184:5000' : 'http://localhost:5000';
export const postsUrl = `${baseurl}/posts`;
