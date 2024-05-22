import React, { Fragment } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MyRouter = () => 
(
    // Fragment는 생략가능하다
    <Fragment>
        <Header/>
        <h1>Hello Body</h1>
        <Footer/>
    </Fragment>
)

export default MyRouter;