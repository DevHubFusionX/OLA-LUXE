'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/lib/schemas';
import { toast } from 'react-hot-toast';

export interface CartItem extends Product {
    quantity: number;
    selectedVariation?: string;
    selectedImage?: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, variation?: string, selectedImage?: string, quantity?: number) => void;
    removeFromCart: (productId: string, variation?: string) => void;
    removeItem: (productId: string, variation?: string) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage on change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product, variation?: string, selectedImage?: string, quantity: number = 1) => {
        const existingItem = cart.find(
            (item) => item.id === product.id && item.selectedVariation === variation
        );

        if (existingItem) {
            toast.success(`Updated ${product.name} quantity`);
        } else {
            toast.success(`Added ${product.name} to cart`);
        }

        setCart((prevCart) => {
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id && item.selectedVariation === variation
                        ? { ...item, quantity: item.quantity + quantity, selectedImage: selectedImage || item.selectedImage }
                        : item
                );
            }

            return [...prevCart, { ...product, quantity, selectedVariation: variation, selectedImage: selectedImage || product.images[0] }];
        });
    };

    const removeFromCart = (productId: string, variation?: string) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(
                (item) => item.id === productId && item.selectedVariation === variation
            );

            if (existingItem && existingItem.quantity > 1) {
                return prevCart.map((item) =>
                    item.id === productId && item.selectedVariation === variation
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            }

            return prevCart.filter(
                (item) => !(item.id === productId && item.selectedVariation === variation)
            );
        });
    };

    const removeItem = (productId: string, variation?: string) => {
        const item = cart.find(i => i.id === productId && i.selectedVariation === variation);
        if (item) toast.error(`Removed ${item.name} from cart`);

        setCart((prevCart) =>
            prevCart.filter(
                (item) => !(item.id === productId && item.selectedVariation === variation)
            )
        );
    };

    const clearCart = () => setCart([]);

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, removeItem, clearCart, totalItems, totalPrice }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
