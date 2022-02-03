import './App.css';
import Posts from './components/Posts';
import Modal from './components/UI/Modal/Modal';
import { useEffect, useRef, useState } from 'react';
import PostModal from './components/PostModal';
import PostService from './API/PostService';
import useFetching from './hooks/useFetching';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostShareModal from './components/PostShareModal';
import MyLoader from './components/UI/Loader/MyLoader';

function App() {
    const [posts, setPosts] = useState([]);
    const [modal, setModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState({});
    const [date, setDate] = useState({
        startDate: '1995-06-16',
        endDate: '1995-06-27',
    });

    const [fetchPosts, isPostsLoading, postsError] = useFetching(
        async (start, end) => {
            const response = await PostService.getAll(start, end);
            setPosts([...posts, ...response]);
        }
    );
    const lastElement = useRef();
    const observer = useRef();
    const isFirstRun = useRef(true);

    useEffect(() => {
        fetchPosts(date.startDate, date.endDate);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date.startDate]);

    useEffect(() => {
        if (isPostsLoading) return;
        if (postsError) return;
        if (observer.current) observer.current.disconnect();
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        var callback = function (entries, observer) {
            if (entries[0].isIntersecting) {
                setDate({
                    startDate: changeDate(date.endDate, 1),
                    endDate: changeDate(date.endDate, 12),
                });
            }
        };
        observer.current = new IntersectionObserver(callback);
        observer.current.observe(lastElement.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPostsLoading]);

    const openPost = (post) => {
        setSelectedPost(post);

        setModal(true);
    };

    const changeDate = (date, n) => {
        date = new Date(Date.parse(date));
        date.setDate(date.getDate() + n);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    };

    return (
        <BrowserRouter>
            <div className="App">
                <header className="header">
                    <div className="header-icon" />
                    NASA INSTA
                </header>

                <Modal visible={modal} setVisible={setModal}>
                    <PostShareModal post={selectedPost} />
                </Modal>

                <Posts posts={posts} openPost={openPost} />
                {isPostsLoading && <MyLoader />}
            </div>
            <div ref={lastElement}></div>
            <Routes>
                <Route
                    path="/posts/:date"
                    element={
                        <Modal visible={true}>
                            <PostModal openPost={openPost} />
                        </Modal>
                    }
                />
                <Route path="/" element={<div />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
