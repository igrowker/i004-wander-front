// Retorna el formato de fecha DD/MM/YYYY

export function formatToShortDate(longDate : string) {
    const date = new Date(longDate);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2); 
  
    return `${day}/${month}/${year}`;


}

export function formatCategory(category: string | string[]) {
    
    const categoryString = Array.isArray(category) ? category[0] : category;

    if (!categoryString) return '';
    return categoryString.charAt(0).toUpperCase() + categoryString.slice(1);
  }