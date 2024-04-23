// 数据类型
fn main() {
  /*
    整型及浮点型
    u8 u16 u32 u64 usize
    i8 i16 i32 i64 isize
           f32 f64
    8-bit 16-bit 32-bit 64-bit 128-bit 64-bit arch
    isize 和 usize 的大小是编译器根据系统决定
    i32 和 u32 和 f64 是默认类型 前两者大部分情况下运算速度最快
      对于浮点类型，运行效率相差不多，精度更高
    isize 和 usize 是默认类型
   */

  // 布尔类型 bool 单字节
  // let t = true;
  // let f: bool = false;

  // 字符类型 char 占4个字节
  // let c = 'z';

  // 复合类型
  // 元组  长度固定，无法修改
  // let tup: (i32, f64, u8) = (500, 6.4, 1);
  // let (x, y, z) = tup; // 元组解构
  // println!("The value of y is: {}, {}, {}", x, y, z);
  // let five_hundred = tup.0; // 元组索引
  // let six_point_four = tup.1;
  // let one = tup.2;
  // println!("The value of y is: {}, {}, {}", five_hundred, six_point_four, one);
  // 数组
  let a = [1, 2, 3, 4, 5]; // 数组的长度也是固定的 但存在动态数组
  let months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
  let b: [i32; 5] = [1, 2, 3, 4, 5];
  let c = [3; 5];
  println!("The value of a[0] is: {}", c[0]); // 元组索引取值的另一种方式
}