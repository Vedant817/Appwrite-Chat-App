import { Client, Databases } from 'appwrite';

export const PROJECT_ID = '65d797e75d8e78a86fd6'
export const DATABASE_ID = '65d79898ee9ec3aeaa70'
export const COLLECTION_ID_MESSAGE = '65d798a5d7d54d7ad75f'

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65d797e75d8e78a86fd6');

export const databases = new Databases(client); //? Database Setup


export default client;