import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IPost } from '../types/types';
import PostFooter from './PostFooter';

interface PostProps {
    post: IPost;
    openPost: (post: IPost) => void;
}
const Post: React.FC<PostProps> = ({ post, openPost }) => {
    const router = useNavigate();
    return (
        <div>
            <div className="img-container">
                <div
                    className="img"
                    onClick={() => {
                        router(`/posts/${post.date}`);
                    }}
                >
                    <img
                        alt="post img"
                        src={
                            post.media_type === 'video'
                                ? post.thumbnail_url
                                : post.url
                        }
                    />
                </div>
                <PostFooter post={post} openPost={openPost} />
            </div>
        </div>
    );
};

export default Post;
