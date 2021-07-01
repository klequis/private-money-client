import * as R from 'ramda'
import { getFileExtension } from 'lib/getFileExtension'
import { addDefinedProperty } from 'lib/addDefinedProperty'

const isDuplicate = (fileName, currentFileNames) =>
  R.any(R.equals(R.__, fileName), currentFileNames)

/**
 *
 * @param {event} event fileDrop event
 * @param {string} acctId the account id the files were added to
 * @param {Array} currentFiles list of files from all previous drops
 * @returns {Array} array of accepted files
 */
export async function customFileGetter(event, acctId, currentFiles) {
  const currentFileNames = currentFiles.map((f) => f.name)

  const addProps = (file) => {
    const { name } = file
    const extension = getFileExtension(name)

    addDefinedProperty('extension', extension, file)
    const isCSVExtension = extension.toLowerCase() === 'csv'
    addDefinedProperty('hasCSVExtension', isCSVExtension, file)
    addDefinedProperty('acctId', acctId, file)
    const isDup = isDuplicate(name, currentFileNames)
    addDefinedProperty('duplicate', isDup, file)

    // TODO: restore original code
    // addDefinedProperty('accepted', isCSVExtension && !isDup, file)
    // tmp make accepted true for all
    addDefinedProperty('accepted', true, file)
    //

    addDefinedProperty('wasUploaded', false, file, true)
    addDefinedProperty('error', null, file)
    return file
  }

  const fileList = event.dataTransfer
    ? event.dataTransfer.files
    : event.target.files
  return R.map(addProps)(fileList)
}
