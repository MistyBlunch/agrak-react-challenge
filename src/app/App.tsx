import AppRouter from '@/AppRouter'
import { selectMessage } from '@/redux/slices/basicSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import './App.css'

function App() {
  const message = useAppSelector(selectMessage)
  const dispatch = useAppDispatch()

  return (
    <div>
      <AppRouter/>
    </div>
  )
}

export default App
