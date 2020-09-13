import shortid from 'shortid'
// eslint-disable-next-line
import { blue } from 'logger'

const ruleTmpMakeId = () => `tmp_${shortid.generate()}`

export default ruleTmpMakeId