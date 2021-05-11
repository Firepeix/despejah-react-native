export default class DatePrimitive {
  constructor (date) {
    this.date = date
  }

  /**
   * Converte a data para o formato brasileiro
   * @param dateString
   * @return {*}
   */
  static toEURDateString (dateString) {
    return dateString.split('-').reverse().join('/');
  }

  /**
   * Converte a data para o formato ISO
   * @param dateString
   * @return {*}
   */
  static toISODateString (dateString) {
      return dateString.split('/').reverse().join('-');
  }

  /**
   * Verifica se é uma data valida
   * @param date
   * @return {boolean}
   */
  static isValid(date) {
    const invalidStates = ['Invalid Date', 'InvalidDate']
    return invalidStates.find(state => state === String(date)) === undefined
  }
}
