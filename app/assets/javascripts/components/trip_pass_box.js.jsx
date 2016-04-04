var TripPassBox = React.createClass({
  getInitialState: function(){
    return {newPasses: this.props.newPasses, acceptPasses: this.props.acceptPasses, declinePasses: this.props.declinePasses};
  },
  componentDidMount: function(){
    this.getPassesFromServer();
  },
  componentWillMount: function(){
    this.getPassesFromServer();
  },
  getPassesFromServer: function(){
    $.ajax({
      url: Routes.trip_requests_path(),
      type: 'get',
      dataType: 'json',
      success: function(data){
        this.setState({acceptPasses: data.acceptPasses, declinePasses: data.declinePasses, newPasses: data.newPasses});
      }.bind(this),
      error: function(xhr, err, status){
        console.error(err.toString());
        console.error(xhr.status);
        console.error(xhr.responseText);
      }.bind(this)
    });
  },
  updateBox: function(){
    this.getPassesFromServer();
  },
  newRender: function(){
    if (this.state.newPasses.length === 0){
      return <h4>You don't have any new Trip Requests!</h4>;
    }
    else{
      return <NewTripPasses data = {this.state.newPasses} updateAll = {this.updateBox} />;
    }
  },
  acceptRender: function(){
    if (this.state.acceptPasses.length === 0){
      return <h4>You don't have any accepted Trip Requests!</h4>;
    }
    else{
      return <AcceptedTripPasses data = {this.state.acceptPasses} updateAll = {this.updateBox} />;
    }
  },
  declineRender: function(){
    if (this.state.declinePasses.length === 0){
      return <h4>You don't have any declined Trip Requests!</h4>;
    }
    else{
      return <DeclinedTripPasses data = {this.state.declinePasses} updateAll = {this.updateBox} />;
    }
  },
  render: function(){
    return(
      <div className ="trip_pass_box">
        <div aria-multiselectable="true" className="panel-group" id="accordion" role="tablist">
          <div className="panel panel-default">
            <div className="panel-heading" id="headingOne" role="tab">
              <h4 className="panel-title">
                <a aria-controls="collapseOne" aria-expanded="true" data-parent="#accordion" data-toggle="collapse" href="#collapseOne" role="button">
                  <i className="fa fa-exclamation-circle"></i>
                  New Trip Requests!
                </a>
              </h4>
            </div>
            <div aria-labelledby="headingOne" className="panel-collapse collapse in" id="collapseOne" role="tabpanel">
              <div className="panel-body">
                {this.newRender()}
              </div>
            </div>
          </div>
        </div>

        <div aria-multiselectable="true" className="panel-group" id="accordion" role="tablist">
          <div className="panel panel-default">
            <div className="panel-heading" id="headingTwo" role="tab">
              <h4 className="panel-title">
                <a aria-controls="collapseTwo" aria-expanded="true" data-parent="#accordion" data-toggle="collapse" href="#collapseTwo" role="button">
                  <i className="fa fa-check-circle"></i>
                  Accepted Trip Requests!
                </a>
              </h4>
            </div>
            <div aria-labelledby="headingTwo" className="panel-collapse collapse in" id="collapseTwo" role="tabpanel">
              <div className="panel-body">
                {this.acceptRender()}
              </div>
            </div>
          </div>
        </div>

        <div aria-multiselectable="true" className="panel-group" id="accordion" role="tablist">
          <div className="panel panel-default">
            <div className="panel-heading" id="headingThree" role="tab">
              <h4 className="panel-title">
                <a aria-controls="collapseThree" aria-expanded="true" data-parent="#accordion" data-toggle="collapse" href="#collapseThree" role="button">
                  <i className="fa fa-times-circle"></i>
                  Declined Trip Requests!
                </a>
              </h4>
            </div>
            <div aria-labelledby="headingThree" className="panel-collapse collapse in" id="collapseThree" role="tabpanel">
              <div className="panel-body">
                {this.declineRender()}
              </div>
            </div>
          </div>
        </div>
    </div>
    );
  }
});

ReactDOM.render(
  <TripPassBox />,
  document.getElementById('box')
);
