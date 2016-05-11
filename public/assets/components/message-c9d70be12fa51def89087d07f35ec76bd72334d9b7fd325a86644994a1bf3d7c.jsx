// Message component, has the sender name, date and body

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
