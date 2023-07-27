const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  ouput: process.stdout,
});

let map = Array.from(Array(30), () => new Array(30).fill(-1));

let rc;
let cnt = 0;
rl.on('line', (line) => {
  rc = line.split(' ').map((data) => {
    return parseInt(data);
  });
  map[rc[0]][rc[1]] = cnt % 2;
  omok(rc[0], rc[1], cnt % 2);
  cnt++;

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      process.stdout.write(map[i][j] + ' ');
    }
    console.log();
  }
});

let dr = [-1, 1, 0, 0, -1, 1, -1, 1]; // 상하,좌우, 상우 하좌, 상좌 하우
let dc = [0, 0, -1, 1, 1, -1, -1, 1];
function omok(r, c, cnt) {
  for (let d = 0; d < 8; d += 2) {
    let tcnt = 1;
    a: for (let i = 0; i < 2; i++) {
      let nr = r;
      let nc = c;

      for (let j = 0; j < 5; j++) {
        nr += dr[d + i];
        nc += dc[d + i];

        console.log(tcnt);

        if (tcnt == 5) {
          // 승리 한거잖아.
          console.log(
            '!!!!!!!!!!!!!!!!!!!!!!!!!!!GAME OVER!!!!!!!!!!!!!!!!!!!!!!!!!!!'
          );
          if (cnt == 1) {
            console.log('흑돌 플레이어 승리!');
          } else if (cnt == 0) {
            console.log('백돌 플레이어 승리 ');
          }
          rl.close();
          return;
        }

        if (!check(nr, nc) || map[nr][nc] != cnt) continue a;
        tcnt++;
      }
    }
  }

  function check(r, c) {
    return r >= 0 && r < 30 && c >= 0 && c < 30;
  }
}
