import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.global.css';

function handleTest() {
  window.electron.ipcRenderer.publishEvent('performTest', { test: 12 });
  window.electron.ipcRenderer.publishEvent('startServer', { });
  window.electron.ipcRenderer.once('responseServerURL', (data) => {
	  console.log('response server url: ' + JSON.stringify(data));
	  alert(data.url);
  });
}

/*
window.electron.ipcRenderer.on('testReply', (data) => {
  // console.log('App.tsx testReply: ' + JSON.stringify(data));
});
*/
const Hello = () => {
  return (
    <div>
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs !!
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              🙏
            </span>
            Donate
          </button>
        </a>
        <hr />
        <button type="button" onClick={handleTest}>
          Test
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
