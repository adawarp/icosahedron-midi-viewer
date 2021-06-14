let goldenForm = document.getElementById('golden');
let typeForm = document.getElementById('type');
let goldenType = { golden: 0, type: 0 };
let arrangement = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

golden.addEventListener('change', () => {
  goldenType.golden = goldenForm.golden.value;
  arrange(goldenType.golden, goldenType.type);
  three();
});
type.addEventListener('change', () => {
  goldenType.type = typeForm.type.value;
  arrange(goldenType.golden, goldenType.type);
  three();
});

function arrange(golden, type) {
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
