// import '@babel/polyfill'
import '../index.css';

const add = (x, y) => x + y;
// 不检查下一行
// eslint-disable-next-line
console.log(add(1, 2));

const promise = new Promise((resolve) => {
  setTimeout(() => {
    // eslint-disable-next-line
    console.log('定时器跑完了');
    resolve();
  });
});
// 不检查下一行
// eslint-disable-next-line
console.log(promise);
