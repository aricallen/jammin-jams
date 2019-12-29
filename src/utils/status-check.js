export const statusCheck = () => {
  fetch(`/api/status`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('api server not running');
      } else {
        return response.json();
      }
    })
    .then((json) => {
      console.log('api server status -> OK!');
      if (json.db === 'ok') {
        console.log('db status -> OK!');
      } else {
        console.error('db not connected!');
        console.error(json.error);
      }
    })
    .catch((err) => {
      console.error(err.message);
      console.error(err.stack);
    });
};
