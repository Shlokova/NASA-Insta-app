import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostFooter = ({ post, openPost }) => {
    const [isLike, setIsLike] = useState(
        localStorage.getItem(`like_${post.date}`) || 'n'
    );
    useEffect(() => {
        localStorage.setItem(`like_${post.date}`, isLike);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLike]);
    const router = useNavigate();
    const changeIsLike = () => {
        if (isLike === 'y') setIsLike('n');
        else {
            setIsLike('y');
        }
    };
    return (
        <div className="img-footer">
            <div className="post-interface">
                <div className="like-share">
                    <span onClick={() => changeIsLike()} className="like">
                        <div className={isLike === 'y' ? 'active' : ''} />
                    </span>
                    <span className="share">
                        <div
                            onClick={() => {
                                router('/');
                                router('/NASA-Insta-app');
                                openPost(post);
                            }}
                        ></div>
                    </span>
                </div>
                <span className="date-img">{post.date}</span>
            </div>
            <div className="post-title">{post.title}</div>
        </div>
    );
};

export default PostFooter;
