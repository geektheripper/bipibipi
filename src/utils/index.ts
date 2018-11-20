export const errorMsg = {
  responseUnexpected: 'Error: Server Response Unexpected',
  badRequest: 'Error: BadRequest',
  noLogin: 'Error: NoLogin',
}

export const prefix = {
  // site address
  homepage: 'https://www.bilibili.com',
  space: 'https://space.bilibili.com',
  passport: 'https://passport.bilibili.com',
  // cdn addresses
  bfs: [
    'https://i0.hdslb.com',
    'https://i1.hdslb.com',
    'https://i2.hdslb.com',
    'https://i3.hdslb.com',
  ],
  // api address
  liveApi: 'https://api.live.bilibili.com',
  vcApi: 'https://api.vc.bilibili.com',
  api: 'https://api.bilibili.com',
}

export const asyncUtil = {
  delay: timeout => new Promise(reslove => setTimeout(reslove, timeout * 1e3)),
}
