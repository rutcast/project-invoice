/**
 * @typedef {object} invoice
 * @property {string} date
 * @property {string} type
 * @property {boolean} interest
 * @property {boolean} exhortation todo:??
 */

const proto = {
  /**
   * Get the index of the invoice
   * @returns {number}
   */
  get invoiceIndex(){
    return this.project.invoices.indexOf(this)
  }
}

/**
 * Create an invoice
 * @param {object} invoice
 * @param {project} project
 * @returns {invoice}
 */
export function create(invoice,project){
  // create non-enumerable properties
  Object.defineProperty(invoice,'project',{ value: project,enumerable: false })
  //
  return Object.setPrototypeOf(invoice,proto)
}
