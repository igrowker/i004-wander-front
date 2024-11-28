export interface Experience {
    id: string
    title: string,
    description: string,
    location: string,
    hostId: string,
    price: number,
    availability: string[],
    tags: string[],
    rating: number,
    capacity: number,
    createdAt: string,
    status: boolean
}