import React, {Component} from 'react';
import Message from './Message';


export default class UtilMessageListWrapper extends Component {
    render(){
        var {isNew , messages, profiles , userid} = this.props,
            highlight = isNew?'success':'info';

        //console.log(profiles);

        return  <div>
                    <button className={`list-group-item list-group-item-${highlight}`}>
                        {isNew?'New':''} Messages
                    </button>
                    
                    {messages.map((message , i)=>{ // react hates lists without a "key" prop
                        //console.log(message.profile);
                        let isYourMessage = (message.profile == userid);
                        //console.log(isYourMessage);
                        console.log(message.profile,userid);
                        return <Message {...{message:message.content, profile:profiles[message.profile], isYourMessage:isYourMessage, key:`message${i}`}} />
                    })}
                </div>
    }
}


