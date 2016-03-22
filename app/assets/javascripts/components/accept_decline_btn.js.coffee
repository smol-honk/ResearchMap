@AcceptDeclineBtn = React.createClass
  getInitialState: ->
    buttons: @props.data
  getDefaultProps: ->
    buttons: []
  handleClicked: (e) ->

  render: ->
    React.DOM.div
      className: "btn-group"
      React.DOM.button
        className: "btn btn-default"
