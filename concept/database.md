```mermaid
classDiagram
    class User {
        + username: string
        + password: string
        + email: string
    }

    class Application {
        + applicationId: int
        + status: string
        + deviceId: int
        + customerId: int
    }

    class Device {
        + deviceId: int
        + serialNumber: string
        + model: string
        + brand: string
    }

    class Customer {
        + customerId: int
        + firstName: string
        + lastName: string
        + address: string
        + phoneNumber: string
    }

    User "1" -- "1..*" Application
    Application "1" -- "1" Device
    Application "1" -- "1" Customer