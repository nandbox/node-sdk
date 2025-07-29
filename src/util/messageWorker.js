const { parentPort } = require('worker_threads');
parentPort.on('message', (data) => {
  try {
    const obj = JSON.parse(data.msg);
    const method = obj.method;

    parentPort.postMessage({ method, obj });
  } catch (err) {
    parentPort.postMessage({ error: err.message });
  }
});