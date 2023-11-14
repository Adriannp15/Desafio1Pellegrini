class ProductManager {
    constructor() {
      this.products = [];
    }
  
    generateId() {
      return '_' + Math.random().toString(36).substr(2, 9);
    }
  
    getProducts() {
      return this.products;
    }
  
    isCodeUnique(code) {
      return !this.products.some(product => product.code === code);
    }
  
    addProduct({ title, description, price, thumbnail, code, stock }) {
      // Verificar si el código ya está en uso
      if (!this.isCodeUnique(code)) {
        throw new Error('El código del producto ya está en uso.');
      }
  
      const newProduct = {
        id: this.generateId(),
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      };
  
      this.products.push(newProduct);
      return newProduct;
    }
  
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
  
      if (!product) {
        throw new Error('Producto no encontrado');
      }
  
      return product;
    }
  }
  
  // Crear una instancia de ProductManager
  const productManager = new ProductManager();
  
  // Obtener productos (debería devolver [])
  console.log(productManager.getProducts());
  
  // Agregar un producto
  const newProduct = productManager.addProduct({
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25
  });
  console.log('Producto agregado:', newProduct);
  
  // Obtener productos nuevamente (debería devolver el producto recién agregado)
  console.log(productManager.getProducts());
  
  // Intentar agregar un producto con el mismo código (debería arrojar un error)
  try {
    productManager.addProduct({
      title: 'producto repetido',
      description: 'Este es un producto repetido',
      price: 150,
      thumbnail: 'Otra imagen',
      code: 'abc123',  // Código repetido
      stock: 30
    });
  } catch (error) {
    console.error('Error al agregar producto repetido:', error.message);
  }
  
  // Obtener un producto por ID (debería devolver el producto recién agregado)
  const foundProduct = productManager.getProductById(newProduct.id);
  console.log('Producto encontrado por ID:', foundProduct);
  
  // Intentar obtener un producto con un ID no existente (debería arrojar un error)
  try {
    productManager.getProductById('nonexistentid');
  } catch (error) {
    console.error('Error al obtener producto por ID no existente:', error.message);
  }
  