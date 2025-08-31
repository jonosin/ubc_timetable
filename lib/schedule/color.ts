import crypto from 'crypto'

export function colorFor(subjectCode: string, courseNumber: string) {
  const hash = crypto.createHash('md5').update(subjectCode + courseNumber).digest('hex')
  const hue = parseInt(hash.slice(0, 6), 16) % 360
  const base = `hsl(${hue},70%,50%)`
  const light = `hsl(${hue},70%,85%)`
  return { base, light }
}
