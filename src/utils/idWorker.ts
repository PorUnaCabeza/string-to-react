const next = function(): string {
  let d = new Date().getTime()
  let id = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c == 'x' ? r : (r & 0x7) | 0x8).toString(16)
  })
  return id
}

export default {
  next
}
