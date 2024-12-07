// validationRules.ts
export const validationRules = (
    images: (File | null)[],
    title: string,
    description: string,
    price: number,
    capacity: number,
    tags: string[],
    selectedDate: Date | null,
    coords: [number | undefined, number | undefined]
) => [
        {
            isValid: images.length > 0,
            errorMessage: "Hay que añadir mínimo una imagen"
        },
        {
            isValid: title.trim() !== "",
            errorMessage: "El campo 'Título' es obligatorio."
        },
        {
            isValid: description.trim() !== "",
            errorMessage: "El campo 'Descripción' es obligatorio."
        },
        {
            isValid: price && price > 0,
            errorMessage: "El campo 'Precio' debe ser mayor a 0."
        },
        {
            isValid: capacity && capacity > 0,
            errorMessage: "El campo 'Capacidad' debe ser mayor a 0."
        },
        {
            isValid: tags.length > 0,
            errorMessage: "Debe seleccionar al menos una categoría."
        },
        {
            isValid: !!selectedDate,
            errorMessage: "Debe seleccionar una fecha."
        },
        {
            isValid: coords[0] && coords[1],
            errorMessage: "Debe seleccionar una ubicación."
        }
    ]