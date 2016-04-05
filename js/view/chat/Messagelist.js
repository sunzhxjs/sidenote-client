import React, {Component} from 'react';

import UtilMessageListWrapper from './UtilMessageListWrapper';

export default class Messagelist extends Component {
  	render() {
        var {old , _new} = this.props.messages;
        console.log(this.props.userid);
        //console.log(this.props.profiles);
        return  <div className="list-group" style={{margin:'25px'}}>
                    <UtilMessageListWrapper {...{messages:old, profiles:this.props.profiles, userid:this.props.userid}}/>
                    
                    {/*only render if we have _new messages*/}
                    {_new.length? 
                        <UtilMessageListWrapper {...{messages:_new , isNew:true, profiles:this.props.profiles,userid:this.props.userid}}/>
                    :''}
                </div>
  	}
}


