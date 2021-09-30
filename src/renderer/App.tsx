import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.global.css';
import { useState } from 'react';





/*
window.electron.ipcRenderer.on('testReply', (data) => {
  // console.log('App.tsx testReply: ' + JSON.stringify(data));
});
*/
const Hello = () => {
  const [count, setCount] = useState(0);
  const [qrcodeimg, setQrcodeimg] = useState('');
  function handleTest() {
    window.electron.ipcRenderer.publishEvent('performTest', { test: 12 });
    window.electron.ipcRenderer.publishEvent('startServer', { });
    window.electron.ipcRenderer.once('responseServerURL', (data) => {
  	  console.log('response server url: ' + JSON.stringify(data));
  	  var qrcodeurl = data.qrcodeurl;
	  setQrcodeimg(qrcodeurl);
    });
    setCount(count + 1);
  }

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
		<p>{count}</p>
        <button type="button" onClick={handleTest}>
          Test
        </button>
		<img src={qrcodeimg} />
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
