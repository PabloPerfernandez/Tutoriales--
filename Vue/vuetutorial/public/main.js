const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      cart: 0,
      product: 'Zapatillas',
      brand: "Vue Mastery",
      selectedVariant: 0,
      components: ["50% algodón", "30% lana", "20% poliéster"],
      variants: [
        { id: 2234, color: "red", image: "Zapatillas.png", quantity: 12 },
        { id: 2235, color: "blue", image: "ZapatillasAzul.png", quantity: 0 },
        { id: 2236, color: "olivedrab", image: "ZapatillasVerde.png", quantity: 6 },
      ],
    };
  },
  computed: {
    enStock() {
      return this.variants[this.selectedVariant].quantity > 0;
    },
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inventory() {
      return this.variants[this.selectedVariant].quantity;
    }
  },
  methods: {
    addToCart() {
      if (this.enStock) {
        this.cart += 1;
        this.variants[this.selectedVariant].quantity -= 1;
      }
    },
    removeFromCart() {
      if (this.cart > 0) {
        this.cart -= 1;
        this.variants[this.selectedVariant].quantity += 1;
      }
    },
    updateVariant(index) {
      this.selectedVariant = index;
    }
  }
});

app.mount('#app');