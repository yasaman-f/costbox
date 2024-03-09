const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @param {string} userID
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist(userID) {
  try {
    const tokenFilePath = path.join(process.cwd(), `token_${userID}.json`);
    const content = await fs.readFile(tokenFilePath);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @param {string} userID
 * @return {Promise<void>}
 */
async function saveCredentials(client, userID) {
  const tokenFilePath = path.join(process.cwd(), `token_${userID}.json`);
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    user: userID,
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(tokenFilePath, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 * @param {string} userID
 */
async function authorize(userID) {
  let client = await loadSavedCredentialsIfExist(userID);
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client, userID);
  }
  return client;
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param {Object} eventData Event data including summary, dateTime, and description.
 */
async function createEvent(auth, eventData) {
  const calendar = google.calendar({ version: 'v3', auth });
  console.log(eventData);

  const newEvent = {
    'summary': eventData.summary,
    'location': eventData.location || '',
    'description': eventData.description,
    'start': {
      'dateTime': eventData.startDateTime,
      'timeZone': eventData.timeZone || 'Asia/Tehran',
    },
    'end': {
      'dateTime': eventData.endDateTime,
      'timeZone': eventData.timeZone || 'Asia/Tehran',
    },
    'reminders': {
      'useDefault': false,
      'overrides': [
        { 'method': 'email', 'minutes': eventData.emailReminderMinutes || 24 * 60 },
        { 'method': 'popup', 'minutes': eventData.popupReminderMinutes || 10 },
      ],
    },
  };

  calendar.events.insert({
    auth: auth,
    calendarId: 'primary',
    resource: newEvent,
  }, function(err, event) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', event.htmlLink);
  });
}

/**
 * Create event using provided data for the given user.
 * @param {string} userID The ID of the user.
 * @param {string} summary Summary of the event.
 * @param {string} location Location of the event.
 * @param {string} description Description of the event.
 * @param {string} startDateTime Start date and time of the event.
 * @param {string} endDateTime End date and time of the event.
 */
async function VOGC(userID, summary, description, startDateTime, endDateTime) {
    authorize(userID).then(async (auth) => {
      const eventData = {
        summary: summary,
        location: "",
        description: description,
        startDateTime: startDateTime,
        endDateTime: endDateTime,
        timeZone: 'Asia/Tehran',
        emailReminderMinutes: 24 * 60, 
        popupReminderMinutes: 10,
      };
    
      await createEvent(auth, eventData);
    }).catch(console.error);
}

module.exports = {
    VOGC    
}
