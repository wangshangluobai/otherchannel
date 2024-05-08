// use std::fs;

// fn main() {
//   // 使用依赖将网站信息转为md文件
//   let url = "https://www.rust-lang.org/";
//   let output = "rust.md";

//   println!("Fetching URL: {}", url);
//   let body = reqwest::blocking::get(url).unwrap().text().unwrap();

//   println!("Converting html to markdown...");
//   let md = html2md::parse_html(&body);

//   fs::write(output, md.as_bytes()).unwrap();
//   println!("Converted markdown has been saved to {}", output);
// }


// 函数使用

// fn apply(value: i32, func: fn(i32) -> i32) -> i32 {
//   return func(value);
// }
// fn square(value: i32) -> i32 {
//   value * value
// }
// fn cube(value: i32) -> i32 {
//   value * value * value
// }

// fn main() {
//   println!("Apply square: {}", apply(4, square));
//   println!("Apply cube: {}", apply(4, cube));
// }

// 函数返回值

// fn pi() -> f64 {
//   3.1415926
// }
// fn not_pi() {
//   3.1415926;
//   // return
// }

// fn main() {
//   let is_pi = pi();
//   let is_unit1 = not_pi();
//   let is_unit2 = {
//     // 加上分号，就不会返回值，或隐含其返回值为 unit
//     pi();
//   };

//   println!("is_pi: {:?}, is_unit1: {:?}, is_unit2: {:?}", is_pi, is_unit1, is_unit2);
// }


// 数据结构

// // 枚举类型
// #[derive(Debug)]
// enum Gender {
//   Unspecified = 0,
//   Female = 1,
//   Male = 2,
// }

// // 元组结构体
// #[derive(Debug, Copy, Clone)]
// struct UserId(u64);
// #[derive(Debug, Copy, Clone)]
// struct TopicId(u64);
// // 标准结构体
// #[derive(Debug)]
// struct User {
//   id: UserId,
//   name: String,
//   gender: Gender,
// }
// #[derive(Debug)]
// struct Topic {
//   id: TopicId,
//   name: String,
//   owner: UserId,
// }
// // 定义聊天室中可能发生的事件
// // 标准的标签联合体
// #[derive(Debug)]
// enum Event {
//   Join((UserId, TopicId)),
//   Leave((UserId, TopicId)),
//   Message((UserId, TopicId, String)),
// }
// fn main() {
//   let alice = User {
//     id: UserId(1),
//     name: "Alice".into(),
//     gender: Gender::Female,
//   };
//   let bob = User {
//     id: UserId(2),
//     name: "Bob".into(),
//     gender: Gender::Male,
//   };

//   let topic = Topic {
//     id: TopicId(1),
//     name: "rust".into(),
//     owner: UserId(1),
//   };

//   let event1 = Event::Join((alice.id, topic.id));
//   let event2 = Event::Join((bob.id, topic.id));
//   let event3 = Event::Message((alice.id, topic.id, "hello world!".into()));
  
//   println!("event1: {:?}, event2: {:?}, event3: {:?}", event1, event2, event3)
// }

// 静态变量

// use std::collections::HashMap;

// fn main() {
//   static V:Vec<u8> = Vec::new();
//   // 无法编译通过
//   static MAP:HashMap<String, String> = HashMap::new();
// }

// 流程控制 斐波那契

// fn fib_loop(n: u8) {
//   let mut a = 1;
//   let mut b = 1;
//   let mut i:u8 = 2;

//   loop {
//     let c = a + b;
//     a = b;
//     b = c;
//     i += 1;

//     println!("next val is {}", b);
    
//     if i >=n {
//       break;
//     }
//   }
// }
// fn fib_while(n: u8) {
//   let (mut a, mut b, mut i) = (1, 1, 2);

//   while i < n {
//     let c = a + b;
//     a = b;
//     b = c;
//     i += 1;
//     println!("next val is {}", b);
//   }
// }
// fn fib_for (n: u8) {
//   let (mut a, mut b) = (1, 1);

//   // 切片不支持负数，其上下标都是 usize 类型
//   for _i in 2..n {
//     let c = a + b;
//     a = b;
//     b = c;
//     println!("next val is {}", b);
//   }
// }
// fn main() {
//   let n = 10;
//   fib_loop(n);
//   fib_while(n);
//   fib_for(n);
// }

// 模式匹配

// #[derive(Debug)]
// struct UserId(u64);
// #[derive(Debug)]
// struct TopicId(u64);
// #[derive(Debug)]
// enum Event {
//   Join((UserId, TopicId)),
//   Leave((UserId, TopicId)),
//   Message((UserId, TopicId, String)),
// }

// // match 匹配所有模式
// fn process_event(event: &Event) {
//   match event {
//     Event::Join((uid, _tid)) => println!("user {:?} joined", uid),
//     Event::Leave((uid, _tid)) => println!("user {:?} left {:?}", uid, _tid),
//     Event::Message((_, _, msg)) => println!("broadcast: {:?}", msg),
//   }
// }

// // if let/ while let 只针对一个类型判断
// fn process_message(event: &Event) {
//   if let Event::Message((_, _, msg)) = event {
//     println!("broadcast: {:?}", msg);
//   }
// }

// fn main(){
//   let event = Event::Join((UserId(1), TopicId(1)));
//   let event1 = Event::Leave((UserId(1), TopicId(1)));
//   let event2 = Event::Message((UserId(1), TopicId(1), "hello world!".into()));
//   // process_event(&event);
//   // process_event(&event1);
//   // process_event(&event2);

//   process_message(&event);
//   process_message(&event1);
//   process_message(&event2);
// }

// 错误处理

// use std::fs;

// fn main(){
//   let url = "https://www.baidu.com/";
//   let output = "baidu.md";

//   println!("Fetching URL: {}", url);
//   let body = reqwest::blocking::get(url).unwrap().text().unwrap();

//   println!("Converting html to markdown...");
//   let md = html2md::parse_html(&body);

//   fs::write(output, md.as_bytes()).unwrap();
//   println!("Converted markdown has been saved to {}", output)
// }

// 传播错误

// fn main() -> Result<(), Box<dyn std::error::Error>> {
//   let url = "https://www.baidu1111111.com/";
//   let output = "baidu.md";

//   println!("Fetching URL: {}", url);
//   let body = reqwest::blocking::get(url)?.text()?;

//   println!("Converting html to markdown...");
//   let md = html2md::parse_html(&body);

//   fs::write(output, md.as_bytes())?;
//   println!("Converted markdown has been saved to {}", output);

//   Ok(())
// }

// 斐波那契递归

// fn fib_recur(n: u8) -> u8 {

//   // let mut prve: u8 = 1;
//   // let mut next: u8 = 1;
//   if n <= 2 {
//     return 1;
//   }

//   // if let Some(value) = a {
//   //   prve = value;
//   // }
//   // if let Some(value) = b {
//   //   next = value;
//   // }
//   let a = fib_recur(n - 1);
//   let b = fib_recur(n - 2);

//   a + b

//   // println!("next val is {}", prve + next);

//   // prve = next;
//   // next = next + prve;
//   // n = n - 1;
//   // if n > 0 {
//   //   fib_recur(n, Some(prve), Some(next));
//   // }
// }

// fn main() {
//   println!("fib_recur(10) = {}", fib_recur(6))
//   // fib_recur(10);
// }

// 将用户输入的URL转换为Markdown格式

use std::fs;
use std::env::args;

fn main() {
  // TEST args
  // println!("args: {:?}", args());
  let args: Vec<String> = args().collect();
  let url;
  let output;
  // let [_, url, output, ..]: Vec<String> = args().collect();
  // println!("url: {}, output: {}", url, output);
  // println!("args: {:?}, {:?}", args[1], args[2]);
  // println!("args: {:?}", args);
  // 尝试for循环获取 但无法判定输入是否正确
  // for (i, arg) in args.iter().enumerate() {
  //   if let 1 = i {
  //     url = arg;
  //     println!("url: {}", arg);
  //   }else if let 2 = i {
  //     output = arg;
  //     println!("output: {}", arg);
  //   }
  // }
    // println!("i: {}, arg: {}", i, arg);
  // match args.len() {
  //   1 => {
  //     println!("Please input url and output file name");
  //     return;
  //   },
  //   2 => {
  //     url = args[1].clone();
  //     output = "output.md";
  //   },
  //   3 => {
  //     url = args[1].clone();
  //     output = args[2].clone();
  //   },
  //   _ => {
  //     println!("Please input url and output file name");
  // }
  if 3 > args.len() {
    println!("Please input url and output file name");
    return;
  }else{
    url = &args[1];
    output = &args[2];
  }
  println!("url: {}, output: {}", url, output);
  // return;
  // 使用依赖将网站信息转为md文件
  // let url = "https://www.rust-lang.org/";
  // let output = "rust.md";

  println!("Fetching URL: {}", url);
  let body = reqwest::blocking::get(url).unwrap().text().unwrap();

  println!("Converting html to markdown...");
  let md = html2md::parse_html(&body);

  fs::write(output, md.as_bytes()).unwrap();
  println!("Converted markdown has been saved to {}", output);
}