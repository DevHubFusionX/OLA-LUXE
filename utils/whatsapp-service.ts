import { CartItem } from '@/context/CartContext';
import { DeliveryZone } from '@/lib/schemas';

interface OrderDetails {
  name: string;
  address: string;
  phone: string;
  notes?: string;
  deliveryZone: DeliveryZone;
}

export const sendWhatsAppOrder = (
  cart: any[],
  details: OrderDetails,
  totalPrice: number
) => {
  const WHATSAPP_NUMBER = '2349120491702'; // Business WhatsApp Number
  
  let message = `*✨ NEW ORDER - OLALUXE.NG ✨*\n`;
  message += `──────────────────\n\n`;
  
  message += `*👤 CUSTOMER INFO*\n`;
  message += `*Name:* ${details.name}\n`;
  message += `*Phone:* ${details.phone}\n`;
  message += `*Address:* ${details.address}\n`;
  message += `*Location:* ${details.deliveryZone.name}\n`;
  if (details.notes) message += `*Notes:* ${details.notes}\n`;
  
  message += `\n*🛍️ ORDERED ITEMS*\n`;
  cart.forEach((item, index) => {
    message += `${index + 1}. *${item.name}*\n`;
    if (item.selectedVariation) message += `   _Variation: ${item.selectedVariation}_\n`;
    message += `   Qty: ${item.quantity} x ₦${item.price.toLocaleString()}\n`;
    message += `   Link: ${window.location.origin}/product/${item.id}\n\n`;
  });
  
  const grandTotal = totalPrice + details.deliveryZone.fee;
  
  message += `*💰 PRICE SUMMARY*\n`;
  message += `Subtotal: ₦${totalPrice.toLocaleString()}\n`;
  message += `Delivery Fee: ₦${details.deliveryZone.fee.toLocaleString()}\n`;
  message += `*Grand Total: ₦${grandTotal.toLocaleString()}*\n\n`;
  
  message += `──────────────────\n`;
  message += `Please confirm availability and share payment details. Thank you!`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  
  window.open(whatsappUrl, '_blank');
};

export const sendSingleProductWhatsAppOrder = (
  product: any,
  selectedVariation?: string
) => {
  const WHATSAPP_NUMBER = '2349120491702'; // Replace with actual number
  
  let message = `*INQUIRY - OLALUXE.NG*\n\n`;
  message += `Hello! I'm interested in ordering this item:\n\n`;
  message += `*Product:* ${product.name}\n`;
  if (selectedVariation) message += `*Variation:* ${selectedVariation}\n`;
  message += `*Price:* ₦${product.price.toLocaleString()}\n`;
  message += `*Link:* ${window.location.origin}/product/${product.id}\n\n`;
  message += `Please confirm availability. Thank you!`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  
  window.open(whatsappUrl, '_blank');
};
