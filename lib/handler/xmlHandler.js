import { s3FetchHandler } from './s3FetchHandler'
import { parseString } from 'xml2js'

export class XmlHandler {
  /**
   * @param {{
   *   request: request
   *   maxKeys?: number
   *   prefix?: string
   *   delimiter?: string
   * }} options
   */
  constructor ({ request, maxKeys, prefix, delimiter}) {
    if (request == null) throw new TypeError('request is a requires option')
    this.request = request
    this.maxKeys = maxKeys
    this.prefix = prefix
    this.delimiter = delimiter
  }

  async fetch() {
    const url = new URL(this.request.url)
    
    if (typeof (this.maxKeys) === 'number') {
      url.searchParams.append('max-keys', this.maxKeys)
    }

    if (typeof (this.prefix) === 'string') {
      url.searchParams.append('prefix', this.prefix)
    }

    if (typeof (this.delimiter) === 'string') {
      url.searchParams.append('delimiter', this.delimiter)
    }

    const s3Response = await s3FetchHandler(url)
    const s3Xml = await s3Response.text()
    let s3Json = {}

    parseString(s3Xml, { explicitArray: false }, function (err, result) {
      if (err) throw err
      s3Json = result
    })

    return s3Json
  }
}