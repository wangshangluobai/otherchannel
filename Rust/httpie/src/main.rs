// use clap::{Parser, SubCommand};

// // 定义 HTTPie 的 CLI 主入口 它包含若干个子命令
// // ///注释是文档， clap 会将其作为 CLI 的帮助信息

// /// 使用 Rust 实现 HTTPie 很简单吧
// #[derive(Parser, Debug)]
// // #[derive(clap)]
// #[clap(version = "1.0", author = "OC")]
// // #[clap(setting = AppSettings::ColoredHelp)]
// struct Opts {
//   // #[clap(Subcmd)]
//   subcmd: Methods,
// }

// // 子命令对应不同的 HTTP 方法, 目前只支持 GET 和 POST
// #[derive(Debug, SubCommand)]
// enum Methods {
//   Get(Get),
//   Post(Post),
//   // 暂时不支持其他的 HTTP 方法
// }

// // Get 子命令对应不同的

// /// 实现 Get 请求
// #[derive(Debug)]
// struct Get {
//   /// HTTP 请求的 URL
//   url: String,
// }

// // Post 子命令 需要输入 URL , 以及若干个可选的 key/value 键值对参数
// /// 实现 Post 请求的
// #[derive(Debug)]
// struct Post {
//   /// HTTP 请求的 URL
//   url: String,
//   /// HTTP 请求的参数
//   body: Vec<String>,
// }
// fn main() {
//   // println!("33333, {:?}", AppSettings);
//   let opts: Opts = Opts::parse();
//   println!("{:?}", opts);
// }


// src/main.rs  为减小篇幅，省略了单元测试，读者可自行补充。
use std::collections::HashMap;
use reqwest::{Client, header, Response};
use std::str::FromStr;
use anyhow::anyhow;
use clap::{Args, Parser, Subcommand};
use colored::Colorize;
use mime::Mime;
use reqwest::header::{HeaderMap, HeaderName, HeaderValue};
use reqwest::Url;

#[derive(Parser)]
#[command(version, author, about, long_about = None)]
struct Httpie {
    #[command(subcommand)]
    methods: Method,
}

#[derive(Subcommand)]
enum Method {
    Get(Get),
    Post(Post)
}

#[derive(Args)]
struct Get {
    #[arg(value_parser = parse_url)]
    url: String,
}

#[derive(Args)]
struct Post {
    /// Specify the url you wanna request to.
    #[arg(value_parser = parse_url)]
    url: String,

    /// Set the request body.
    /// Examples:
    ///     headers:
    ///         header1:value1
    ///     params:
    ///         key1=value1
    #[arg(required = true, value_parser = parse_kv_pairs)]
    body: Vec<KvPair>
}

#[derive(Debug, Clone)]
struct KvPair {
    k: String,
    v: String,
    t: KvPairType,
}

#[derive(Debug,Clone)]
enum KvPairType {
    Header,
    Param,
}

impl FromStr for KvPair {
    type Err = anyhow::Error;
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let pair_type: KvPairType;
        let split_char = if s.contains(':') {
            pair_type = KvPairType::Header;
            ':'
        } else {
            pair_type = KvPairType::Param;
            '='
        };

        let mut split = s.split(split_char);
        let err = || anyhow!(format!("failed to parse pairs {}",s));
        Ok(Self {
            k: (split.next().ok_or_else(err)?).to_string(),
            v: (split.next().ok_or_else(err)?).to_string(),
            t: pair_type,
        })
    }
}

fn parse_url(s: &str) -> anyhow::Result<String> {
    let _url: Url = s.parse()?;
    Ok(s.into())
}

fn parse_kv_pairs(s: &str) -> anyhow::Result<KvPair> {
    Ok(s.parse()?)
}

async fn get(client: Client, args: &Get) -> anyhow::Result<()> {
   let resp = client.get(&args.url).send().await?;
    Ok(print_resp(resp).await?)
}

async fn post(client: Client, args: &Post) -> anyhow::Result<()> {
    let mut body = HashMap::new();
    let mut header_map = HeaderMap::new();
    for pair in args.body.iter() {
        match pair.t {
            KvPairType::Param =>  {body.insert(&pair.k, &pair.v);}
            KvPairType::Header => {
                if let Ok(name) = HeaderName::from_str(pair.k.as_str()) {
                    if let Ok(value) = HeaderValue::from_str(pair.v.as_str()) {
                        header_map.insert(name,value);
                    } else {
                        println!("Invalid header value for key: {}", pair.v);
                    }
                } else {
                    println!("Invalid header key: {}", pair.k);
                }
            }
        }
    }
    let resp = client.post(&args.url)
        .headers(header_map)
        .json(&body).send().await?;
    Ok(print_resp(resp).await?)
}

async fn print_resp(resp: Response) -> anyhow::Result<()> {
    print_status(&resp);
    print_headers(&resp);
    let mime = get_content_type(&resp);
    let body = resp.text().await?;
    print_body(mime, &body);
    Ok(())
}

fn print_status(resp: &Response) {
    let status = format!("{:?} {}", resp.version(), resp.status()).blue();
    println!("{}\n", status);
}

fn print_headers(resp: &Response) {
    for (k,v) in resp.headers() {
        println!("{}: {:?}", k.to_string().green(), v);
    }
    print!("\n");
}

fn print_body(mime: Option<Mime>, resp: &String) {
    match mime {
        Some(v) => {
            if v == mime::APPLICATION_JSON {
                println!("{}", jsonxf::pretty_print(resp).unwrap().cyan())
            }
        }
        _ => print!("{}", resp),
    }
}

fn get_content_type(resp: &Response) -> Option<Mime> {
    resp.headers()
        .get(header::CONTENT_TYPE)
        .map(|v|v.to_str().unwrap().parse().unwrap())
}

#[tokio::main]
async fn main() -> anyhow::Result<()>{
    let httpie = Httpie::parse();
    let client = Client::new();
    let result = match httpie.methods {
        Method::Get(ref args) => get(client, args).await?,
        Method::Post(ref args) => post(client, args).await?,
    };
    Ok(result)
}