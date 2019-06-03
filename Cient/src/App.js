import React, {Component} from 'react';
import AuthContextContainer from './Context/AuthContext.js';
import ContentContextContainer from './Context/ContentContext.js';
import Routers from './Routers';

class App extends Component {
  render() {
    return (
        <div>
          <AuthContextContainer>
            <ContentContextContainer>
              <Routers/>
            </ContentContextContainer>
          </AuthContextContainer>
        </div>
    );
  }
}

export default App;