export interface IExperience {
	_id: string,
	title: string,
	description: string,
	location: string,
	// location: {
		// lat: number,
		// long: number,
		// country: string,
		// city: string
	// }
	hostId: string,
	price: number,
	availabilityDates: Date[],
	tags: string[],
	rating: number,
	capacity: number,
	createdAt: Date
}