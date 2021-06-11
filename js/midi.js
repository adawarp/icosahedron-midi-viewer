let midi = null;
let inputs = [];
let outputs = [];
let keyboard = [];
let midiHistory = [];
let recordArrangement = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let startTime = Date.now();
for (let i = 0; i < 128; i++) {
  keyboard.push({ event: 128, velocity: 64 });
}

function successCallback(m) {
  midi = m;
  let inputIterator = midi.inputs.values();
  for (
    let input = inputIterator.next();
    !input.done;
    input = inputIterator.next()
  ) {
    inputs.push(input.value);
  }

  let outputIterator = midi.outputs.values();
  for (
    let output = outputIterator.next();
    !output.done;
    output = outputIterator.next()
  ) {
    outputs.push(output.value);
  }

  const recordButton = document.getElementById('recordButton');
  recordButton.addEventListener('click', () => {
    recordArrangement = arrangement;
    midiHistory = [];
    startTime = Date.now();
  });

  const playButton = document.getElementById('playButton');
  playButton.addEventListener('click', () => {
    function transpose(key) {
      const octave = Math.floor(key / 12);
      const noteName = key % 12;
      const newKey = arrangement.indexOf(recordArrangement[noteName]);
      return newKey + octave * 12;
    }
    for (let i = 0; i < midiHistory.length; i++) {
      let note = [
        midiHistory[i][1][0],
        midiHistory[i][1][1],
        midiHistory[i][1][2],
      ];
      if (note[0] === 128 || note[0] === 144) {
        note = [
          midiHistory[i][1][0],
          transpose(midiHistory[i][1][1]),
          midiHistory[i][1][2],
        ];
      }
      outputs[0].send(note, performance.now() + midiHistory[i][0] - startTime);
      setTimeout(() => {
        keyboard[note[1]].event = midiHistory[i][1][0];
        keyboard[note[1]].velocity = midiHistory[i][1][2];
      }, midiHistory[i][0] - startTime);
    }
  });

  for (let cnt = 0; cnt < inputs.length; cnt++) {
    inputs[cnt].onmidimessage = onMIDIEvent;
  }
  function onMIDIEvent(e) {
    keyboard[e.data[1]].event = e.data[0];
    keyboard[e.data[1]].velocity = e.data[2];
    midiHistory.push([Date.now(), e.data]);
  }
}

function faildCallback(msg) {
  console.warn('[Error]:' + msg);
}
