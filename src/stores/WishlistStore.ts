import { create } from 'zustand';
import { setDoc, deleteDoc } from 'firebase/firestore';
import db from '../services/db';

export interface WishlistStore {
  products: string[];
  addProductToWishlist: (userId: string, productId: string) => Promise<void>;
  removeProductFromWishlist: (
    userId: string,
    productId: string,
  ) => Promise<void>;
  getWishlistProducts: (userId: string) => Promise<string[]>;
  clearWishlist: (userId: string) => Promise<void>;
  isProductInWishlist: (productId: string) => boolean;
  initializeWishlist: (userId: string) => Promise<void>;
}

const useWishlistStore = create<WishlistStore>(set => ({
  products: [],
  addProductToWishlist: async (userId: string, productId: string) => {
    const wishlistRef = db.collection('wishlist');
    const userWishlistRef = wishlistRef.doc(userId);
    const userWishlist = await userWishlistRef.get();

    if (!userWishlist.exists) {
      await setDoc(userWishlistRef, { products: [productId] });
      set(state => ({ products: [productId] }));
    } else {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const updatedProducts = [...userWishlist.data()?.products, productId];
      await setDoc(userWishlistRef, { products: updatedProducts });
      set(state => ({ products: updatedProducts }));
    }
  },
  removeProductFromWishlist: async (userId, productId) => {
    const wishlistRef = db.collection('wishlist').doc(userId);
    try {
      await setDoc(wishlistRef, {
        products: [
          ...new Set(
            (await wishlistRef.get())
              .data()
              ?.products.filter(p => p !== productId),
          ),
        ],
      });
      set(state => ({ products: state.products.filter(p => p !== productId) }));
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
    }
  },
  getWishlistProducts: async userId => {
    const wishlistRef = db.collection('wishlist').doc(userId);
    try {
      const docSnapshot = await wishlistRef.get();
      if (docSnapshot.exists) {
        const products = docSnapshot.data()?.products ?? [];
        set(state => ({ products }));
        console.log('get products', products);
        return products;
      }
      return [];
    } catch (error) {
      console.error('Error getting wishlist products:', error);
      return [];
    }
  },
  clearWishlist: async userId => {
    const wishlistRef = db.collection('wishlist').doc(userId);
    try {
      await deleteDoc(wishlistRef);
      set({ products: [] });
    } catch (error) {
      console.error('Error clearing wishlist:', error);
    }
  },
  isProductInWishlist: productId => {
    return useWishlistStore.getState().products.includes(productId);
  },
  initializeWishlist: async userId => {
    const wishlistRef = db.collection('wishlist').doc(userId);
    try {
      const docSnapshot = await wishlistRef.get();
      if (docSnapshot.exists) {
        const products = docSnapshot.data()?.products ?? [];
        set(state => ({ products }));
      }
    } catch (error) {
      console.error('Error initializing wishlist:', error);
    }
  },
}));

export default useWishlistStore;
