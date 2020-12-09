import shortid from 'shortid'

/**
 * @returns {string} A temporary id in the from of 'tmp_' + random
 */
export const makeTmpId = () => `tmp_${shortid.generate()}`