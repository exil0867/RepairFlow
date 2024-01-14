import prisma from '@/lib/prisma'

export default function DisplayDevices() {
  const fetchDevices = async () => {
    try {
      const devices = await prisma.device.findMany({
        include: {
          applications: true,
        },
      })
      return devices
    } catch (error) {
      console.error('Error fetching devices:', error)
      return []
    }
  }

  const renderDevices = async () => {
    const devices = await fetchDevices()
    return (
      <div>
        <h2>Devices</h2>
        <ul>
          {devices.map((device) => (
            <li key={device.id}>
              <p>Serial number: {device.serialNumber}</p>
              <p>Model: {device.model}</p>
              <p>Brand: {device.brand}</p>
              {device.applications && (
                <ul>
                  {device.applications.map((app) => (
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

  return <>{renderDevices()}</>
}
