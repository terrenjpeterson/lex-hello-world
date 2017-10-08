'use strict';

 /**
  * This is a bot that acts as a basic hello world
  */

// --------------- Helpers that build all of the responses -----------------------


function elicitSlot(sessionAttributes, intentName, slots, slotToElicit, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'ElicitSlot',
            intentName,
            slots,
            slotToElicit,
            message,
        },
    };
}

function confirmIntent(sessionAttributes, intentName, slots, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'ConfirmIntent',
            intentName,
            slots,
            message,
        },
    };
}

function close(sessionAttributes, fulfillmentState, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message,
        },
    };
}

function delegate(sessionAttributes, slots) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Delegate',
            slots,
        },
    };
}

// ---------------- Helper Functions --------------------------------------------------

function buildValidationResult(isValid, violatedSlot, messageContent) {
    return {
        isValid,
        violatedSlot,
        message: { contentType: 'PlainText', content: messageContent },
    };
}

// this function is what builds the introduction

function getIntroduction(intentRequest, callback) {
    const sessionAttributes = intentRequest.sessionAttributes || {};
    const slots = intentRequest.currentIntent.slots;

    var counterResponse = 'Hello. I am a chatbot that can assist you.';

    callback(close(sessionAttributes, 'Fulfilled',
        { contentType: 'PlainText', content: counterResponse }));

}

// this function is what builds the wrap-up of a conversation

function endConversation(intentRequest, callback) {
    const sessionAttributes = intentRequest.sessionAttributes || {};

    var counterResponse = 'Thanks for checking in. Have a nice day! ';

    callback(close(sessionAttributes, 'Fulfilled',
        { contentType: 'PlainText', content: counterResponse }));
        
}

// this function is what builds the response to a request for help

function getHelp(intentRequest, callback) {
    const sessionAttributes = intentRequest.sessionAttributes || {};

    var counterResponse = 'This is the Hello World chatbot. ' +
        'Please let me know how I can help by responding with something like ' +
        'Hello or Goodbye.';

    callback(close(sessionAttributes, 'Fulfilled',
        { contentType: 'PlainText', content: counterResponse }));
        
}

// this function is what validates what information has been provided

function validateSomething(intentRequest, callback) {
    const sessionAttributes = intentRequest.sessionAttributes || {};
    const slots = intentRequest.currentIntent.slots;

    //const slotData = intentRequest.currentIntent.slots.xxx;

    var passedValidation = false;

    // check the data passed validation then provide a valid callback
    if (passedValidation) {
        
        callback(delegate(sessionAttributes, intentRequest.currentIntent.slots));

    } else {

        // format error message to be returned
        var errorMessage = 'No Data Provided';
        //const errorSlot = 'TBD';
        
        // call helper function to format JSON for error response
        const validationResult = buildValidationResult(false, errorSlot, errorMessage);
        console.log("Validation Result: " + JSON.stringify(validationResult));

        callback(elicitSlot(sessionAttributes, intentRequest.currentIntent.name,
            slots, validationResult.violatedSlot, validationResult.message));

    }
}

// --------------- Intents -----------------------

/**
 * Called when the user specifies an intent for this skill.
 */
function dispatch(intentRequest, callback) {
    // console.log(JSON.stringify(intentRequest, null, 2));
    console.log(`dispatch userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);

    const intentName = intentRequest.currentIntent.name;
    const intentSource = intentRequest.invocationSource;

    console.log("Data Provided: " + JSON.stringify(intentRequest));

    // Dispatch to the skill's intent handlers
    if (intentName === 'Welcome') {
        console.log("friendly introduction.");
        return getIntroduction(intentRequest, callback);
    } else if (intentName === 'Closing') {
        console.log("wrap-up conversation requested.");
        return endConversation(intentRequest, callback);
    } else if (intentName === 'Thanks') {
        console.log("received thank you from user.");
        return endConversation(intentRequest, callback);
    } else if (intentName === 'Help') {
        console.log("user requested help.");
        return getHelp(intentRequest, callback);
    }
    
    throw new Error(`Intent with name ${intentName} not supported`);
}

// --------------- Main handler -----------------------

function loggingCallback(response, originalCallback) {
    // console.log(JSON.stringify(response, null, 2));
    originalCallback(null, response);
}

// Route the incoming request based on intent.
// The JSON body of the request is provided in the event slot.
exports.handler = (event, context, callback) => {
    try {
        // By default, treat the user request as coming from the America/New_York time zone.
        process.env.TZ = 'America/New_York';
        console.log(`event.bot.name=${event.bot.name}`);

        // remember to enter your bot name here
        if (event.bot.name != 'HelloWorld') {
             console.log('Invalid Bot Name');
        }
        dispatch(event, (response) => loggingCallback(response, callback));
    } catch (err) {
        callback(err);
    }
};
