import React,{Component} from "react"

// const ErrorComponent =() => {<div>{prop.hello}</div>}
class ErrorComponent extends Component{
    render(){
        return new Error("I am an Error")
        // return <div>{this.prop.hello}</div>
    }
}

export default class Counter extends Component{
    constructor(props){
        console.log("Constructor Called")
        super(props);
        this.state={
            counter:0,
            seed:0,
            initializing:true
        }
        this.increment=()=>{this.setState({counter:this.state.counter+1})}
        this.decrement=()=>{this.setState({counter:this.state.counter-1})}
    }
    static getDerivedStateFromProps(props,state){
        if(props.seed && state.seed !== props.seed ){
            return{
                seed:props.seed,
                counter:props.seed
            }
        }
        return null;

    }

    componentDidMount(){
        console.log("Component Did Mount");
        setTimeout(()=>{
            this.setState({initializing:false})
        },500)
        console.log("-------------------");
    }
    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.ignoreProp &&
            this.props.ignoreProp !== nextProps.ignoreProp){
                console.log("shouldComponentUpdate --DONT RENDER")
                console.log("-------------------");
                return false
            }
            console.log("shouldComponentUpdate --RENDER")
            console.log("-------------------");
            return true
    }
    getSnapshotBeforeUpdate(prevProps,prevState){
        console.log("getSnapshotBeforeUpdate")
        return null//sent to componentDidUpdate(,,snapshot)
    }
    
  render(){
    console.log("Render");
    if(this.state.initializing){
        return <div>Initializing....</div>
    }
    if(this.props.showErrorComponent && this.state.error){
        return <div>We have encountered an error! 
            <p>{this.state.error.message}</p>
            </div>
    }
    else{
        return <div>
            <button onClick={this.increment}>Increment</button>
            <button onClick={this.decrement}>Decrement</button>
        <div className="Counter"> 
        Counter: {this.state.counter}
            </div>
        {this.props.showErrorComponent ? <ErrorComponent/> : null}
        </div>

    }
    
  }
  componentDidUpdate(prevProps,prevState,snapshot){
    console.log("Component Did Update");
    console.log("-------------------");

}
componentWillUnmount(){
    console.log("Component Will Unmount")
    console.log("cleaning() called")
    this.props.cleaning()
    console.log("-------------------");

}
componentDidCatch(error,info){
    console.log("componentDidCatch");
    this.setState({error,info});
    
}
}


