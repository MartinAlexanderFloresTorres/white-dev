/**
 *
 * @param {*} date - date in format YYYY-MM-DD
 * @returns {string} date in format DD/MM/YYYY
 */
export const get_DMY = (date) => {
  const d = new Date(date)
  // padStart(2, '0') -> significa que si el numero es menor a 2 digitos, se le agregara un 0 a la izquierda
  return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`
}
