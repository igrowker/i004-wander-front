import { createContext, useState, ReactNode } from "react"
import { INewReservation, IReservationContext } from "../types/reservation"
import { Outlet } from "react-router-dom"
import { IExperience } from "../types/experience"

// 1. Crear el contexto y dar valor por defecto
const defaultState: IReservationContext = {
	experience: null,
	setExperience: () => { },
	reservation: null,
	updateReservationData: () => { }
}

export const ReservationContext = createContext<IReservationContext>(defaultState)

// 2. Crear el proveedor, un componente que envuelve otros componentes para proveer el estado.
type ReservationProviderProps = {
	children: ReactNode
}

const ReservationProvider = ({ children }: ReservationProviderProps) => {
	const storedExperience = localStorage.getItem("experience")
	const storedReservation = localStorage.getItem("reservation")

	const initialExperience = storedExperience ? JSON.parse(storedExperience) : null
	const initialReservation = storedReservation ? JSON.parse(storedReservation) : null

	const [experience, setExperience] = useState<IExperience | null>(initialExperience)
	const [reservation, setReservation] = useState<Partial<INewReservation> | null>(initialReservation)

	const updateReservationData = (updatedData: Partial<INewReservation>) => {
		setReservation((prev) => prev ? ({ ...prev, ...updatedData }) : { ...updatedData })
	}

	return (
		<ReservationContext.Provider
			value={{
				experience,
				setExperience,
				reservation,
				updateReservationData
			}}>
			{children}
		</ReservationContext.Provider>
	)
}

export const ReservationProviderWrapper = () => {
	return (
		<ReservationProvider>
			<Outlet />
		</ReservationProvider>
	)
}