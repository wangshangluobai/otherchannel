fn main() {
  println!("Hello, world!");
  let number = 3;
  // if number < 5 {
  //   println!("condition was true");
  // } else {
  //   println!("condition was false");
  // }
  match number < 5 {
    true => println!("condition was true"),
    false => println!("condition was false"),
  }
}