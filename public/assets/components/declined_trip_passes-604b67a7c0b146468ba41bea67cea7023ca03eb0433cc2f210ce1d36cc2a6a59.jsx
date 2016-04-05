var DeclinedTripPasses = React.createClass({
  getInitialState: function(){
    return {data: this.props.data, btn: 'Accept'};
  },
  onHandleAccept: function(id){
    this.setState({btn: 'Accepting...'});
    $.ajax({
      url: Routes.trip_pass_accept_path(id),
      type: 'post',
      success: function(data){
        this.setState({btn: 'Accept'});
        this.props.updateAll();
      }.bind(this),
      error: function(xhr, status, err){
        alert("An Error Occured!");
        console.error(err.toString());
        console.error(xhr.status);
        console.error(xhr.responseText);
      }.bind(this)
    });
  },
  render: function(){
    return(
      <Trip_Pass_List_One btn = {this.state.btn} data={this.props.data} handleAccept = {this.onHandleAccept} handleDecline = {this.onHandleDecline}/>
    );
  }
});

ReactDOM.render(
  <DeclinedTripPasses data= {this.data} />,
  document.getElementById('declined')
);
