import { IExperience } from "./experience"

export type ReservationStatus = "pending" | "confirmed" | "canceled"
export type ReservationPaymentStatus = "pending" | "confirmed"

export interface IReservationContext {
	experience: IExperience | null,
	setExperience: (experience: IExperience) => void,
	reservation: Partial<INewReservation> | null,
	updateReservationData: (updatedData: Partial<INewReservation>) => void
}

export interface IReservation {
	_id: string,
	// orderNum: string // Cambiarlo por una fecha u otro dato
	experienceId: string,
	userId: string,
	status: ReservationStatus,
	bookingDate: Date,
	totalPrice: number,
	participants: number,
	paymentStatus: ReservationPaymentStatus
	createdAt: Date
}

export interface INewReservation {
	experienceId: string | null,
	userId: string | null,
	email: string | null,
	phone: string | null,
	participants: string,
	totalPrice: number,
	bookingDate: Date
	// bookingDate: {
	// 	date: Date[],
	// 	hour: string
	// } | null
}