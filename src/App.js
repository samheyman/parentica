import React, { Component } from 'react';
import './styles/App.scss';
import Main from './components/Main';
import { CLASSES } from './shared/classes';
// const store = ConfigureStore();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      classes: CLASSES
    }
  }
  
  render() {
    return (
      // <Provider store={store}>
      //   <BrowserRouter>
          <div className="App">
            <Main classes={this.state.classes} />
          </div>
      //   </BrowserRouter>
      // </Provider>
    );
  }
}

export default App;
