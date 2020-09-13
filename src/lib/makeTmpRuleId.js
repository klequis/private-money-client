import shortid from 'shortid'
// eslint-disable-next-line
import { blue } from 'logger'

const makeTmpRuleId = () => `tmp_${shortid.generate()}`

export default makeTmpRuleId