import config from "./config.json";
import React, {Component} from 'react';
import styles from './Greeter.css';

class Greeter extends Component {
    render(){
        return (
            <div className={styles.zxzx}> /*注意这里引入了样式表文件直接点对应的类名可以取到css模块里对应的类名，而且在这个模块里引入的css只对这个模块里对应的类名起作用，即其它模块里有通类名的元素样式也不会起作用，F12可以发现其实webpack改变了模块里元素的类名*/
                {config.greetText}
            </div>
        );


    }
}




export default Greeter;