export const parseError = (err:any): string => {
    const data = err?.response?.data
    if (!data) return 'Error inesperado'
  
    if (Array.isArray(data.error)) return data.error.join(', ')
    if (typeof data.error === 'string') return data.error
    return 'Error desconocido'
  }
  