import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import useFetching from '../hooks/useFetching';
import { IPost } from '../types/types';
import PostFooter from './PostFooter';
import MyLoader from './UI/Loader/MyLoader';
interface PostModalProps {
    openPost: (post: IPost) => void;
}

const PostModal: React.FC<PostModalProps> = ({ openPost }) => {
    const { date } = useParams<{ date?: string }>();
    const [post, setPost] = useState<IPost>({
        copyright: '',
        date: '',
        explanation: '',
        hdurl: '',
        media_type: '',
        service_version: '',
        title: '',
        url: '',
    });
    const [fetchPostByDate, isLoading] = useFetching(async (date: string) => {
        const response = await PostService.getByDate(date);
        setPost(response);
    });

    useEffect(() => {
        if (date) fetchPostByDate(date);
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
                                    ? post?.thumbnail_url
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
