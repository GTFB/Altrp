const addCurrencyToLabel = currency => data => {
  const {value, formattedValue} = data
  if (Number.isFinite(data)) {
    return data
  }

  if (formattedValue) {
    if (formattedValue[0] == '+' || formattedValue[0] == '-') {
      return formattedValue[0] + currency + formattedValue.slice(1)
    }

    return currency + formattedValue
  }

  return currency + value
}

export default addCurrencyToLabel