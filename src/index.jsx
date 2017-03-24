import React from 'react'
import { render } from 'react-dom'

import {BindReact} from 'gfs-redux-bind-react'
import { LoadingBarComponent,MaskBarComponent,LoadingBar, Connect, fetching, FetchMiddleware } from 'gfs-loadingbar/lib/index.react'
import fetch from 'gfs-fetch'
import Mock from 'gfs-mock'

const loadingbar = new LoadingBar()
const mock = new Mock()

fetch.addMock(mock).addLoadingBar(loadingbar)

export default class RTools{

    constructor(props={
        middleware:[],
        module:null,
        reducers:[],
        devTools:null,
        bar:LoadingBarComponent,
        //pc or wap or other
        agent:'other',
        container:'root'
    }){

        let Bar = props.bar

        props.middleware = props.middleware || []
        props.reducers = props.reducers || []
        props.agent = props.agent || 'pc'
        props.container = props.container || 'root'
        
        if(props.agent === 'pc'){
            Bar = LoadingBarComponent
        }else if(props.agent === 'wap'){
            Bar = MaskBarComponent
        }

        render(
            <BindReact module={props.module} reducers={{...props.reducers, fetching}} middleware={[FetchMiddleware, ...props.middleware]} devTools={props.devTools}>
                <Connect>
                    <Bar />
                </Connect>
            </BindReact>,
            document.getElementById(props.container)
        )
    }

    static fetch(url,options){
        return fetch.run(url,options)
    }
    static addLoadingBar(loadingbar){
        fetch.addLoadingBar(loadingbar)
    }
    static addMock(mock){
        fetch.addMock(mock)
    }
}
