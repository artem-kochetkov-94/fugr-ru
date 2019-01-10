export default function callApi(endpoint) {
  return fetch(`http://www.filltext.com/${endpoint}`)
    .then(response => response.json())
    .then(json => {
      return json;
    });
}
