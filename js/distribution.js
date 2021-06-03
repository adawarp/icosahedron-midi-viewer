function distribution(keyboard, n) {
  let color = { r: 0, g: 0, b: 0 };
  // midiキーボードは21-108まで
  for (i = 12 + n; i < 109; i = i + 12) {
    let v = keyboard[i].velocity / 64;
    if (keyboard[i].event === 144) {
      switch (Math.floor(i / 12)) {
        case 2:
          color.r = color.r + v * 0.3;
          break;
        case 3:
          color.r = color.r + v * 0.4;
          break;
        case 4:
          color.r = color.r + v * 0.2;
          color.g = color.g + v * 0.2;
          break;
        case 5:
          color.r = color.r + v * 0.1;
          color.g = color.g + v * 0.3;
          break;
        case 6:
          color.g = color.g + v * 0.3;
          color.b = color.b + v * 0.1;
          break;
        case 7:
          color.g = color.g + v * 0.2;
          color.b = color.b + v * 0.2;
          break;
        case 8:
          color.b = color.b + v * 0.4;
          break;
        case 9:
          color.b = color.b + v * 0.3;
          break;
      }
    }
  }
  return color;
}

function distributionLine(keyboard) {
  let notes = [];
  let lines = [];
  for (let i = 21; i < 109; i++) {
    if (keyboard[i].event === 144 && !notes.includes(i % 12)) {
      notes.push(i % 12);
    }
  }
  notes.sort((a, b) => a - b);
  if (notes.length > 1) {
    for (let i = 0; i < notes.length; i++) {
      if (i !== notes.length - 1) {
        lines.push(
          notes[i] * 12 -
            (notes[i] * (notes[i] + 1)) / 2 +
            notes[i + 1] -
            notes[i] -
            1
        );
      } else {
        lines.push(
          notes[0] * 12 -
            (notes[0] * (notes[0] + 1)) / 2 +
            notes[i] -
            notes[0] -
            1
        );
      }
    }
  }
  return lines;
}
