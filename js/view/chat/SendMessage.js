import React, {Component} from 'react';
import {render} from 'react-dom';
import UtilModalWrapper from './UtilModalWrapper';

export default class SendMessageForm extends Component{	
	constructor(props){
		super(props);
		//console.log(props);
		this.handleSend=this.handleSend.bind(this);
		this.handleChangeName=this.handleChangeName.bind(this);
		this.handleChangeNameModal=this.handleChangeNameModal.bind(this);
        this.handleEnterPress= this.handleEnterPress.bind(this);
		this.socket = this.props.socket;
	}

    handleEnterPress(evt){
        //console.log("press");
        if (evt.key==='Enter')
        {
            this.handleSend();
        }
    }

	handleSend(){
		
		//console.log(socket);
		if (this.refs.sendform.value.trim()!=''){
		var message={}
		console.log(this.props.userid);
		message["profile"]=this.props.userid;
		message["content"]=this.refs.sendform.value.trim();
		this.refs.sendform.value='';
		this.refs.sendform.focus();
        var old_messages=this.props.messages._new;
        //console.log(old_messages);
        var new_messages=old_messages.concat(message);
        //console.log(new_messages);
		this.props.onNewMessage(new_messages);
		this.socket.emit('newMessage',message);
		}
	}

	handleChangeName(newName){
		//console.log(newName);
		const socket = this.props.socket;
		var new_profiles = this.props.profiles;
		new_profiles[this.props.userid].username = newName;
		this.props.onNewName(new_profiles);
		this.socket.emit('newName',{id:this.props.userid,newName:newName});
	}

	handleChangeNameModal(){
		var params={
        	isSubmit: true,
            title:'Change Username'
		};
		render(<UtilModalWrapper onModalNewName={this.handleChangeName}  {...params}/> , document.getElementById('modalContainer'));
    }

    

	render(){
		return (
			<div className="row" style={{margin:'25'}}>
				<div className="input-group">
					<div className="input-group-btn">
						<button type="button" className="btn btn-default" data-toggle="modal" data-target="#modalContainer" onClick={this.handleChangeNameModal}>Change Username</button>
					</div>
	 			 	<input type="text" ref="sendform" className="form-control" placeholder="Send your message" aria-label="..." onKeyPress={this.handleEnterPress}/>
	  			 	<div className="input-group-btn">
	  			 		<button type="button" className="btn btn-default" onClick={this.handleSend}>Send</button>
	    				<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="caret"></span></button>
	        			<ul className="dropdown-menu dropdown-menu-right">
	         		 	<li><a href="#">Action 1</a></li>
	         		 	<li><a href="#">Action 2</a></li>
	         		 	<li><a href="#">Action 3</a></li>
	          		 	<li role="separator" className="divider"></li>
	          		 	<li><a href="#">Another Action</a></li>
	        			</ul>
	  				</div>
				</div>
			</div>
			);
	}

}