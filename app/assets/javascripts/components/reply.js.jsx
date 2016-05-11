// Text area and button to send a reply.

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
