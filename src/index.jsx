import React from 'react'
import { hydrate } from 'react-dom'

import grbr from 'gfs-redux-bind-react'
import { /*LoadingBarComponent,MaskBarComponent,*/LoadingBar, Connect, fetching, FetchMiddleware } from 'gfs-loadingbar/lib/index.react'
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
        bar:null,
        //pc or wap or other
        agent:'other',
        container:'root'
    }){

        let Bar = props.bar || null

        props.middleware = props.middleware || []
        props.reducers = props.reducers || []
        props.agent = props.agent || 'pc'
        props.container = props.container || 'root'
        
        // if(props.agent === 'pc'){
        //     Bar = <LoadingBarComponent />
        // }else if(props.agent === 'wap'){
        //     Bar = <MaskBarComponent />
        // }
        this.props = props
        this.Bar = Bar
        this.store = this.initStore()
        
    }

    render(params={} ){
        const _this = this
        this.bindReactProps ={...this.bindReactProps,...params}// Object.assign({},this.bindReactProps,params)
        let props = this.bindReactProps
        if(props.isServerRender){
            return this.renderServer()
        }
        if(typeof(document)!='undefined' ){
            if(props.routerMatch){
                let config = props.routerMatchConfig
                //this.renderMainDom()
                props.routerMatch({history: props.routerHistory, routes:config}, (error, redirectLocation, renderProps) => {
                    // _this.props.renderProps = renderProps
                    // _this.getStore()
                    _this.bindReactProps.moduleProps = renderProps
                    hydrate(
                        _this.renderMainDom(),
                        document.getElementById(props.container)
                    )
                })
            }else{
                // _this.getStore()
                hydrate(
                    _this.renderMainDom(),
                    document.getElementById(props.container)
                )
            }
        }
    }

    getStore(){
        return this.store
    }
    initStore(){
        const {renderProps,module,reducers,middleware,initialState,devTools,...others}=this.props
        let p = {
            module:module,
            moduleProps:renderProps ||{},
            reducers:{...reducers, fetching} ,
            middleware:[FetchMiddleware, ...middleware],
            initialState:initialState,
            devTools:devTools,
            ...others
        }
        let grbrObj=grbr(p)
        this.grbrObj = grbrObj

        var s = grbrObj.bindStore({...p} )
        p.stories = s
        this.bindReactProps = p
        return s
    }
    renderMainDom(){
        // const {renderProps,module,reducers,middleware,initialState,devTools,...others}=this.props
        // let p = {
        //     module:module,
        //     moduleProps:renderProps ||{},
        //     reducers:{...reducers, fetching} ,
        //     middleware:[FetchMiddleware, ...middleware],
        //     initialState:initialState,
        //     devTools:devTools,
        //     ...others
        // }
        // let grbrObj=grbr(p)
        // p.stories = grbrObj.getStore()
        // this.store = p.stories
        let BindReact = this.grbrObj.getComponent()
        return <BindReact {...this.bindReactProps}>
            <Connect>
                {this.Bar}
            </Connect>
        </BindReact>
    }

    renderServer( ){
        let {renderToString} = require('react-dom/server')
        return renderToString(
            this.renderMainDom()
        )
    }

    static fetch(url,options){
        return fetch.run(url,options)
    }
    static addLoadingBar(loadingbar){
        //fetch.addLoadingBar(loadingbar)
    }
    static addMock(mock){
        fetch.addMock(mock)
    }
}
