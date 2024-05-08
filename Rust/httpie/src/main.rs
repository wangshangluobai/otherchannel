use clap;

// 定义 HTTPie 的 CLI 主入口 它包含若干个子命令
// ///注释是文档， clap 会将其作为 CLI 的帮助信息

/// 使用 Rust 实现 HTTPie 很简单吧
// #[derive(Clap, Debug)]
// #[clap(version = "1.0", author = "OC")]
// #[clap(setting = AppSettings::ColoredHelp)]
// struct Opts {
  // #[clap(subcommand)]
  // subcmd: SubCommand,
// }

// 子命令对应不同的 HTTP 方法, 目前只支持 GET 和 POST
// #[derive(Clap, Debug)]
// enum SubCommand {
//   Get(Get),
//   Post(Post),
//   // 暂时不支持其他的 HTTP 方法
// }

// Get 子命令对应不同的

/// 实现 Get 请求
// #[derive(Clap, Debug)]
// struct Get {
//   /// HTTP 请求的 URL
//   url: String,
// }

// Post 子命令 需要输入 URL , 以及若干个可选的 key/value 键值对参数
/// 实现 Post 请求的
// #[derive(Clap, Debug)]
// struct Post {
//   /// HTTP 请求的 URL
//   url: String,
//   /// HTTP 请求的参数
//   body: Vec<String>,
// }
fn main() {
  println!("33333, {:?}", clap);
  // let opts: Opts = Opts::parse();
  // println!("{:?}", opts);
}
