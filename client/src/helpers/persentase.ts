export const persentase = (value: number, total: number) => {
    const persentase = Math.round((value / total) * 100)
    return persentase
}