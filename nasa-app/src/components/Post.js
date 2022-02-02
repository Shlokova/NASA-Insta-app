import { useNavigate } from 'react-router-dom';
import PostFooter from './PostFooter';

const Post = ({ post, openPost }) => {
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
