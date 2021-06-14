const main = () => {
  window.addEventListener('load', three);
  navigator.requestMIDIAccess().then(successCallback, faildCallback);
};

document.addEventListener('DOMContentLoaded', () => {
  main();
});
