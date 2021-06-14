let endRotation = { x: 0, y: 0, z: 0 };

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
  camera.position.set(100, 0, 0);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  const meshFloor = new THREE.Mesh(
    new THREE.BoxGeometry(2000, 0.1, 2000),
    new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.0 })
  );
  meshFloor.position.set(0, -24, 0);
  scene.add(meshFloor);

  const light1 = new THREE.PointLight(0xffffff, 1, 100, 1);
  const light2 = new THREE.PointLight(0xffffff, 1, 100, 1);
  const light3 = new THREE.PointLight(0xffffff, 1, 100, 1);
  light1.position.set(0, 50, 0);
  light2.position.set(50, 0, 0);
  light3.position.set(0, 50, 50);
  scene.add(light1);
  scene.add(light2);
  scene.add(light3);

  const icosahedronGeometry = new THREE.IcosahedronGeometry(19);
  const icosahedronMaterial = new THREE.MeshLambertMaterial({
    opacity: 0.5,
    transparent: true,
  });
  const icosahedronMesh = new THREE.Mesh(
    icosahedronGeometry,
    icosahedronMaterial
  );
  icosahedronMesh.rotation.set(Math.PI / 2, 0, 0);
  icosahedronMesh.position.set(0, 0, 0);
  scene.add(icosahedronMesh);

  const vertexIcosahedron = [
    [0, 1.618, 1],
    [0, 1.618, -1],
    [1.618, 1, 0],
    [1, 0, 1.618],
    [-1, 0, 1.618],
    [-1.618, 1, 0],
    [1.618, -1, 0],
    [1, 0, -1.618],
    [-1, 0, -1.618],
    [-1.618, -1, 0],
    [0, -1.618, 1],
    [0, -1.618, -1],
  ];

  let arrangedVertex = [];
  for (let i = 0; i < 12; i++) {
    arrangedVertex.push(vertexIcosahedron[arrangement[i]]);
  }

  const vertexGroup = new THREE.Group();
  for (let i = 0; i < 12; i++) {
    const geometry = new THREE.SphereGeometry(0.6, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(
      arrangedVertex[i][0] * 10,
      arrangedVertex[i][1] * 10,
      arrangedVertex[i][2] * 10
    );
    vertexGroup.add(sphere);
  }
  vertexGroup.rotation.x = endRotation.x;
  vertexGroup.rotation.y = endRotation.y;
  vertexGroup.rotation.z = endRotation.z;
  vertexGroup.add(icosahedronMesh);
  scene.add(vertexGroup);

  const lineGroup = new THREE.Group();
  for (let i = 0; i < 12; i++) {
    for (let j = i + 1; j < 12; j++) {
      const material = new THREE.LineBasicMaterial({
        color: 0xffffff,
        opacity: 1,
        transparent: true,
      });
      const points = [
        new THREE.Vector3(
          arrangedVertex[i][0] * 10,
          arrangedVertex[i][1] * 10,
          arrangedVertex[i][2] * 10
        ),
        new THREE.Vector3(
          arrangedVertex[j][0] * 10,
          arrangedVertex[j][1] * 10,
          arrangedVertex[j][2] * 10
        ),
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, material);
      lineGroup.add(line);
    }
  }
  lineGroup.rotation.x = endRotation.x;
  lineGroup.rotation.y = endRotation.y;
  lineGroup.rotation.z = endRotation.z;
  scene.add(lineGroup);

  //文字出力のためのテストだが、現状CORS policyに弾かれる
  // const loader = new THREE.FontLoader();
  // loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

  //   const geometry = new THREE.TextGeometry( 'Hello three.js!', {
  //     font: font,
  //     size: 80,
  //     height: 5,
  //     curveSegments: 12,
  //     bevelEnabled: true,
  //     bevelThickness: 10,
  //     bevelSize: 8,
  //     bevelOffset: 0,
  //     bevelSegments: 5
  //   });
  //   const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  //   const mesh = new THREE.mesh(geometry, material)
  //   mesh.position.set(0,0,0)
  //   scene.add(mesh)
  // });

  function brightVertex(keys) {
    for (let i = 0; i < 128; i++) {
      vertexGroup.children[i % 12].material.color = distribution(keys, i % 12);
    }
  }

  function brightLine(keys) {
    for (let i = 0; i < 66; i++) {
      if (distributionLine(keys).includes(i)) {
        lineGroup.children[i].material.opacity = 1;
        lineGroup.children[i].material.transparent = false;
      } else if (keyboard[128].velocity === 0) {
        lineGroup.children[i].material.opacity = 0;
        lineGroup.children[i].material.transparent = true;
      }
    }
  }

  let rotationSpeed = { x: 0, y: 0, z: 0 };
  const rotationSpeedRangeX = document.getElementById('rotationSpeedX');
  rotationSpeed.x = -parseFloat(rotationSpeedRangeX.value);
  rotationSpeedRangeX.addEventListener('change', () => {
    rotationSpeed.x = -parseFloat(rotationSpeedRangeX.value);
  });
  const rotationSpeedRangeY = document.getElementById('rotationSpeedY');
  rotationSpeed.y = parseFloat(rotationSpeedRangeY.value);
  rotationSpeedRangeY.addEventListener('change', () => {
    rotationSpeed.y = parseFloat(rotationSpeedRangeY.value);
  });
  const rotationSpeedRangeZ = document.getElementById('rotationSpeedZ');
  rotationSpeed.z = parseFloat(rotationSpeedRangeZ.value);
  rotationSpeedRangeZ.addEventListener('change', () => {
    rotationSpeed.z = parseFloat(rotationSpeedRangeZ.value);
  });
  tick();
  function tick() {
    brightVertex(keyboard);
    brightLine(keyboard);
    renderer.render(scene, camera);
    vertexGroup.rotation.x += rotationSpeed.x;
    lineGroup.rotation.x += rotationSpeed.x;
    vertexGroup.rotation.y += rotationSpeed.y;
    lineGroup.rotation.y += rotationSpeed.y;
    vertexGroup.rotation.z += rotationSpeed.z;
    lineGroup.rotation.z += rotationSpeed.z;
    requestAnimationFrame(tick);
    endRotation.x = vertexGroup.rotation.x;
    endRotation.y = vertexGroup.rotation.y;
    endRotation.z = vertexGroup.rotation.z;
  }
}
