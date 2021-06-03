function three() {
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

  const meshFloor = new THREE.Mesh(
    new THREE.BoxGeometry(2000, 0.1, 2000),
    new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.0 })
  );
  meshFloor.position.set(0, -18, 0);
  scene.add(meshFloor);

  const light = new THREE.PointLight(0xffffff, 1, 50, 1);
  light.position.set(0, 0, 0);
  scene.add(light);

  const vertexIcosahedron = [
    [0, 1, 1.618],
    [0, -1, 1.618],
    [0, 1, -1.618],
    [0, -1, -1.618],
    [1.618, 0, 1],
    [1.618, 0, -1],
    [-1.618, 0, 1],
    [-1.618, 0, -1],
    [1, 1.618, 0],
    [-1, 1.618, 0],
    [1, -1.618, 0],
    [-1, -1.618, 0],
  ];

  const vertexGroup = new THREE.Group();
  for (let i = 0; i < 12; i++) {
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(
      vertexIcosahedron[i][0] * 10,
      vertexIcosahedron[i][1] * 10,
      vertexIcosahedron[i][2] * 10
    );
    vertexGroup.add(sphere);
  }
  scene.add(vertexGroup);

  const cylinderGroup = new THREE.Group();
  for (let i = 0; i < 12; i++) {
    for (let j = i + 1; j < 12; j++) {
      const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
      const points = [
        new THREE.Vector3(
          vertexIcosahedron[i][0] * 10,
          vertexIcosahedron[i][1] * 10,
          vertexIcosahedron[i][2] * 10
        ),
        new THREE.Vector3(
          vertexIcosahedron[j][0] * 10,
          vertexIcosahedron[j][1] * 10,
          vertexIcosahedron[j][2] * 10
        ),
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, material);
      cylinderGroup.add(line);
    }
  }
  scene.add(cylinderGroup);

  function brightVertex(keys) {
    for (let i = 0; i < 128; i++) {
      if (keys[i].event === 144) {
        vertexGroup.children[i % 12].material.color = { r: 1, g: 1, b: 1 };
      }
    }
  }

  tick();
  function tick() {
    brightVertex(keyboard);
    renderer.render(scene, camera);
    vertexGroup.rotation.x += 0.01;
    cylinderGroup.rotation.x += 0.01;
    requestAnimationFrame(tick);
  }
}
