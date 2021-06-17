let midi = null;
let inputs = [];
let outputs = [];
let keyboard = [];
let midiHistory = [];
let recordArrangement = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let startTime = Date.now();
let toggleRecording = false;
let playTimeoutIDList = [];
let midiInputId = 0;
let midiOutputId = 0;
let recordingStatus = 'noRecording';

function initializeKeyboard() {
  keyboard = [];
  for (let i = 0; i < 128; i++) {
    keyboard.push({ event: 128, velocity: 64 });
  }
  keyboard.push({ event: 176, velocity: 0 });
}
initializeKeyboard();

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
  const midiInputSelect = document.getElementById('midiInputSelect');
  for (i = 0; i < inputs.length; i++) {
    let option = document.createElement('option');
    option.textContent = inputs[i].name;
    option.id = i;
    midiInputSelect.appendChild(option);
  }
  midiInputSelect.addEventListener('change', () => {
    midiInputId = midiInputSelect.id;
  });

  let outputIterator = midi.outputs.values();
  for (
    let output = outputIterator.next();
    !output.done;
    output = outputIterator.next()
  ) {
    outputs.push(output.value);
  }
  for (i = 0; i < inputs.length; i++) {
    let option = document.createElement('option');
    option.textContent = outputs[i].name;
    option.id = i;
    midiOutputSelect.appendChild(option);
  }
  midiOutputSelect.addEventListener('change', () => {
    midiOutputId = midiOutputSelect.id;
  });

  function allNoteOff() {
    for (let i = 0; i < 128; i++) {
      outputs[midiOutputId].send([144, i, 0], performance.now());
    }
    outputs[midiOutputId].send([176, 64, 0], performance.now());
    outputs[midiOutputId].send([177, 64, 0], performance.now());
  }
  const recordStatus = document.getElementById('recordStatus');

  const recordButton = document.getElementById('recordButton');
  const recordStopButton = document.getElementById('recordStopButton');
  const playGeometryButton = document.getElementById('playGeometryButton');
  const playMusicButton = document.getElementById('playMusicButton');
  const playStopButton = document.getElementById('playStopButton');

  recordButton.addEventListener('click', record);
  recordStopButton.addEventListener('click', recordStop);
  playGeometryButton.addEventListener('click', playGeometry);
  playMusicButton.addEventListener('click', playMusic);
  playStopButton.addEventListener('click', playStop);

  document.addEventListener('keydown', (e) => {
    switch (recordingStatus) {
      case 'noRecording':
        if (e.key === 'r') record();
        break;
      case 'recording':
        if (e.key === 'r') record();
        if (e.key === 't') recordStop();
        if (e.key === ' ') recordStop();
        break;
      case 'recorded':
        if (e.key === 'r') record();
        if (e.key === 's') playGeometry();
        if (e.key === 'd') playMusic();
        break;
      case 'playingGeometry':
        if (e.key === ' ') playStop();
        break;
      case 'playingMusic':
        if (e.key === ' ') playStop();
        break;
    }
  });

  function recordStop() {
    recordingStatus = 'recorded';
    playGeometryButton.disabled = false;
    playMusicButton.disabled = false;
    recordStopButton.disabled = true;
    toggleRecording = false;
    midiHistory.push([Date.now(), [0, 0, 0]]);
    recordStatus.textContent =
      (midiHistory[midiHistory.length - 1][0] - startTime) / 1000 + '秒録音済';
  }

  function record() {
    recordingStatus = 'recording';
    recordStatus.textContent = '録音中';
    recordStopButton.disabled = false;
    toggleRecording = true;
    recordArrangement = arrangement;
    midiHistory = [];
    startTime = Date.now();
  }

  function playGeometry() {
    recordingStatus = 'playingGeometry';
    recordStatus.textContent = '図形を保持して再生中';
    recordButton.disabled = true;
    recordStopButton.disabled = true;
    playGeometryButton.disabled = true;
    playMusicButton.disabled = true;
    playStopButton.disabled = false;
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
      playTimeoutIDList.push(
        setTimeout(() => {
          if (note[0] === 0) {
            recordingStatus = 'recorded';
            recordStatus.textContent =
              (midiHistory[midiHistory.length - 1][0] - startTime) / 1000 +
              '秒録音済';
            recordButton.disabled = false;
            recordStopButton.disabled = true;
            playGeometryButton.disabled = false;
            playMusicButton.disabled = false;
            playStopButton.disabled = true;
            playTimeoutIDList = [];
          } else {
            outputs[0].send(note, performance.now());
            if (note[0] === 176) {
              keyboard[128].velocity = note[2];
            }
            keyboard[note[1]].event = midiHistory[i][1][0];
            keyboard[note[1]].velocity = midiHistory[i][1][2];
          }
        }, midiHistory[i][0] - startTime)
      );
    }
  }

  function playMusic() {
    recordingStatus = 'playingMusic';
    recordStatus.textContent = '音楽を保持して再生中';
    recordButton.disabled = true;
    recordStopButton.disabled = true;
    playGeometryButton.disabled = true;
    playMusicButton.disabled = true;
    playStopButton.disabled = false;
    for (let i = 0; i < midiHistory.length; i++) {
      let note = [
        midiHistory[i][1][0],
        midiHistory[i][1][1],
        midiHistory[i][1][2],
      ];
      playTimeoutIDList.push(
        setTimeout(() => {
          if (note[0] === 0) {
            recordingStatus = 'recorded';
            recordStatus.textContent =
              (midiHistory[midiHistory.length - 1][0] - startTime) / 1000 +
              '秒録音済';
            recordButton.disabled = false;
            recordStopButton.disabled = true;
            playGeometryButton.disabled = false;
            playMusicButton.disabled = false;
            playStopButton.disabled = true;
            playTimeoutIDList = [];
          } else {
            outputs[midiOutputId].send(note, performance.now());
            if (note[0] === 176) {
              keyboard[128].velocity = note[2];
            }
            keyboard[note[1]].event = midiHistory[i][1][0];
            keyboard[note[1]].velocity = midiHistory[i][1][2];
          }
        }, midiHistory[i][0] - startTime)
      );
    }
  }

  function playStop() {
    recordingStatus = 'recorded';
    recordStatus.textContent =
      (midiHistory[midiHistory.length - 1][0] - startTime) / 1000 + '秒録音済';
    recordButton.disabled = false;
    recordStopButton.disabled = true;
    playGeometryButton.disabled = false;
    playMusicButton.disabled = false;
    playStopButton.disabled = true;
    playTimeoutIDList.forEach((id) => clearTimeout(id));
    playTimeoutIDList = [];
    initializeKeyboard();
    allNoteOff();
  }

  inputs[midiInputId].onmidimessage = onMIDIEvent;
  function onMIDIEvent(e) {
    if (e.data[0] === 128 || e.data[0] === 144) {
      keyboard[e.data[1]].event = e.data[0];
      keyboard[e.data[1]].velocity = e.data[2];
    } else if (e.data[0] === 176) {
      keyboard[128].velocity = e.data[2];
    }
    if (toggleRecording) {
      midiHistory.push([Date.now(), e.data]);
    }
  }
}

function faildCallback(msg) {
  console.warn('[Error]:' + msg);
}
