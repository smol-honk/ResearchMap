// TODO: Add Websocket to chat so it live updates

function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime()+ date.getTimezoneOffset() * 60 * 1000);
    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();
    newDate.setHours(hours - offset);
    return newDate;
}

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

var Message = React.createClass({
  render: function (){
    var date = convertUTCDateToLocalDate(new Date(this.props.data.created_at));
    return(
      <div className = "media">
        <div className = "pull-left">
          <img className = 'img-circle' height = '55' width='55' src = {this.props.data.sender.avatar.thumb.url} />
        </div>
        <div className = "media-body">
          <h6 className = "media-heading">
            {this.props.data.sender.name} says at {date.toString()}
          </h6>
          {this.props.data.body}
        </div>
      </div>
    );
  }
});


var Reply = React.createClass({
    getInitialState: function(){
      return {text: ''};
    },
    handleTextChange: function(e){
      this.setState({text: e.target.value});
    },
    handleSubmit: function(e){
      e.preventDefault();
      var text = this.state.text.trim();
      if (!text){
        return;
      }
      this.props.onReplySubmit(text);
      this.setState({text:''});
    },
    render: function(){
    return(
      <div className='form-group'>
        <form className = "replyForm" onSubmit = {this.handleSubmit}>
          <textarea rows = '4' required = "true" cols='50' className = 'form-control replyBody' type = 'text' id = "body" name = "body" placeholder = "Reply..." value = {this.state.text} onChange = {this.handleTextChange}/>
          <button className = 'btn btn-default' type = 'submit'>{this.props.button}</button>
        </form>
      </div>
    )
  }
});

ReactDOM.render(
  <Conversation />,
  document.getElementById('messages')
);
