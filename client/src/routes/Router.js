import React, { Fragment } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppNavbar from "../components/AppNavbar";
import { Container } from "reactstrap";
import { Route, Routes, Navigate } from 'react-router-dom'
import PostCardList from "./normalRoute/PostCardList";
import PostWrite from "./normalRoute/PostWrite";
import PostDetail from "./normalRoute/PostDetail";
import Search from "./normalRoute/Search";
import CategoryResult from "./normalRoute/CategoryResult";

const MyRouter = () => (
    // Fragment는 생략가능하다
    <Fragment>
        <AppNavbar/>
        <Header/>
            <Container id="main-body">
                <Routes>
                    <Route path="/" exact Component={PostCardList}/>
                    <Route path="/post" exact Component={PostWrite}/>
                    <Route path="/post/:id" exact Component={PostDetail}/>
                    <Route 
                        path="/post/category/:categoryName" 
                        exact 
                        Component={CategoryResult}
                    />
                    <Route path="/search/:searchTerm" exact Component={Search}/>
                    <Route 
                        path="*" 
                        element={<Navigate to="/" />} 
                    />
                </Routes>
            </Container>
        <Footer/>
    </Fragment>
)

export default MyRouter;