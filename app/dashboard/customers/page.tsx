import prisma from '@/lib/prisma'

export default function DisplayCustomers() {
  const fetchCustomers = async () => {
    try {
      const customers = await prisma.customer.findMany({
        include: {
          applications: true,
        },
      })
      return customers
    } catch (error) {
      console.error('Error fetching customers:', error)
      return []
    }
  }

  const renderCustomers = async () => {
    const customers = await fetchCustomers()
    return (
      <div>
        <h2>Customers</h2>
        <ul>
          {customers.map((customer) => (
            <li key={customer.id}>
              <p>Name: {customer.name}</p>
              <p>Address: {customer.address}</p>
              <p>Phone Number: {customer.phoneNumber}</p>
              {customer.applications && (
                <ul>
                  {customer.applications.map((app) => (
                    <li key={app.id}>
                      Application ID: {app.id}, Status: {app.status}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return <>{renderCustomers()}</>
}
