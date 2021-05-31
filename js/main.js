const main = () => {
  window.addEventListener('load', init);
  function init() {
    const width = 960;
    const height = 540;
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#myCanvas'),
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(50, 50, 50);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    renderer.render(scene, camera);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  main();
});
