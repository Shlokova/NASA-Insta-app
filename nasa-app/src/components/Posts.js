import React from 'react';
import Post from './Post';

const Posts = ({ posts, openPost }) => {
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
