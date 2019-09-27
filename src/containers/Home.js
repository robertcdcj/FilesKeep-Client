import React, { Component } from "react";
import { Link, Route, Switch, Redirect } from "react-router-dom";

import storageImageBanner from "../img/storage.png";

import multipleFilesImage from "../img/multipleFiles.png";
import multipleDevicesImage from "../img/multipleDevices.png";
import fastImage from "../img/fast.png";
import simpleImage from "../img/simple.png";
import reliableImage from "../img/reliable.png";
import lightImage from "../img/light.png";
import shareImage from "../img/share.png";

import classes from "./Home.module.css";

class Home extends Component {
    state = {
        message: "loading..."
    };

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div class="jumbotron">
                    <div class="container">
                        <h1 class="display-4">Welcome to Files Keep</h1>
                        <p class="lead">A simple and fast online file storage solution.</p>
                        <hr class="my-4" />
                        <p>Create an account and receive your own personal online file storage!</p>
                        <p class="lead">
                            <Link className="nav-link btn btn-primary btn-lg" to="/myFiles">Get Started</Link>
                        </p>
                    </div>
                </div>

                {/* <div>
                    <Controller>
                        <Scene duration={600} pin>
                            <div>Sticky Example</div>
                        </Scene>
                        <Scene duration={600} pin>
                            <div>Sticky Example</div>
                        </Scene>
                        <Scene duration={600} pin>
                            <div>Sticky Example</div>
                        </Scene>
                    </Controller>
                </div> */}

                <div class="container">
                    <div class="row">
                        <div className={[classes.HalfWidthContent, "col-md-6"].join(" ")}>
                            <img className={classes.Centered} style={{ width: "70%" }} src={multipleFilesImage}></img>
                        </div>


                        <div className={[classes.HalfWidthContent, "col-md-6"].join(" ")}>
                            <div className={classes.Centered}>
                                <h2>Store any file</h2>
                                <p>Keep your photos, documents, designs, music and more.</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="container">
                    <div class="row d-flex flex-row-reverse">
                        <div className={[classes.HalfWidthContent, "col-md-6"].join(" ")}>
                            <img className={classes.Centered} style={{ width: "90%" }} src={multipleDevicesImage}></img>
                        </div>
                        <div className={[classes.HalfWidthContent, "col-md-6"].join(" ")}>
                            <div className={classes.Centered}>
                                <h2>Convenient access</h2>
                                <p>Access your files from any device with a browser.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container">
                    <div class="row">
                        <div className={[classes.HalfWidthContent, "col-md-6"].join(" ")}>
                            <img className={classes.Centered} style={{ width: "90%" }} src={shareImage}></img>
                        </div>
                        <div className={[classes.HalfWidthContent, "col-md-6"].join(" ")}>
                            <div className={classes.Centered}>
                                <h2>Share your content</h2>
                                <p>Share your files publicly, or share them privately with your selected friends.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className={["col-md-12"].join(" ")}>
                            <h2>Reasons to use Files Keep</h2>
                        </div>
                        <div className={["col-md-3"].join(" ")}>
                            <img src={fastImage} className={classes.ImageIcon}></img>
                            <p>Fast</p>
                        </div>
                        <div className={["col-md-3"].join(" ")}>
                            <img src={simpleImage} className={classes.ImageIcon}></img>
                            <p>Simple</p>
                        </div>
                        <div className={["col-md-3"].join(" ")}>
                            <img src={reliableImage} className={classes.ImageIcon}></img>
                            <p>Reliable</p>
                        </div>
                        <div className={["col-md-3"].join(" ")}>
                            <img src={lightImage} className={classes.ImageIcon}></img>
                            <p>Light</p>
                        </div>
                    </div>


                </div>

                <div className="container">
                    {/* <div data-aos="fade-up">
                        <div class="card m-auto">
                            <img class="card-img-top" src="https://cdn.mos.cms.futurecdn.net/QkbXaTivtMPvetcZ7q48Q-650-80.jpg" alt="Card image cap" />
                        </div>
                    </div>
                    <div class="row">
                        <div className="col-md-6" data-aos="flip-left">
                            <div class="card m-auto">
                                <img class="card-img-top" src="https://cdn.mos.cms.futurecdn.net/YZm7qBVDb4phduqUP2YiP-650-80.jpg" alt="Card image cap" />
                            </div>
                        </div>
                        <div className="col-md-6" data-aos="flip-right">
                            <div class="card m-auto">
                                <img class="card-img-top" src="https://cdn.mos.cms.futurecdn.net/YZm7qBVDb4phduqUP2YiP-650-80.jpg" alt="Card image cap" />
                            </div>
                        </div>
                    </div>
                    <div data-aos="fade-up">
                        <div class="card m-auto">
                            <img class="card-img-top" src="https://cdn.mos.cms.futurecdn.net/YZm7qBVDb4phduqUP2YiP-650-80.jpg" alt="Card image cap" />
                        </div>
                    </div>
                    <div data-aos="fade-up">
                        <div class="card m-auto">
                            <img class="card-img-top" src="https://cdn.mos.cms.futurecdn.net/qW35DR8k39Jx8c3Mjh7eP-650-80.png" alt="Card image cap" />
                        </div>
                    </div>
                    <div data-aos="fade-up">
                        <div class="card m-auto">
                            <img class="card-img-top" src="https://cdn.mos.cms.futurecdn.net/JXZG2N6CFnKgNucPAqzEUL-650-80.jpg" alt="Card image cap" />
                        </div>
                    </div> */}

                    {/* <div className="row">
                        <div className="col-md-12">
                            <p>Reasons to use Files Keep</p>
                        </div>
                        <div className="col-md-3">
                            <p>Fast</p>
                        </div>
                        <div className="col-md-3">
                            <p>Simple</p>
                        </div>
                        <div className="col-md-3">
                            <p>Reliable</p>
                        </div>
                        <div className="col-md-3">
                            <p>Light</p>
                        </div>
                    </div> */}

                    {/* <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                        <ol class="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img class="d-block w-100" src="https://static.makeuseof.com/wp-content/uploads/2011/01/Format07.png" alt="First slide" />
                            </div>
                            <div class="carousel-item">
                                <img class="d-block w-100" src="https://static.makeuseof.com/wp-content/uploads/2011/01/Format07.png" alt="Second slide" />
                            </div>
                            <div class="carousel-item">
                                <img class="d-block w-100" src="https://static.makeuseof.com/wp-content/uploads/2011/01/Format07.png" alt="Third slide" />
                            </div>
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div> */}
                </div>


            </div>
        );
    }
}

export default Home;
