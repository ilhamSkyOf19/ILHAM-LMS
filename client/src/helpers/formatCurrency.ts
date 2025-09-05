export const formatCurrency = (value: number): string => {

    const formattedValue = value.toLocaleString('id-ID',
        {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }
    )

    return formattedValue
}