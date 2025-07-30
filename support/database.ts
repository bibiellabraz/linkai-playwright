import {MongoClient} from 'mongodb'

const client = new MongoClient('mongodb://localhost:27017/linkai')

export async function removeUserByEmail(email: string) {
    await client.connect()

    const result = await client
    .db()
    .collection('users')
    .deleteOne({email: email})

    return result.deletedCount
}