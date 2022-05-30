export default interface Order {
  id?: number;
  userId?: number;
  productsIds?: number[];
  status?: number;
  message?: string;
}