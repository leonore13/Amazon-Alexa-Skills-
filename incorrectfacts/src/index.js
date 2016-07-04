/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This is a incorrect fact generating skill that is templated off of Amazon's sample Space Geek program
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space facts.
 */
var FACTS = [
    "Eating cheese fourteen times a day increases your IQ by 36 points. That's a lot of points.",
    "Doing somersaults backwards burns more calories than doing them forwards.",
    "Microwaving water transforms it into hydrogen peroxide, which will melt your insides.",
    "Brocolli is just a tiny tree.",
    "Studies have shown that giving high fives increases your chances of getting slapped in the face."

];

/**
 * The AlexaSkill prototype and helper functions
 * Use require to import other code
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var IncorrectFact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
IncorrectFact.prototype = Object.create(AlexaSkill.prototype);
IncorrectFact.prototype.constructor = IncorrectFact;

IncorrectFact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("IncorrectFact onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

IncorrectFact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("IncorrectFact onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
IncorrectFact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("IncorrectFact onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

IncorrectFact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "See you soon";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "See you soon";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random incorrect fact from the space facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Ahem: " + randomFact;
    var cardTitle = "Your fact:";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the IncorrectFacts skill.
    var incorrectFact = new IncorrectFact();
    incorrectFact.execute(event, context);
};

