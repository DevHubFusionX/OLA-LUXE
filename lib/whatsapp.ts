import { Product } from './schemas';

/**
 * Generates a WhatsApp link with a pre-filled message based on the cart items.
 */
export function generateWhatsAppLink(items: { product: Product; quantity: number; selectedVariation?: Record<string, string> }[]) {
  const WHATSAPP_NUMBER = '2349120491702'; // Business WhatsApp Number
  
  if (items.length === 0) return '';

  let message = `Hello Olaluxe! 🌟 I'd like to place an order:\n\n`;

  let total = 0;
  items.forEach((item, index) => {
    const itemTotal = item.product.price * item.quantity;
    total += itemTotal;

    message += `${index + 1}. *${item.product.name}*\n`;
    if (item.selectedVariation) {
      const vars = Object.entries(item.selectedVariation)
        .map(([type, opt]) => `${type}: ${opt}`)
        .join(', ');
      message += `   _(${vars})_\n`;
    }
    message += `   Qty: ${item.quantity} x ₦${item.product.price.toLocaleString()}\n`;
    message += `   Subtotal: *₦${itemTotal.toLocaleString()}*\n\n`;
  });

  message += `──────────────────\n`;
  message += `*Grand Total: ₦${total.toLocaleString()}*\n\n`;
  message += `Please confirm my order and share payment details. Thank you!`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

/**
 * Generates a WhatsApp link for a single product (Direct Order).
 */
export function generateSingleProductWALink(product: Product, selectedVariation?: Record<string, string>) {
  const WHATSAPP_NUMBER = '2349120491702'; // Business WhatsApp Number
  
  let message = `Hello Olaluxe! 🌟 I'm interested in ordering:\n\n`;
  message += `*${product.name}*\n`;
  
  if (selectedVariation) {
    const vars = Object.entries(selectedVariation)
      .map(([type, opt]) => `${type}: ${opt}`)
      .join(', ');
    message += `_(${vars})_\n`;
  }
  
  message += `Price: *₦${product.price.toLocaleString()}*\n\n`;
  message += `Link: ${window.location.origin}/product/${product.id}\n\n`;
  message += `Please confirm availability. Thank you!`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}
