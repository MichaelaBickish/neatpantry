
export function makePasscode() {
  let passcode = ''
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  for (let i = 1; i < 8; i++) {
    const c = Math.floor(Math.random() * chars.length + 1)
    passcode += chars.charAt(c)
  }
  return passcode
}
