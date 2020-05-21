const functions = require('firebase-functions');
const cors = require('cors')({
  origin: true
});
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mia-test-sgwxam.firebaseio.com"
});

const db = admin.firestore()


const {
  SessionsClient
} = require('dialogflow');

exports.dialogflowGateway = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const {
      queryInput,
      sessionId
    } = request.body;


    const sessionClient = new SessionsClient({
      credentials: serviceAccount
    });
    const session = sessionClient.sessionPath('mia-test-sgwxam', sessionId);


    const responses = await sessionClient.detectIntent({
      session,
      queryInput
    });

    const result = responses[0].queryResult;

    response.send(result);

  });
});

const {
  WebhookClient
} = require('dialogflow-fulfillment');

exports.dialogflowWebhook = functions.https.onRequest(async (request, response) => {
  const agent = new WebhookClient({
    request,
    response
  });

  const result = request.body.queryResult;


  async function userOnboardingHandler(agent) {

    // Do backend stuff here
    const db = admin.firestore();
    // STORE USER_ID HERE TO UPDATE DB BASED ON USER
    const profile = db.collection('users').doc('it3gcWfiUOcAS2K1g7ciiP7aSXw1');

    const {
      firstname,
      lastname,
      age
    } = result.parameters;

    await profile.set({
      firstname,
      lastname,
      age
    })
    agent.add('Welcome aboard my friend!');
  }


  let intentMap = new Map();
  intentMap.set('UserOnboarding', userOnboardingHandler);
  agent.handleRequest(intentMap);
});


//Firestore trigger, Creating user information in user-infos

exports.createUser = functions.firestore
  .document('users/{userId}')
  .onCreate((snap, context) => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const newValue = snap.data();

    db.collection('users-info').doc(context.params.userId).set(newValue)

  });

//Firestore trigger, updating user information in user-infos
exports.updateUser = functions.firestore
  .document('users/{userId}')
  .onUpdate((change, context) => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const newValue = change.after.data();

    // ...or the previous value before this update
    //const previousValue = change.before.data();

    db.collection('users-info').doc(context.params.userId).set(newValue, {merge: true})


  });

//Deleting information
  // exports.deleteUser = functions.firestore
  //   .document('users/{userID}')
  //   .onDelete((snap, context) => {
  //     // Get an object representing the document prior to deletion
  //     // e.g. {'name': 'Marie', 'age': 66}
  //     const deletedValue = snap.data();

  //     // perform desired operations ...
  //   });
