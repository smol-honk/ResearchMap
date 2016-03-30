var DeclinedTripPasses = React.createClass({
  getInitialState: function(){
    return {data: [], btn: 'Accept'};
  },
  getDefaultProps: function(){
    return {data:[], btn: 'Accept'};
  },
  componentDidMount: function(){
    this.loadTripsFromServer();
  },
  loadTripsFromServer: function(){
    $.ajax({
      url: Routes.declined_passes_path(),
      type: 'get',
      dataType: 'json',
      success: function(data){
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(err.toString());
        console.error(xhr.status);
        console.error(xhr.responseText);
      }.bind(this)
    });
  },
  onHandleAccept: function(id){
    this.setState({btn: 'Accepting...'});
    $.ajax({
      url: Routes.trip_pass_accept_path(id),
      type: 'post',
      success: function(data){
        this.loadTripsFromServer();
        this.setState({btn: 'Accept'});
        this.props.updateAll();
      }.bind(this),
      error: function(xhr, status, err){
        alert("An Error Occured!");
        console.error(err.toString());
        console.error(xhr.status);
        console.error(xhr.responseText);
        this.loadTripsFromServer();
      }.bind(this)
    });
  },
  onHandleDecline: function(id){
    this.setState({btn: 'Declining...'});
    $.ajax({
      url: Routes.trip_pass_decline_path(id),
      type: 'post',
      success: function(data){
        this.loadTripsFromServer();
        this.setState({btn: "Decline"});
        this.props.updateAll();
      }.bind(this),
      error: function(xhr, status, err){
        alert("An Error Occured!");
        console.error(err.toString());
        console.error(xhr.status);
        console.error(xhr.responseText);
        this.loadTripsFromServer();
      }.bind(this)
    });
  },
  render: function(){
    return(
      <Trip_Pass_List_One btn = {this.state.btn} data={this.state.data} handleAccept = {this.onHandleAccept} handleDecline = {this.onHandleDecline}/>
    );
  }
});

ReactDOM.render(
  <DeclinedTripPasses />,
  document.getElementById('declined')
);
