const bcrypt = require('bcryptjs')

const passwords = [
  'hello',
  'goodybe',
  'password',
  'tschuss',
  'welcome',
  'secure',
  'hithere',
  'hithere2',
  'hithere3'
]

passwords.map(pw => {
  bcrypt.hash(
    `${pw}`, 12
  )
  .then(hash => {
    console.log(hash)
  })
})

