import React from 'react';
import { IPost } from '../types/types';

interface PostShareModalProps {
    post: IPost;
}
const PostShareModal: React.FC<PostShareModalProps> = ({ post }) => {
    return (
        <div className="share-modal">
            <div>
                <h2>Поделиться изображением </h2>
                <div>Вы можете поделиться изображением при помощи ссылки:</div>
                <div className="post-link">
                    <div
                        className="copy-link"
                        onClick={() =>
                            navigator.clipboard.writeText(
                                window.location.href + 'posts/' + post.date
                            )
                        }
                    ></div>
                    <div className="link">
                        {window.location.href}posts/{post.date}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostShareModal;
