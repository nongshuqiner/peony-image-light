// 判断是否为isBase64的，如果是则返回true
export function isBase64 (value) { // 判断是否为base64
  if (new RegExp(/^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i).test(value)) {
    return true
  }
  return false // 如果不是,返回false
}
