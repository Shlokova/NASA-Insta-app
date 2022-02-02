import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import useFetching from '../hooks/useFetching';
import PostFooter from './PostFooter';
import MyLoader from './UI/Loader/MyLoader';

const PostModal = ({ openPost }) => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [fetchPostByDate, isLoading] = useFetching(async (date) => {
        const response = await PostService.getByDate(date);
        setPost(response);
    });

    useEffect(() => {
        fetchPostByDate(params.date);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="post-modal">
            {isLoading ? (
                <MyLoader />
            ) : (
                <>
                    <div className="modal-img">
                        <img
                            alt="post img"
                            src={
                                post.media_type === 'video'
                                    ? post.thumbnail_url
                                    : post.hdurl
                            }
                        />
                    </div>
                    <div className="modal-footer">
                        <PostFooter post={post} openPost={openPost} />
                        <div className="post-explanation">
                            {post.explanation}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default PostModal;
