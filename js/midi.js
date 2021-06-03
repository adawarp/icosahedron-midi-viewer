let midi = null;
let inputs = [];
let outputs = [];
let keyboard = [];
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

  for (let cnt = 0; cnt < inputs.length; cnt++) {
    inputs[cnt].onmidimessage = onMIDIEvent;
  }
  function onMIDIEvent(e) {
    keyboard[e.data[1]].event = e.data[0];
    keyboard[e.data[1]].velocity = e.data[2];
  }
}

function faildCallback(msg) {
  console.warn('[Error]:' + msg);
}
