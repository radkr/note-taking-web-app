const Product = {
  find: jest.fn(() => Promise.resolve([])),
  findById: jest.fn(() => Promise.resolve([])),
};

export default Product;
