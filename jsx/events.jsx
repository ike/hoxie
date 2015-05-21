/** @jsx React.DOM */
      var EventList = React.createClass({
        render: function() {
          var createEvent = function(event, index) {
            return (
              <li className="event" key={ index }>
                <h3 className="event-title">{ event.title }</h3>
                <div className="event-date">{ event.date }</div>
                <p className="event-description">{ event.description }</p>
              </li>);
          };
          return <ul>{ this.props.events.map(createEvent) }</ul>;
        }
      });
      
      var EventApp = React.createClass({
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
            <div>
              <EventList events={ this.state.events } />
              <form onSubmit={ this.handleSubmit }>
                <h4 className="input-label">Post your own Event:</h4>
                <input className="input-title" onChange={ this.onChange } value={ this.state.title } name="title" placeholder="Title" />
                <input className="input-date" onChange={ this.onChange } value={ this.state.date } name="date" placeholder="Date" />
                <textarea className="input-description" onChange={ this.onChange } value={ this.state.description } name="description" placeholder="Description" />
                <button className="input-button">Add Event</button>
              </form>
            </div>
          );
        }
      });
      
      React.render(<EventApp />, document.getElementById("events"));