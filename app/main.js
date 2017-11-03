import React from "react";
import {render} from "react-dom";
import Greeter from "./components/Greeter/Greeter";
import './main.css';


render(<Greeter />, document.querySelector("#root"));
