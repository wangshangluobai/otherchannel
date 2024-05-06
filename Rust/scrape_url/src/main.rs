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

fn fib_loop(n: u8) {
  let mut a = 1;
  let mut b = 1;
  let mut i:u8 = 2;

  loop {
    let c = a + b;
    a = b;
    b = c;
    i += 1;

    println!("next val is {}", b);
    
    if i >=n {
      break;
    }
  }
}
fn fib_while(n: u8) {
  let (mut a, mut b, mut i) = (1, 1, 2);

  while i < n {
    let c = a + b;
    a = b;
    b = c;
    i += 1;
    println!("next val is {}", b);
  }
}
fn fib_for (n: u8) {
  let (mut a, mut b) = (1, 1);

  // 切片不支持负数，其上下标都是 usize 类型
  for _i in 2..n {
    let c = a + b;
    a = b;
    b = c;
    println!("next val is {}", b);
  }
}
fn main() {
  let n = 10;
  fib_loop(n);
  fib_while(n);
  fib_for(n);
}