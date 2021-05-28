import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchMessages } from '../../store/reducers/Messages'
import { Empty, Loader, Messages as BaseMessage } from '../../components'
import { AppState } from '../../store/store'

const Messages: React.FC<Props> = ({ ownerId }) => {
   const dispatch = useDispatch()
   const messages = useSelector(({ messages }: AppState) => messages.messages)
   const isLoading = useSelector(({ messages }: AppState) => messages.isLoading)
   const { id } = useParams<Params>()

   React.useEffect(() => {
      if (id) {
         dispatch(fetchMessages(id))
      }
   }, [id])

   if (isLoading) return <Loader />
   if (!id && !isLoading) return <Empty text="Выберите диалог" />
   if (!messages.length && id && !isLoading) return <Empty text="Нет сообщений" />

   return <BaseMessage items={messages} ownerId={ownerId} />
}

export default Messages

// Types
type Params = {
   id: string
}
type Props = {
   ownerId?: string | null
}