import './App.css';
import Posts from './components/Posts';
import Modal from './components/UI/Modal/Modal';
import React, { useEffect, useState } from 'react';
import PostModal from './components/PostModal';
import PostService from './API/PostService';
import useFetching from './hooks/useFetching';
import { HashRouter, Route, Routes } from 'react-router-dom';
import PostShareModal from './components/PostShareModal';
import MyLoader from './components/UI/Loader/MyLoader';
import DateForm from './components/DateForm';
import { IPost } from './types/types';

interface IDate {
    startDate: string;
    endDate: string;
}

const App: React.FC = () => {
    const numberOfPosts =
        Math.ceil((window.innerHeight * 0.9) / 312) *
        Math.floor((window.innerWidth * 0.9) / 327);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [modal, setModal] = useState<boolean>(false);
    const [selectedPost, setSelectedPost] = useState<IPost>({
        copyright: '',
        date: '',
        explanation: '',
        hdurl: '',
        media_type: '',
        service_version: '',
        title: '',
        url: '',
    });
    const [date, setDate] = useState<IDate>({
        startDate: '1995-06-16',
        endDate: changeDate('1995-06-16', numberOfPosts),
    });

    const [fetchPosts, isPostsLoading] = useFetching(
        async (start: string, end: string) => {
            const response = await PostService.getAll(start, end);
            setPosts([...posts, ...response]);
        }
    );

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

    const scrollHandler = (e: any) => {
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

    const openPost = (post: IPost) => {
        setSelectedPost(post);
        setModal(true);
    };
    function dateSelect(selectedDate: string) {
        if (date.startDate !== selectedDate) setPosts([]);
        setDate({
            startDate: selectedDate,
            endDate: changeDate(selectedDate, numberOfPosts),
        });
    }
    function changeDate(date: string, n: number) {
        let newDate = new Date(Date.parse(date));
        newDate.setDate(newDate.getDate() + n);
        return `${newDate.getFullYear()}-${
            newDate.getMonth() + 1
        }-${newDate.getDate()}`;
    }

    return (
        <HashRouter>
            <div className="App">
                <header className="header">
                    <div className="header-icon" />
                    NASA INSTA
                </header>
                <DateForm
                    dateSelect={dateSelect}
                    initialDate={date.startDate}
                />
                <Modal visible={modal} setVisible={setModal}>
                    <PostShareModal post={selectedPost} />
                </Modal>

                <Posts posts={posts} openPost={openPost} />
                {isPostsLoading && <MyLoader />}
            </div>

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
        </HashRouter>
    );
};

export default App;
