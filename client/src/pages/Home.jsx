import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
    <Link to='/routeOverview'>
      <a href="#routeoverview">
        <h3>Routes</h3>
      </a>
    </Link>
    <Link to='/addCustomer'>
      <a href='/addCustomer'>
        <h3>Add Customer</h3>
      </a>
    </Link>
    </>
  )
}

export default Home