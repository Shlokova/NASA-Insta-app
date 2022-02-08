import './App.css';
import Posts from './components/Posts';
import Modal from './components/UI/Modal/Modal';
import { useEffect, useState } from 'react';
import PostModal from './components/PostModal';
import PostService from './API/PostService';
import useFetching from './hooks/useFetching';
import { HashRouter, Route, Routes } from 'react-router-dom';
import PostShareModal from './components/PostShareModal';
import MyLoader from './components/UI/Loader/MyLoader';
import DateForm from './components/DateForm';

function App() {
    const numberOfPosts =
        Math.round((window.innerHeight * 0.9) / 312) *
        Math.round((window.innerWidth * 0.9) / 327);
    const [posts, setPosts] = useState([]);
    const [modal, setModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState({});
    const [date, setDate] = useState({
        startDate: '1995-06-16',
        endDate: changeDate('1995-06-16', numberOfPosts),
    });

    const [fetchPosts, isPostsLoading] = useFetching(async (start, end) => {
        const response = await PostService.getAll(start, end);
        setPosts([...posts, ...response]);
    });

    useEffect(() => {
        fetchPosts(date.startDate, date.endDate);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date.startDate]);

    useEffect(() => {
        if (isPostsLoading) return;

        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPostsLoading]);

    const scrollHandler = (e) => {
        if (
            e.target.documentElement.scrollHeight -
                (e.target.documentElement.scrollTop + window.innerHeight) <
            100
        ) {
            setDate({
                startDate: changeDate(date.endDate, 1),
                endDate: changeDate(date.endDate, numberOfPosts),
            });
        }
    };

    const openPost = (post) => {
        setSelectedPost(post);
        setModal(true);
    };
    function dateSelect(selectedDate) {
        if (date.startDate !== selectedDate) setPosts([]);
        setDate({
            startDate: selectedDate,
            endDate: changeDate(selectedDate, numberOfPosts),
        });
    }
    function changeDate(date, n) {
        date = new Date(Date.parse(date));
        date.setDate(date.getDate() + n);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }

    return (
        <HashRouter>
            <div className="App">
                <header className="header">
                    <div className="header-icon" />
                    NASA INSTA
                </header>
                <DateForm dateSelect={dateSelect} />
                <Modal visible={modal} setVisible={setModal}>
                    <PostShareModal post={selectedPost} />
                </Modal>

                <Posts posts={posts} openPost={openPost} />
                {isPostsLoading && <MyLoader />}
            </div>

            <Routes>
                <Route
                    exact
                    path="/posts/:date"
                    element={
                        <Modal visible={true}>
                            <PostModal openPost={openPost} />
                        </Modal>
                    }
                />
                <Route exact path="/" element={<div />} />
            </Routes>
        </HashRouter>
    );
}

export default App;
