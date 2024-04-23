fn main() {
  println!("Hello, world!");
  // let number = 3;
  // if number < 5 {
  //   println!("condition was true");
  // } else {
  //   println!("condition was false");
  // }
  // match number < 5 {
  //   true => println!("condition was true"),
  //   false => println!("condition was false"),
  // }

  // String
  let s = String::from("hello");
  let t = String::from(" world");
  let r = s + &t;
  // + 号不能对两个引用字符串使用
  // let r = &s + &t;
  // s 在 + 的时候所有权已经被移动了
  // println!("111, {}", &s);
  println!("222, {}", t);
  println!("333, {}", r);
}