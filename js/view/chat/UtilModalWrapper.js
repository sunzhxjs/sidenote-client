import React, {Component} from 'react';

export default class UtilModalWrapper extends Component {
    constructor(props){
        super(props);
        
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    
    handleSubmit(){
        var newName = this.refs.username.value;
        this.props.onModalNewName(newName);
    }

    render(){
        var {body , title, isSubmit} = this.props
        return  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title" id="myModalLabel">{title}</h4>
                        </div>
                        <div className="modal-body">
                            {isSubmit? <input type="text" ref="username" className="form-control" aria-label="..."/> : body}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            {isSubmit? <button type="button" className="btn btn-primary" onClick={this.handleSubmit.bind(this)} data-dismiss="modal">Submit</button> : ''}
                        </div>
                    </div>
                </div>
    }
}