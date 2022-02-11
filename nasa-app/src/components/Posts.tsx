import React from 'react';
import { IPost } from '../types/types';
import Post from './Post';

interface PostsProps {
    posts: IPost[];
    openPost: (post: IPost) => void;
}
const Posts: React.FC<PostsProps> = ({ posts, openPost }) => {
    return (
        <div className="container">
            {posts.map((post) => {
                return (
                    <Post
                        key={post.date}
                        post={post}
                        openPost={openPost}
                    ></Post>
                );
            })}
        </div>
    );
};

export default Posts;
