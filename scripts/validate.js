import { readFile } from 'node:fs/promises'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'

const schemaPath = process.argv[2]
const dataPath = process.argv[3]

const schema = JSON.parse(await readFile(schemaPath, 'utf-8'))
const data = JSON.parse(await readFile(dataPath, 'utf-8'))

const ajv = new Ajv({ allErrors: true, strict: false })
addFormats(ajv)
const validate = ajv.compile(schema)
const valid = validate(data)
if (!valid) {
  console.error('Validation failed:')
  for (const err of validate.errors) {
    console.error(`  - ${err.instancePath || '(root)'}: ${err.message}`)
  }
  process.exit(1)
}
console.log('Validation passed.')
