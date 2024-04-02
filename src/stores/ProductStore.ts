import { create } from 'zustand';
import db from '../services/db';

const PRODUCT_REF = 'products';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  status_id: number;
  seller_id: string;
}

interface ProductStore {
  products: Product[];
  userProducts: Product[];
  addProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateProduct: (
    id: string,
    updatedProduct: Partial<Product>,
  ) => Promise<void>;
  fetchProducts: () => Promise<void>;
  fetchProductsByUid: (uid: string) => Promise<void>;
  fetchProductsByIds: (ids: string[]) => Promise<Product[]>;
}

const useProductStore = create<ProductStore>(set => ({
  products: [],
  userProducts: [],
  addProduct: async product => {
    try {
      const docRef = await db.collection(PRODUCT_REF).add(product);
      set(state => ({
        products: [...state.products, { id: docRef.id, ...product }],
      }));
    } catch (error) {
      console.error(error);
    }
  },
  deleteProduct: async id => {
    try {
      // 0 is for deleted elements
      await db.collection(PRODUCT_REF).doc(id).update({ status_id: 0 });
      set(state => ({
        products: state.products.filter(product => product.id !== id),
      }));
    } catch (error) {
      console.error(error);
    }
  },
  updateProduct: async (id, updatedProduct) => {
    try {
      await db.collection(PRODUCT_REF).doc(id).update(updatedProduct);
      set(state => ({
        products: state.products.map(product =>
          product.id === id ? { ...product, ...updatedProduct } : product,
        ),
      }));
    } catch (error) {
      console.error(error);
    }
  },
  fetchProducts: async () => {
    try {
      const data = await db
        .collection(PRODUCT_REF)
        .where('status_id', '==', 1)
        .get();
      const products = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      set(state => ({ products }));
    } catch (error) {
      console.error(error);
    }
  },
  fetchProductsByUid: async (uid: string) => {
    try {
      const data = await db
        .collection(PRODUCT_REF)
        .where('seller_id', '==', uid)
        // 1 is for active products
        .where('status_id', '==', 1)
        .get();
      const products = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Result', products);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      set(state => ({ userProducts: products }));
    } catch (error) {
      console.error(error);
    }
  },
  fetchProductsByIds: async (ids: string[]) => {
    try {
      const data = await db
        .collection(PRODUCT_REF)
        .where('status_id', '==', 1)
        .where('__name__', 'in', ids)
        .get();
      const products = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Result', products);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // set(state => ({ userProducts: products }));
      return products as Product[];
    } catch (error) {
      console.error(error);
      return [];
    }
  },
}));

export default useProductStore;
