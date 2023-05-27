// import '@babel/polyfill'

const  add= (x, y)=> {
  return x + y;
}

console.log(add(1, 2));

let promise =new Promise((resolve) =>{
 setTimeout(()=>{
   console.log('定时器跑完了')
   resolve()
 })
})
console.log(promise);