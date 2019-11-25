export const appCheck = () => {
  fetch(`/api/status`).then((response) => {
    if (response.status !== 200) {
      throw new Error('api server not running');
    } else {
      return response.json();
    }
  }).then((json) => {
    if (json.status === 'ok') {
      console.log('api server status -> OK!');
    }
  })
  .catch((err) => {
    console.error(err.message);
    console.error(err.stack);
  });
};
