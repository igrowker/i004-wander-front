import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { addMonths } from "date-fns";
import "./AddExperience.css";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../contexts/auth.context";
import { experienceServices } from "../../services/addExperience.services";
import uploadServices from "../../services/upload.services";
import SelectCords from "./Map/SelectionCoords";
import FormImagePicker from "../Upload/FormImagePicker";
import { validationRules } from "../../consts/experienceValidationRules"
import { availableTags } from "../../consts/experienceTags"
import imagePlaceholder from '../../assets/img/image-thumb.svg'
import imagePlaceholderHero from '../../assets/img/image-placeholder.svg'

type Coords = [number | undefined, number | undefined];
type infoCoords = any;

const AddExperience = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [availability, setAvailability] = useState<{ [date: string]: string[]; }>({});
  const [heroImg, setHeroImg] = useState<string>("")
  const [imageFiles, setImageFiles] = useState<(File | null)[]>(Array(5).fill(null))
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [capacity, setCapacity] = useState<number>(0);
  const [tags, setTags] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedHour, setSelectedHour] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")

  // Validaciones
  const validateForm = (): boolean => {
    const rules = validationRules(
      imageFiles,
      title,
      description,
      price,
      capacity,
      tags,
      selectedDate,
      coords
    )

    for (const rule of rules) {
      if (!rule.isValid) {
        setErrorMessage(rule.errorMessage)
        return false
      }
    }

    return true
  }


  const [showModal, setShowModal] = useState(false); // Para mostrar/ocultar el modal

  //Imagen principal
  const handlePhotoChange = (selectedImg: string) => {
    setHeroImg(selectedImg)
  }

  // // Manejar la carga de imágenes

  const handleImageUpload = async () => {
    const token = user?.token
    let s3Urls: string[] = []

    try {
      const uploadResult = await uploadServices.uploadImages(imageFiles.filter(file => file !== null) as File[], token)
      s3Urls = uploadResult.s3Urls
    } catch (error) {
      console.error("Error haciendo upload de las imágenes:", error)
      throw new Error("Hubo un error al subir las imágenes. Inténtalo nuevamente.")
    }

    return s3Urls
  }

  // Manejar la hora seleccionada
  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedHour(e.target.value);
  };

  const handleTagSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTag = event.target.value;
    if (selectedTag && !tags.includes(selectedTag)) {
      setTags((prevTags) => [...prevTags, selectedTag]);
    }
  };

  // Manejar la fecha seleccionada
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  // Agregar disponibilidad para la fecha seleccionada y hora
  const addAvailabilityForDate = () => {
    if (selectedDate && selectedHour) {
      const dateKey = selectedDate.toISOString().split("T")[0];
      setAvailability((prev) => {
        const newAvailability = { ...prev };
        if (!newAvailability[dateKey]) {
          newAvailability[dateKey] = [];
        }
        if (!newAvailability[dateKey].includes(selectedHour)) {
          newAvailability[dateKey].push(selectedHour);
        }
        return newAvailability;
      });
      setSelectedHour("");
    }
  };

  // Eliminar disponibilidad para una fecha y hora específica
  const removeAvailability = (date: string, hour: string) => {
    setAvailability((prev) => {
      const newAvailability = { ...prev };
      if (newAvailability[date]) {
        newAvailability[date] = newAvailability[date].filter((h) => h !== hour);
      }
      return newAvailability;
    });
  };

  // Formatear disponibilidad
  const formatAvailabilityDates = () => {
    const formattedDates: string[] = [];
    Object.entries(availability).forEach(([date, hours]) => {
      hours.forEach((hour) => {
        const [hourPart, minutePart] = hour.split(":");
        const fullDate = new Date(date);
        fullDate.setUTCHours(Number(hourPart), Number(minutePart), 0, 0);
        formattedDates.push(fullDate.toISOString());
      });
    });
    return formattedDates;
  };

  // Agregar un valor al array de `location`
  // const addLocation = (value: string) => {
  //   setLocation((prev) => [...prev, value]);
  // };

  // // Eliminar un valor del array de `location`
  // const removeLocation = (index: number) => {
  //   setLocation((prev) => prev.filter((_, i) => i !== index));
  // };

  // const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     const input = e.currentTarget.value.trim();
  //     if (input && !tags.includes(input)) {
  //       setTags([...tags, input]);
  //       e.currentTarget.value = ""; // Limpia el campo después de agregar el tag
  //     }
  //   }
  // };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir el envío del formulario

    if (!validateForm()) {
      setShowModal(true); // Mostrar el modal si la validación falla
      return; // No continuar si la validación falla
    }

    // intentamos ver si las imágenes se suben correctamente a nuestro bucket S3
    let s3Urls: string[] = []
    try {
      s3Urls = await handleImageUpload()
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
        alert(error.message)
      } else {
        console.error("Unexpected error", error)
        alert("An unexpected error occurred. Please try again.")
      }
      return
    }

    // Si la validación pasa, puedes hacer la llamada al backend
    const location = [
      infoCoords.country,
      infoCoords.city,
      coords[0]?.toFixed(4),
      coords[1]?.toFixed(4),
    ];

    const payload = {
      title,
      description,
      location,
      hostId: user?._id,
      price,
      availabilityDates: formatAvailabilityDates(),
      tags,
      capacity,
      images: s3Urls
    };

    try {
      const response = await experienceServices.addExperience(payload);
      console.log("Respuesta del backend:", response.data);
      alert("¡Experiencia añadida con éxito!");
      navigate("/user-profile");
    } catch (error) {
      console.error("Error al enviar los datos al backend:", error);
      alert("Hubo un error al añadir la experiencia. Inténtalo nuevamente.");
    }
  };

  const [coords, setCoords] = useState<Coords>([undefined, undefined]);
  const [infoCoords, setInfoCoords] = useState<infoCoords>({});

  // Función para realizar la geocodificación inversa
  const reverseGeocode = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&accept-language=es`
      );
      if (!response.ok) throw new Error("Error fetching location data");

      const { address } = await response.json();
      return address; // Contiene información como la ciudad, país, etc.
    } catch (error) {
      console.error("Error in reverse geocoding:", error);
      return null;
    }
  };

  // Llamar a reverseGeocode cuando las coordenadas cambien
  useEffect(() => {
    const fetchLocationData = async () => {
      if (coords[0] !== undefined && coords[1] !== undefined) {
        const data = await reverseGeocode(coords[0], coords[1]);

        setInfoCoords(data);
      }
    };

    fetchLocationData();
  }, [coords]); // Ejecutar cuando coords cambie

  const closeModal = () => {
    setShowModal(false);
    setErrorMessage(""); // Limpiar el mensaje de error al cerrar el modal
  };

  return (
    <div className="px-8 pt-4">
      <h1 className="label-1 pb-2">Añadir Experiencia</h1>
      <form onSubmit={handleSubmit} className="mb-5">
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <p className="modal-text">{errorMessage}</p>
              <button className="modal-close-button" onClick={closeModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Sección de imágenes */}
        <div className="flex flex-col items-start justify-center mb-4">
          <div className="h-[250px] w-[540px] bg-transparent border border-gray-300 rounded-lg flex items-center justify-center mb-4">
            {heroImg ? (
              <img
                className="object-cover w-full h-full rounded-lg"
                src={heroImg}
                alt="image"
              />
            ) : (
              <div className="w-[106px] h-[106px] flex items-center justify-center">
                <img
                  className="object-cover w-full h-full"
                  src={imagePlaceholderHero}
                  alt="image"
                />
              </div>
            )}
          </div>
          <FormImagePicker
            placeholderImg={imagePlaceholder}
            maxImages={5}
            onHeroImageChange={handlePhotoChange}
            imageFiles={imageFiles}
            setImageFiles={setImageFiles}
          />
        </div>

        {/* Título de la experiencia */}
        <div className="content">
          <h1 className="label">Titulo Experiencia</h1>
          <textarea
            className="titulo-input"
            placeholder="Escribe el Titulo de la Experiencia"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Descripción */}
        <div className="content">
          <h1 className="label">Descripcion</h1>
          <textarea
            className="description-input"
            placeholder="Escribe una descripcion de la experiencia"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="px-3 form-grou">
          <label className="label">Categorias</label>
          <select value="" onChange={handleTagSelect} className="tags-select">
            <option value="">Selecciona una Categoria</option>
            {availableTags.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <div className="tags-list">
            {tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(index)}
                  className="remove-tag"
                >
                  X
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Disponibilidad */}
        <div className="form-group">
          <label className="label">Disponibilidad</label>

          {/* Selección de rango de fechas */}
          <div className="date-picker">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange} // Ahora actualiza la fecha seleccionada
              minDate={new Date()}
              maxDate={addMonths(new Date(), 5)}
              inline
              showDisabledMonthNavigation
            />
          </div>

          {/* Selección de hora */}
          <div className="time-selection">
            <label className="label-hora">Hora disponible</label>
            <input
              type="time"
              value={selectedHour}
              onChange={handleHourChange}
              className="time-input"
            />
            <button
              type="button"
              className="add-availability-button"
              onClick={addAvailabilityForDate}
            >
              Agregar hora
            </button>
          </div>
        </div>

        {/* Mostrar disponibilidad seleccionada */}
        <div className="px-3 pb-4 availability-summary">
          <ul className="">
            {Object.entries(availability).map(([date, hours]) => (
              <li key={date} className="flex gap-4">
                <strong>{date}:</strong>
                <ul>
                  {hours.map((hour, index) => (
                    <li key={index}>
                      {hour}{" "}
                      <button
                        className="remove-availability-button"
                        onClick={() => removeAvailability(date, hour)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        {/* Otros campos */}
        <div className="px-3 form-group">
          <label className="label">Capacidad</label>
          <input
            onChange={(e) => setCapacity(Number(e.target.value))}
            type="number"
            className="input"
            placeholder="Ejemplo: 2"
          />
        </div>

        <div className="mb-4">
          <h1 className="label">Ubicación</h1>
          <SelectCords
            coords={coords}
            setCoords={setCoords}
            infoCoords={infoCoords}
          />
        </div>

        <div className="px-3 form-group">
          <label className="label">Precio por persona</label>
          <div className="price-input">
            <span className="currency">$</span>
            <input
              type="number"
              className="input price-field"
              placeholder="Ejemplo: 20"
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
        </div>
        {/* Etiquetas (Lista desplegable) */}

        <div className="button-container">
          <button type="submit" className="submit-button">
            Añadir experiencia
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExperience