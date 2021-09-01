import React,{Component} from "react"
import "./App.css"
import Counter from "./components/Counter";
export default class App extends Component{
  constructor(props){
    super(props);
    this.state={
      mount:true,
      ignoreProp:0,
      seed:40,
      showErrorComponent:false
    }
    this.mountCounter = ()=>{this.setState({mount:true})}
    this.unmountCounter = ()=>{this.setState({mount:false})}

    this.ignoreProp = ()=>{this.setState({ignoreProp:Math.random()})}

    this.seedGenerator=()=>{this.setState({seed:Number.parseInt(Math.random()*100)})}

    this.toggleError=()=>this.setState({showErrorComponent:!this.state.showErrorComponent})

    this.cleaning=()=>this.setState({showErrorComponent:false})
  }
  render(){
    return (
      <div className="App">
        <button onClick={this.mountCounter} disabled={this.state.mount}>Mount</button>
        <button onClick={this.unmountCounter} disabled={!this.state.mount}>Unmount</button>
        <button onClick={this.ignoreProp}>IgnoreProp</button>
        <button onClick={this.seedGenerator}>Generate Seed</button>
        <button onClick={this.toggleError}>ToggleError</button>
        {this.state.mount ? 
        <Counter
        ignoreProp={this.state.ignoreProp}
        seed={this.state.seed}
        showErrorComponent={this.state.showErrorComponent}
        cleaning={this.cleaning}/> : null}
      </div>
    );
  }
}
