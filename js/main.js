const main = () => {
  window.addEventListener('load', three);
  navigator.requestMIDIAccess().then(successCallback, faildCallback);
  three();
};

document.addEventListener('DOMContentLoaded', () => {
  main();
});
