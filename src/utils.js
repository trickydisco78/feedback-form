export const isNoOrImprove = (context, event) => {
  return (
    context.initialFeedback === "useful_no" ||
    context.initialFeedback === "improve"
  );
};

export const isYes = (context, event) => {
  return context.initialFeedback === "useful_yes";
};

export function submit(values) {
  console.log("Submitting", values);
  // Generate promise hat randomly rejects for testing purposes
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return Math.random() < 0.4 || values.one === "error"
        ? reject()
        : resolve();
    }, 1000);
  });
}
