
// hello world
// fn main() {
//     println!("Hello, world!");
// }
// 读取输入，引入标准库 std 中的 io 模块
// 如果此处没有引入，则在使用 io 的地方需要改为 std:io::stdin

// guess number
use std::io;
use rand::Rng;
use std::cmp::Ordering;
fn main() {
  // 带有 ! 的叫做宏
  println!("Guess the number!");
  let secret_number = rand::thread_rng().gen_range(1, 101);
  println!("The secret number is: {}", secret_number);
  println!("Please input your guess.");
  loop {
    // 在 rust 中变量默认都是不可变的 使用 mut 声明变量可变
    // new 是创建类型实例的常用函数名称，是一个函数(并非关键字?)
    let mut guess = String::new();
    io::stdin().read_line(&mut guess).expect("Faiked to read line");
    println!("You guessed: {}", guess);
    // let guess: u32 = guess.trim().parse().expect("Please type a number!");
    let guess: u32 = match guess.trim().parse() {
      Ok(num) => num,
      Err(_) => continue,
    };
    match guess.cmp(&secret_number) {
      Ordering::Less => println!("Too small!"),
      Ordering::Greater => println!("Too big!"),
      Ordering::Equal => {
        println!("You win!");
        break;
      },
    }
  }
}