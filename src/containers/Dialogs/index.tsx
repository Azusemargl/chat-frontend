import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialogs as BaseDialog } from '../../components'
import { fetchDialogs } from '../../store/reducers/Dialogs'
import { AppState } from '../../store/store'

const Dialogs: React.FC<Props> = ({ ownerId }) => {
   const dispatch = useDispatch()
   const rooms = useSelector(({ dialogs }: AppState) => dialogs.rooms)

   const [searchValue, setSearchValue] = React.useState('')
   const [filtered, setFiltered] = React.useState(Array.from(rooms))

   const onChangeSearchInput = (value: string) => {
      setFiltered(rooms.filter(room => room.users[1].name.toLowerCase().indexOf(value.toLowerCase()) >= 0))
      setSearchValue(value)
   }

   React.useEffect(() => {
      if (!rooms.length) {
         dispatch(fetchDialogs())
      }
    }, [])

   React.useEffect(() => {
      setFiltered(rooms)
    }, [rooms])

   return (
      <BaseDialog
         rooms={filtered}
         ownerId={ownerId}
         value={searchValue}
         setValue={onChangeSearchInput}
      />
   )
}

export default Dialogs

type Props = {
   ownerId?: string | null
}