/** @jsx React.DOM */
      var EventList = React.createClass({displayName: "EventList",
        render: function() {
          var createEvent = function(event, index) {
            return (
              React.createElement("li", {className: "event", key:  index }, 
                React.createElement("h3", {className: "event-title"},  event.title), 
                React.createElement("div", {className: "event-date"},  event.date), 
                React.createElement("p", {className: "event-description"},  event.description)
              ));
          };
          return React.createElement("ul", null,  this.props.events.map(createEvent) );
        }
      });
      
      var EventApp = React.createClass({displayName: "EventApp",
        mixins: [ReactFireMixin],
      
        getInitialState: function() {
          return {events: [], title: ""};
        },
      
        componentWillMount: function() {
          var firebaseRef = new Firebase("https://glowing-inferno-261.firebaseIO.com/events/");
          this.bindAsArray(firebaseRef.orderByChild("date"), "events");
        },
      
        onChange: function(e) {
          var change = {};
          change[e.target.name] = e.target.value;
          
          this.setState(change);
        },
      
        handleSubmit: function(e) {
          e.preventDefault();
          if (this.state.title && this.state.title.trim().length !== 0) {
            this.firebaseRefs["events"].push({
              title: this.state.title,
              date: this.state.date,
              description: this.state.description
            });
            this.setState({
              title: "", 
              date: "",
              description: ""
            });
          }
        },
      
        render: function() {
          return (
            React.createElement("div", null, 
              React.createElement(EventList, {events:  this.state.events}), 
              React.createElement("form", {onSubmit:  this.handleSubmit}, 
                React.createElement("h4", {className: "input-label"}, "Post your own Event:"), 
                React.createElement("input", {className: "input-title", onChange:  this.onChange, value:  this.state.title, name: "title", placeholder: "Title"}), 
                React.createElement("input", {className: "input-date", onChange:  this.onChange, value:  this.state.date, name: "date", placeholder: "Date"}), 
                React.createElement("textarea", {className: "input-description", onChange:  this.onChange, value:  this.state.description, name: "description", placeholder: "Description"}), 
                React.createElement("button", {className: "input-button"}, "Add Event")
              )
            )
          );
        }
      });
      
      React.render(React.createElement(EventApp, null), document.getElementById("events"));