import RTools from '../../src/index'
import Tools from 'gfs-redux-bind-react/lib/Tools'
import { MaskBarComponent} from 'gfs-loadingbar/lib/index.react'

import React, { Component } from 'react'

class Page extends Component{

    constructor(props){
        super(props)

        this.state = {
            desc:'没有请求之前的值'
        }
    }

    componentDidMount(){
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

new RTools({
    middleware:[],
    module:Page,
    reducers:[],
    devTools:Tools,
    bar:<MaskBarComponent />,
    //pc or wap or other
    agent:'other',
    container:'root'
})