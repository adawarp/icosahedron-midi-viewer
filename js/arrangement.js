let goldenForm = document.getElementById('golden');
let typeForm = document.getElementById('type');
let goldenType = { golden: 'triangle', type: '1' };
let rotationNote = document.getElementById('rotationNote');
let arrangement = [0, 1, 5, 4, 9, 8, 11, 10, 6, 7, 2, 3];
let rotatePosition = 0;

golden.addEventListener('change', () => {
  goldenType.golden = goldenForm.golden.value;
  goldenType.type = typeForm.type.value;
  arrange(goldenType.golden, goldenType.type);
  three();
});
type.addEventListener('change', () => {
  goldenType.golden = goldenForm.golden.value;
  goldenType.type = typeForm.type.value;
  arrange(goldenType.golden, goldenType.type);
  three();
});

rotationNote.addEventListener('change', () => {
  rotateNote(parseInt(rotationNote.value));
  three();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'a') {
    goldenType.golden = 'triangle';
    goldenForm.golden.value = 'triangle';
    arrange(goldenType.golden, goldenType.type);
    three();
  } else if (e.key === 'b') {
    goldenType.golden = 'gnomon';
    goldenForm.golden.value = 'gnomon';
    arrange(goldenType.golden, goldenType.type);
    three();
  } else if (e.key === 'c') {
    goldenType.golden = 'rectangle';
    goldenForm.golden.value = 'rectangle';
    arrange(goldenType.golden, goldenType.type);
    three();
  } else if (e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4') {
    goldenType.type = e.key;
    typeForm.type.value = e.key;
    arrange(goldenType.golden, goldenType.type);
    three();
  }
});

function rotateNote(n) {
  let rotateTimes = (5 + n - rotatePosition) % 5;
  rotatePosition = rotateTimes + (rotatePosition % 5);
  if (rotateTimes > 0) {
    function rotateOnce(lastArrangement) {
      let onceRotatedArrangement = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let rotateList = [0, 2, 3, 4, 5, 1, 10, 6, 7, 8, 9, 11];
      for (let i = 0; i < 12; i++) {
        onceRotatedArrangement[lastArrangement.indexOf(i)] = rotateList[i];
      }
      return onceRotatedArrangement;
    }
    for (let i = 0; i < rotateTimes; i++) {
      arrangement = rotateOnce(arrangement);
    }
  }
}

function arrange(golden, type) {
  rotationNote.value = '0';
  rotatePosition = 0;
  if (golden === 'triangle') {
    switch (type) {
      case '1':
        arrangement = [0, 1, 5, 4, 9, 8, 11, 10, 6, 7, 2, 3];
        break;
      case '2':
        arrangement = [0, 4, 5, 8, 9, 10, 11, 7, 6, 3, 2, 1];
        break;
      case '3':
        arrangement = [1, 0, 4, 5, 8, 9, 10, 11, 7, 6, 3, 2];
        break;
      case '4':
        arrangement = [3, 0, 1, 5, 4, 9, 8, 11, 10, 6, 7, 2];
        break;
    }
  }
  if (golden === 'gnomon') {
    switch (type) {
      case '1':
        arrangement = [0, 10, 5, 7, 9, 3, 11, 1, 6, 4, 2, 8];
        break;
      case '2':
        arrangement = [0, 7, 5, 3, 9, 1, 11, 4, 6, 8, 2, 10];
        break;
      case '3':
        arrangement = [10, 0, 7, 5, 3, 9, 1, 11, 4, 6, 8, 2];
        break;
      case '4':
        arrangement = [8, 0, 10, 5, 7, 9, 3, 11, 1, 6, 4, 2];
        break;
    }
  }
  if (golden === 'rectangle') {
    switch (type) {
      case '1':
        arrangement = [0, 8, 5, 10, 9, 7, 11, 3, 6, 1, 2, 4];
        break;
      case '2':
        arrangement = [0, 3, 5, 1, 9, 4, 11, 8, 6, 10, 2, 7];
        break;
      case '3':
        arrangement = [1, 9, 4, 11, 8, 6, 10, 2, 7, 0, 3, 5];
        break;
      case '4':
        arrangement = [1, 2, 4, 0, 8, 5, 10, 9, 7, 11, 3, 6];
        break;
    }
  }
}
