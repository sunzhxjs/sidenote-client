import React, {Component} from 'react';
import ProfileBlurb from './ProfileBlurb';


export default class Message extends Component {
  	constructor(props){
  		super(props);
  		this.toggleSendform=this.toggleSendform.bind(this);
      this.activeButtonGroup = this.activeButtonGroup.bind(this);
      this.inactiveButtonGroup = this.inactiveButtonGroup.bind(this);
  		this.state = {toggle:false,isActive:false};
  	}

  	toggleSendform(){
  		this.setState({toggle:true})
  	}

    activeButtonGroup(){
      this.setState({isActive:true})
    }

    inactiveButtonGroup(){
      this.setState({isActive:false})
    }

  	render() {
        var content = this.props.message;
        var profile = this.props.profile;
       
        return  <button className="list-group-item" onClick={this.toggleSendform} onMouseEnter={this.activeButtonGroup} onMouseLeave={this.inactiveButtonGroup}>
                    <ProfileBlurb {...profile}/>
                    {(this.state.isActive && this.props.isYourMessage)? <a className="btn btn-primary pull-right" style={{"margin-left":"5px"}} >EDIT</a> : ''}
                    {(this.state.isActive && this.props.isYourMessage)? <a className="btn btn-primary pull-right" style={{"margin-left":"5px"}}>DELETE</a> : ''}
                    
                    
                    {this.state.toggle ? <div><input type="text" value={content} /></div>: <div>{content}</div> }
                </button> 
  	}
}


