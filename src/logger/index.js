import chalk from 'chalk'

export const LOG_RENDER = false

const styleRed = ['color: #ff0000', 'font-weight: bold'].join(';')

const styleGreen = ['color: #00ff00', 'font-weight: bold'].join(';')

const styleBlue = ['color: #00ced1', 'font-weight: bold'].join(';')

const styleOrange = ['color: #ffa500', 'font-weight: bold'].join(';')

const stylePink = ['color: #ff69b4', 'font-weight: bold'].join(';')
const styleYellow = ['color: #ffd700', 'font-weight: bold'].join(';')
const stylePurple = [
  'color: #885ead', // 551a8b
  'font-weight: bold'
].join(';')

const checkValue = (value) => {
  if (value === undefined) {
    return ''
  } else {
    return value
  }
}

const getStyle = (styleName) => {
  let color
  switch (styleName) {
    case 'red':
      color = styleRed
      break
    case 'blue':
      color = styleBlue
      break
    case 'green':
      color = styleGreen
      break
    case 'orange':
      color = styleOrange
      break
    case 'pink':
      color = stylePink
      break
    case 'yellow':
      color = styleYellow
      break
    case 'purple':
      color = stylePurple
      break
    default:
      color = ''
  }

  return color
}

const makeMessage = (message = '', value = '', color = '', indent = 0) => {
  if (process.env.NODE_ENV === 'production') {
    return
  }
  const nMessage = `%c[${message}]`
  const style = getStyle(color)
  const padding = ''.padStart(indent, ' ')
  // eslint-disable-next-line no-console
  console.log(`${padding}${nMessage}`, style, value)
}

export const yellow = (message = '', value = undefined) => {
  makeMessage(message, value, 'yellow')
}
export const blue = (message = '', value = undefined) => {
  makeMessage(message, value, 'blue')
}
export const red = (message = '', value = undefined) => {
  makeMessage(message, value, 'red')
}
export const green = (message = '', value = undefined) => {
  makeMessage(message, value, 'green')
}

export const orange = (message = '', value = undefined, indent = 0) => {
  makeMessage(message, value, 'orange', indent)
}

export const pink = (message = '', value = undefined) => {
  makeMessage(message, value, 'pink')
}

export const purple = (message = '', value = undefined) => {
  makeMessage(message, value, 'purple')
}

export const log = (
  message = '',
  value = undefined,
  color = '',
  indent = false
) => {
  let count = 3
  if (color === '') {
    count--
  }
  if (value === undefined) {
    count--
  }

  let nMessage
  if (count === 1) {
    nMessage = indent ? '  [log]' : '[log]'
    value = message
  } else {
    nMessage = indent ? `  %c[${message}]` : `%c[${message}]`
  }
  const style = getStyle(color)

  // eslint-disable-next-line no-console
  console.log(nMessage, style, value)
}

export const redf = (message = '', value = '') => {
  log(chalk.red(`${message}`), checkValue(value))
}
export const greenf = (message, value) => {
  log(chalk.green(`${message}`), checkValue(value))
}
export const yellowf = (message, value) => {
  log(chalk.yellow(`${message}`), checkValue(value))
}
export const bluef = (message, value) => {
  log(chalk.blue(`${message}`), checkValue(value))
}

export const logReducer = (reducerName, state, type, payload) => {
  console.group(reducerName)
  blue('state', state)
  blue('type', type)
  blue('payload', payload)
  console.groupEnd()
}

export const logRender = (componentName) =>
  LOG_RENDER && orange(`*${componentName} - render`)
