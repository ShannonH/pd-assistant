import * as graph from '@microsoft/microsoft-graph-client';

function getAuthenticatedClient(accessToken) {
  // Initialize Graph client
  return graph.Client.init({
    // Use the provided access token to authenticate
    // requests
    authProvider: done => {
      done(null, accessToken.accessToken);
    }
  });
}

export async function getUserDetails(accessToken) {
  const client = getAuthenticatedClient(accessToken);

  return await client.api('/me').get();
}

export async function getUserAvatar(accessToken) {
  const client = getAuthenticatedClient(accessToken);
  const avatarBlob = await client.api('/me/photos/48x48/$value').get();
  return URL.createObjectURL(avatarBlob);
}

export async function getEvents(accessToken) {
  const client = getAuthenticatedClient(accessToken);

  return await client
    .api('/me/events')
    .select('subject,organizer,start,end')
    .orderby('createdDateTime DESC')
    .get();
}
