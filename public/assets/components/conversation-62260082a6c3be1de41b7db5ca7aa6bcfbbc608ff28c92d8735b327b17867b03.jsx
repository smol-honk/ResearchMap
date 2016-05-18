//= require ./reply
//= require ./message_list


// TODO: Add Websocket to chat so it live updates

// Loads the entire conversation
var Conversation = React.createClass({
  getInitialState: function (){
    return {data: [], button: 'Send Message'};
  },
  componentDidMount: function (){
    this.loadMessagesFromServer();
    // setInterval(this.loadMessagesFromServer, this.props.pollInterval);
  },
  loadMessagesFromServer: function(){
    $.ajax({
      url: Routes.conversation_path(this.props.id),
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleMessageSubmit: function(message){
    this.setState({button: 'Sending...'});
    $.ajax({
      url: Routes.reply_conversation_path(this.props.id),
      type: 'POST',
      data: {body: message},
      success: function(data){
          // alert("success!");
          this.setState({button: 'Send Message'});
          this.loadMessagesFromServer();
      }.bind(this),
      error: function(xhr, status, err){
        alert("An Error Occured!");
        console.error(err.toString());
        console.error(xhr.status);
        console.error(xhr.responseText);
        this.loadMessagesFromServer();
      }.bind(this)
    });
    this.loadMessagesFromServer();
  },
  render: function(){
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">
            {this.props.subject}
          </div>
          <div className="panel-body">
            <div className="messages">
              <MessageList data={this.state.data}/>
            </div>
          </div>
        </div>
          <Reply button = {this.state.button} onReplySubmit = {this.handleMessageSubmit}/>
      </div>
    )
  }
});
