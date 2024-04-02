function formatPrice(price: number): string {
  const formattedPrice = price.toLocaleString('es-DO', {
    style: 'currency',
    currency: 'DOP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedPrice;
}

export default formatPrice;
