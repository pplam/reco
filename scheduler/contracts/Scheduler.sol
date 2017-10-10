contract Scheduler {
  event NewQuestion(string question);
  event NewAnswer(string answer);

  function ask(string question) {
    NewQuestion(question);
  }

  function reply(string answer) {
    NewAnswer(answer);
  }
}
