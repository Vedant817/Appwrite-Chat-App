import React, { useState, useEffect } from 'react'
import { databases, DATABASE_ID, COLLECTION_ID_MESSAGE } from '../appwriteConfig';


const Room = () => {

  const [messages, setMessages] = useState([])
  useEffect(() => {
    getMessages()
  }, [])

  const getMessages = async () => {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_MESSAGE);
    console.log('RESPONSE: ', response);
    setMessages(response.documents)
  }

  return (
    <main className='container'>
      <div className='room--container'>
        <div>
          {messages.map((message) => (
            <div key={message.$id} className='message--wrapper'>
              <div className='message--header'>
                <p className='message-timestamp'>{message.$createdAt}</p>
              </div>
              <span>{message.body}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Room