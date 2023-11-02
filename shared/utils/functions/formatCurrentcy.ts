
// Sử dụng hàm
// const amount = 1000;
// const country = 'USD';
// const formattedCurrency = formatCurrency(amount, country);
export function formatCurrency(amount: number, country: string): string {
  try {
    const formatter = new Intl.NumberFormat(country, {
      style: 'currency',
      currency: country,
    });

    return formatter.format(amount);
  } catch (error) {
    console.error(`Error formatting currency for country '${country}': ${error}`);
    return '';
  }
}

/* 
@example locale : 'vi','en'
*/
export function formatNumber(amount: number, locale: string | undefined) {
  return Intl.NumberFormat(locale).format(amount)
}


