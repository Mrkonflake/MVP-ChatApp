const openai = require('../AiConfig.js');

let pastQuestions = []

module.exports = {
  askAi:async (obj, callback) => {
    pastQuestions.push(obj);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
    messages: pastQuestions
    }).catch(err => callback(err));
    callback(null, completion.data.choices[0].message.content);
  },
}