import { Machine, assign } from "xstate";
import { isYes, isNoOrImprove, submit } from "./utils";

export const feedbackMachine = Machine(
  {
    id: "feedback-machine",
    initial: "idle",
    // context values - same as state in redux/react
    //initial feedback is yes/no/anything we can improve
    //payload sent to api
    context: {
      initialFeedback: null,
      payload: {}
    },
    states: {
      idle: {
        // 'on' is a state transition property
        //https://xstate.js.org/docs/guides/transitions.html#api

        on: {
          SUBMIT: [
            {
              // move to the 'submitting' state
              target: "submitting",
              // Update context (like setState) with button value
              // Action is behaviour you want to perform
              // actions are fire and forget - you aren't expecting anything back
              // actions: https://xstate.js.org/docs/guides/actions.html
              actions: assign({ initialFeedback: (_ctx, e) => e.value })
            }
          ]
        }
      },
      submitting: {
        // invoke keyword used to invoke a promise,callback and other machines etc
        // anything that is delayed and waits for messages/ errors
        invoke: {
          // ID used if you want to get to parent states from child states
          // #submitinitial.initialSuccess
          //https://xstate.js.org/docs/guides/communication.html#invoking-promises
          id: "submitinitial",
          //  invoke a promise when entering this state
          // 'submit' is a function that returns a promise
          src: (ctx) => submit(ctx),

          // tracks promise state once fulfilled: success
          onDone: [
            {
              target: "initialSuccess",
              // Update context (like setState) with button value
              actions: assign({
                initialFeedback: (context, event) => event.value
              }),
              // What condition to transition to next state (must be  'Yes' button )
              // function should return true of false
              // https://xstate.js.org/docs/guides/guards.html
              //only transition to initialSuccess if 'Yes' is selected
              cond: isYes
            },
            {
              target: "formPanel",
              // Update context (like setState) with button value
              actions: assign({
                initialFeedback: (context, event) => event.value
              }),
              // What condition to transition to next state (must be No or Improve button)
              cond: isNoOrImprove
            }
          ],
          // tracks promise state once fulfilled: error
          onError: {
            target: "initialError",
            //Assign error to context
            actions: assign({ error: (context, event) => event.value })
          }
        }
      },
      initialError: {},
      // Final state. Cannot transition to any other state here
      initialSuccess: { type: "final" },
      // This is a state that contains sub states (form selection options in this case)
      // This could be achieved with a child machine if you don't want large machines
      formPanel: {
        initial: "opened",
        states: {
          opened: {
            on: {
              INCORRECT: "incorrect",
              SUGGESTION: "suggestion",
              BUG: "bug"
            }
          },
          suggestion: {
            on: {
              INCORRECT: "incorrect",
              SUGGESTION: "suggestion",
              BUG: "bug"
            }
          },
          bug: {
            on: {
              INCORRECT: "incorrect",
              SUGGESTION: "suggestion",
              BUG: "bug"
            }
          },
          incorrect: {
            on: {
              INCORRECT: "incorrect",
              SUGGESTION: "suggestion",
              BUG: "bug"
            }
          }
        }
      },
      formpanelerror: {},
      formPanelSuccess: { type: "final" },
      // This state is available on any state transition
      // 'opened' can be fired when in any state
      opened: {
        on: {
          CLOSE: "closed",
          CHANGE: {
            // assign is same as useState
            actions: assign({ rating: (ctx, e) => e.value })
          }
        }
      },
      closed: {
        on: {
          CLICK_BUTTON: "opened"
        }
      }
    },
    // Reset to idle
    // This is a top level state
    on: {
      RESET: "idle" // explicit self-transition
    }
  },
  {
    guards: {
      isNoOrImprove,
      isYes
    },
    services: {
      submit: (context) => submit(context)
    }
  }
);
