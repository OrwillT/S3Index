import { AwsClient } from 'aws4fetch'
import config from '../config'

const aws = new AwsClient({
    accessKeyId: config.s3.accessKey,
    secretAccessKey: config.s3.secretKey,
    region: config.s3.region,
    service: config.s3.service
})

export async function s3FetchHandler(rUrl) {
    const url = new URL(rUrl)
    url.hostname = config.s3.bucket + '.' + config.s3.endpoint
    const signedRequest = await aws.sign(url)
    return await fetch(signedRequest)
}