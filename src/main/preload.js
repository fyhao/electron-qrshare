const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    publishEvent(channel, data) {
      // console.log('in preload publishEvent: ' + channel + ', ' + JSON.stringify(data));
      ipcRenderer.send(channel, data);
    },
    on(channel, func) {
      const validChannels = ['ipc-example', 'testReply'];
      if (true || validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ['ipc-example', 'testReply'];
      if (true || validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
});
