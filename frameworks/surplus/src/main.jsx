
import * as Surplus from 'surplus'
import S from 's-js'

function createBoxes(number) {
  const boxes = [];
  for (let i = 0; i < number; i++)
    boxes.push({
      top: S.data(0),
      left: S.data(0),
      content: S.data(0),
      count: S.data(0),
      color: S.data()
    });
  return boxes;
}

function tick(box) {
  const count = box.count() + 1
  box.top(Math.sin(count / 10) * 10)
  box.left(Math.cos(count / 10) * 10)
  box.color(count % 255)
  box.content(count % 100)
  box.count(count)
}

const Main = () => {
  const boxes = createBoxes(Benchmark.number);
  Benchmark.Framework.Surplus.loop = () => Promise.resolve().then(() => S.freeze(() => boxes.forEach(tick)));

  return boxes.map((box, index) =>
    <div class="box-view">
      <div class="box" id={index}  textContent={box.content()}
        style={{
          top: `${box.top()}px`,
          left: `${box.left()}px`,
          background: `rgb(0,0,${box.color()})`
        }}
      />
    </div>
  )
}

let dispose;
Benchmark.Framework.Surplus = {
  start() {
    S.root(disposer => {
      dispose = disposer;
      const grid = document.getElementById('grid');
      Main().forEach(row => grid.appendChild(row));
    });
  },
  cleanup() { dispose && dispose(); }
}