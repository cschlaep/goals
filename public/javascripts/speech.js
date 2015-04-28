var processSpeech = function(transcript) {
  // Helper function to detect if any commands appear in a string
  console.log(transcript);
  var userSaid = function(str, desired) {
    if (str == desired) {
      return true;
    }
    return false;
  }

    var processed = false;
    if (currentType == 'bar' || currentType == 'line' || currentType == 'pie') {
      if (userSaid(transcript,'switch to bar')) {
        $(".bar-btn").trigger("switch");
          processed = true;
      }
      else if (userSaid('switch to line',transcript)) {
        $(".line-btn").trigger("switch");
          processed = true;
      }
      else if (userSaid('switch to PI',transcript)) {
        $(".pie-btn").trigger("switch");
          processed = true;
      }
      else if (userSaid('data one',transcript)) {
        currentSet = 1;
      }
      else if (userSaid('data two',transcript) || userSaid('data to', transcript)) {
        currentSet = 2;
      }
      else if (userSaid('data three',transcript) || userSaid('data 3', transcript)) {
        currentSet = 3;
      }
  }
    return processed;
}


var debouncedProcessSpeech = _.debounce(processSpeech, 500);

var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.onresult = function(event) {
  // Build the interim transcript, so we can process speech faster
  var transcript = '';
  var hasFinal = false;
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal)
      hasFinal = true;
    else
      transcript += event.results[i][0].transcript;
  }

  if (true) {
    if (hasFinal)
      $('h5').html("SPEECH DEBUG: ready");
    else
      $('h5').html("SPEECH DEBUG: " + transcript);
  }

  var processed = debouncedProcessSpeech(transcript);

  // If we reacted to speech, kill recognition and restart
  if (processed) {
    recognition.stop();
  }
};
// Restart recognition if it has stopped
recognition.onend = function(event) {
  setTimeout(function() {
    if (true)
      $('h5').html("SPEECH DEBUG: ready");
    recognition.start();
  }, 1000);
};
recognition.start();