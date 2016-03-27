var DeclinedTripPasses = React.createClass({
  render: function(){
    return(
        <h1>Declined Trip Passes</h1>
    )
  }
});

ReactDOM.render(
  <AcceptedTripPasses />,
  document.getElementById('declined')
);
