# gfs-react-tools

react工具类整合，相关文档字段使用可参考 [gfs-redux-bind-react](https://github.com/future-team/gfs-redux-bind-react)、[gfs-fetch](https://github.com/future-team/gfs-fetch)、[gfs-loadingbar](https://github.com/future-team/gfs-loadingbar)、[gfs-mock](https://github.com/future-team/gfs-mock)；			
使用双向绑定功能请安装 [gfs-react-redux-twoway-binding](https://github.com/future-team/gfs-react-redux-twoway-binding)

## 使用

```javascript

import RTools from 'gfs-react-tools'
import Tools from 'gfs-redux-bind-react/lib/Tools'

import React, { Component } from 'react'

class Page extends Component{

    constructor(props){
        super(props)

        this.state = {
            desc:'没有请求之前的值'
        }
    }

    componentDidMount(){
		//调用RTools中的ajax功能
        RTools.fetch('/test').then((data)=>{
            this.setState({
                desc:data.desc
            })
        })
    }

    render(){
        return (
            <div>{this.state.desc}</div>
        )
    }
}

//调用
new RTools({
	//可选
    middleware:[],
	//必填
    module:Page,
	//可选
    reducers:[],
	//可选
    devTools:Tools,
	//可选 默认loadingbarComponent
    bar:null,
    //可选  loadingbar平台（pc/wap/other）other直接使用bar字段作为参数
    agent:'pc',
	//可选  react component放取的节点id
	container:'root'
})
```

## Command

```
	#测试	
	npm run test	
	#打包	
	npm run build	
	#例子演示	
	npm start
```


