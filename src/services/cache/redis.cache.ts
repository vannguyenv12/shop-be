import { createClient } from 'redis';

const client = createClient({
  url: 'redis://localhost:6380'
})

client.on('error', err => console.log('Redis Client Error', err))

client.connect();

export default client;