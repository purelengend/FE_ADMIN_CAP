import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const config = {
  bucketName: import.meta.env.VITE_REACT_APP_BUCKET_NAME,
  region: import.meta.env.VITE_REACT_APP_REGION,
  accessKeyId: import.meta.env.VITE_REACT_APP_ACCESS,
  secretAccessKey: import.meta.env.VITE_REACT_APP_SECRET,
  credentials: {
    accessKeyId: import.meta.env.VITE_REACT_APP_ACCESS,
    secretAccessKey: import.meta.env.VITE_REACT_APP_SECRET,
  },
  signatureVersion: 'v4',
}

const client: any = new S3Client(config)

export const uploadSingle = async (file: any) => {
  const uploadPromise: Promise<string> = new Promise(async (resolve, reject) => {

    const params = {
      Bucket: import.meta.env.VITE_REACT_APP_BUCKET_NAME,
      Key: file.name,
      Body: file,
      ContentType: 'image/jpg',
      Region: import.meta.env.VITE_REACT_APP_REGION,
    }
    let url: string = ''
    try {
      const putObject: any = new PutObjectCommand(params)
      const data = await client.send(putObject)
      url = await getSignedUrl(client, putObject)

    } catch (err) {
      console.log('Error', err)
      return ""
    }
    resolve(url.split('?')[0])
  })

  uploadPromise.then((response) => {
    return response
  })
  return uploadPromise
}

export const uploadMultiple = async (data: any) => {
  let listUrls: string[] = []
  const promise = Array.from(data).map(async file => {
    const url = await uploadSingle(file)
    listUrls.push(url)
  })
  await Promise.all(promise)
  return listUrls
}

