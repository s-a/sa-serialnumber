const Hashids = require('hashids/cjs')

function SerialNumber(options) {
	this.salt = options.salt || ''
	this.minLength = options.minLength || 0
	this.hasCharset = options.hasCharset || 'abcdefgijhklmnopqrstwxy'
	this.hashDelimiter = options.hashDelimiter || 'z'
	this.delimiter = options.delimiter || '-'
	this.map = options.map || []
	this.hash = new Hashids(this.salt, this.minLength, this.hasCharset)
	return this
}

SerialNumber.prototype.decode = function (str) {
	const sections = str.split(this.hashDelimiter)
	const map = this.map || []
	const decodes = []
	const result = {
		decoded: {},
		encoded: {}
	}

	for (let i = 0; i < sections.length; i++) {
		const section = sections[i]
		const sectionName = map[i] || `section${i}`
		const dec = this.hash.decode(section).join('')
		result.decoded[sectionName] = dec
		result.encoded[sectionName] = section
		decodes.push(result.decoded[sectionName])
	}
	result.encodedString = str
	result.decodedString = decodes.join(this.delimiter)
	return result
}

SerialNumber.prototype.explodeString = function (str) {
	const result = str.split('')
	for (let c = 0; c < result.length; c++) {
		result[c] = parseInt(result[c], 10)
	}
	return result
}

SerialNumber.prototype.encodeSection = function (str) {
	return this.hash.encode(this.explodeString(str))
}

SerialNumber.prototype.encode = function (str) {
	const sections = str.split(this.delimiter)
	const map = this.map || []
	const encodes = []
	const result = {
		decoded: {},
		encoded: {}
	}

	for (let i = 0; i < sections.length; i++) {
		const section = sections[i]
		const sectionName = map[i] || `section${i}`
		result.decoded[sectionName] = section
		result.encoded[sectionName] = this.encodeSection(section)
		encodes.push(result.encoded[sectionName])
	}
	result.decodedString = str
	result.encodedString = encodes.join(this.hashDelimiter)
	return result
}

module.exports = SerialNumber