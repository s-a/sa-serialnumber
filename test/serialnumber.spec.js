const assert = require('assert')
const Serialnumber = require('./../lib/index.js')

const map = ['client', 'id']
const client = '2344549'
const id = '2342342345'

describe('Serialnumber Module', function () {
	it('should encode and resolve result by given map', async function () {
		const s = new Serialnumber({ map })

		const e = s.encode(`${client}-${id}`)
		const d = s.decode(e.encodedString)
		assert.deepEqual(e.encoded, d.encoded)
		assert.deepEqual(e.decoded, d.decoded)
	})

	it('should decode and resolve result by given map', async function () {
		const s = new Serialnumber({ map })

		const e = s.encode(`${client}-${id}`)
		const d = s.decode('exhmigsysntxsnzgwhgimsnhkiksqheiysx')
		assert.deepEqual(e.encoded, d.encoded)
		assert.deepEqual(e.decoded, d.decoded)
	})
})