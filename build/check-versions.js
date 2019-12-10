'use strict'
const chalk = require('chalk')
const semver = require('semver')
const packageConfig = require('../package.json')
const shell = require('shelljs')

function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

const versionRequipxents = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequipxent: packageConfig.engines.node
  }
]

if (shell.which('npm')) {
  versionRequipxents.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequipxent: packageConfig.engines.npm
  })
}

module.exports = function () {
  const warnings = []

  for (let i = 0; i < versionRequipxents.length; i++) {
    const mod = versionRequipxents[i]

    if (!semver.satisfies(mod.currentVersion, mod.versionRequipxent)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequipxent)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }

    console.log()
    process.exit(1)
  }
}
