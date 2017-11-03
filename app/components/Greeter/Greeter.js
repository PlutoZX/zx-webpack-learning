import config from "../../config.json";
import React, {Component} from 'react';
import styles from './Greeter.css';

class Greeter extends Component {


    handleClick(){
        console.log(styles.toString());
        alert(1);
    }

    render(){
        return (
            <div>
                <h3>啦啦啦啦</h3>
                <p className={styles.p1} onClick={this.handleClick}> {
                    /*
                    如果不需要css模块化（webpack中module设为true）就不能写这种 而应该直接写你引入的css中的类名即可（那么打包后样式是通用的不是局部模块的），不用写这种取值的形式，这么写是为了让webpack知道原本是什么类名，然后改成hash类名来实现该样式只在该模块有效
                    注意这里引入了样式表文件的写法，直接点对应的类名可以取到css模块里对应的类名，
                    而且在这个模块里引入的css只对这个模块里对应的类名起作用，即其它模块里有相同类名的元素样式也不会起作用，F12可以发现其实webpack改变了模块里元素的类名
                    */}
                    {config.greetText}
                </p>
                < input type = "text" className={styles.input1}/>
            </div>
        );
    }
}




export default Greeter;