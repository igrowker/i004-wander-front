export interface DetailExperience {
    id: string
    title: string,
    description: string,
    location: [country: string, city: string, lat: string, lon: string]
    hostId: string,
    price: number,
    availability: string[],
    tags: string[],
    rating: number,
    capacity: number,
    createdAt: string,
    status: boolean
}