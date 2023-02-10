import { Navbar } from '@/components/Navbar'
import { EditUser } from '@/pages/EditUser'
import { Home } from '@/pages/Home'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import { AddUser } from './pages/AddUser'

export default function AppRouter() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/edit" element={<EditUser />} />
      </Routes>
    </Router>
  )
}
