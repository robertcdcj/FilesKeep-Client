import React, { Component } from "react";
import classes from "./Footer.module.css";

class Footer extends Component {
    render() {
        return (
            <div>
                <footer className={["mt-auto page-footer font-small mdb-color lighten-3 pt-4", classes.footer].join(" ")}>

                    <div class="container text-center text-md-left">

                        <div class="row">

                            <div class="col-md-4 col-lg-3 mr-auto my-md-4 my-0 mt-4 mb-1">

                                <h5 class="font-weight-bold text-uppercase mb-4">Footer Content</h5>
                                <p>Some stuff.</p>
                                <p>More Stuff.</p>

                            </div>

                            <hr class="clearfix w-100 d-md-none" />

                            <div class="col-md-2 col-lg-2 mx-auto my-md-4 my-0 mt-4 mb-1">

                                <h5 class="font-weight-bold text-uppercase mb-4">About</h5>

                            </div>

                            <hr class="clearfix w-100 d-md-none" />

                            <div class="col-md-4 col-lg-3 mx-auto my-md-4 my-0 mt-4 mb-1">

                                <h5 class="font-weight-bold text-uppercase mb-4">Contact Info</h5>

                                <ul class="list-unstyled">
                                    <li>
                                        <p>
                                            <i class="fas fa-home mr-3"></i> Surrey, Canada</p>
                                    </li>
                                    <li>
                                        <p>
                                            <i class="fas fa-envelope mr-3"></i> robertcdcj@gmail.com</p>
                                    </li>
                                    <li>
                                        <p>
                                            <i class="fas fa-phone mr-3"></i> (604) 352-9593</p>
                                    </li>
                                </ul>

                            </div>

                            <hr class="clearfix w-100 d-md-none" />


                        </div>

                    </div>

                    <div className={["text-center py-3", classes.copyright].join(" ")}>© 2019 Copyright: Robert Hsieh</div>

                </footer>
            </div>
        );
    }

}

export default Footer;