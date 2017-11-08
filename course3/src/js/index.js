import _ from 'lodash';
import printMe from './print';

import '../css/zximport.css';

import Icon from '../img/visa_logo.png';

function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'click me, me!!, me!!';
    btn.onclick = printMe;

    element.appendChild(btn);

    var myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);

    return element;
}

document.body.appendChild(component());