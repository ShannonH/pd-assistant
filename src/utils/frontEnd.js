export const API = process.env.REACT_APP_API || 'http://localhost:3001';

export async function asyncFetch(method, endpoint, body, token) {
  let headers = {};
  token
    ? (headers = {
        'content-type': 'application/json',
        accept: 'application/json',
        authorization: 'Bearer ' + token
      })
    : (headers = {
        'content-type': 'application/json',
        'Access-Control-Allow-Headers': '*'
        //accept: 'application/json'
      });
  try {
    const response = await fetch(`${API}${endpoint}`, {
      method,
      body: body && JSON.stringify(body),
      headers
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
