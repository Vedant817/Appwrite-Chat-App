import { useState, useEffect } from 'react'
import { databases, DATABASE_ID, COLLECTION_ID_MESSAGE } from '../appwriteConfig';
import { ID, Query } from 'appwrite';


const Room = () => {
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState('')

  useEffect(() => {
    getMessages()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      body: messageBody
    }

    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGE,
      ID.unique(),
      payload
    )
    console.log('Created!! ', response);
    setMessages(prevState => [response, ...messages])
    setMessageBody('')
  }

  const getMessages = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID_MESSAGE,
        //TODO: Adding the Query for Fetching the Messages in order.
        // [
        //   Query.orderDesc("$createdAt"),
        //   Query.limit(100)
        // ]
      )
      console.log('RESPONSE: ', response);
      setMessages(response.documents)
    } catch (error) {
      alert('Error Fetching the Messages!!', error)
    }
  }

  return (
    <main className='container'>
      <div className='room--container'>

        <form id='message--form' onSubmit={handleSubmit}>
          <div>
            <textarea required maxLength='1000' placeholder='Say Something...' onChange={(e) => { setMessageBody(e.target.value) }} value={messageBody} />
          </div>
          <div className='send-btn--wrapper'>
            <input className='btn btn--secondary' type='submit' value='Send' />
          </div>
        </form>

        <div>
          {messages.map((message) => (
            <div key={message.$id} className='message--wrapper'>
              <div className='message--header'>
                <small className='message-timestamp'>{message.$createdAt}</small>
              </div>
              <div className='message--body'>
                <span>{message.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Room