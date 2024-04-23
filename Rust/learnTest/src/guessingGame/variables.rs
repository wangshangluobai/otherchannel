// variables
fn main() {
  // 变量具有不可变性，想要改变需要添加关键字 mut 
  // let mut x = 5;
  // println!("The value of x is: {}", x);
  // //  cannot assign twice to immutable variable but mut keyword can
  // x = 6;
  // println!("The value of x is: {}", x);

  // 常量 永远不可变 且在程序运行时，始终可被它的作用域内访问 mut 对常量无效
  // const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;
  // println!("The value of THREE_HOURS_IN_SECONDS is: {}", THREE_HOURS_IN_SECONDS);

  // 隐藏机制
  // let x = 5;
  // let x = x + 1;
  // let x = x * 2;
  // println!("The value of x is: {}", x);
  
  // let spaces = "   ";
  // let spaces = spaces.len();
  // println!("The value of spaces is: {}", spaces);

  // mut 虽然可以让变量改变，但是仍要注意变量类型是不可变的
  let mut spaces = "   ";
  spaces = spaces.len();
  println!("The value of spaces is: {}", spaces);
}
