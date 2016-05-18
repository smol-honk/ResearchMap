//= require ./message

// Holds all messages.

var MessageList = React.createClass({
    render: function(){
        var messageNodes = this.props.data.map(function(mess){
          return (
            <div className = "message" key = {mess.id}>
                <Message data={mess} key = {mess.id}/>
            </div>
          );
        });
        return(
        <div className = 'messageList'>
          {messageNodes}
        </div>
      );
    }
});
