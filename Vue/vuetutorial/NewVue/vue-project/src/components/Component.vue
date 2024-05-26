<script>
    export default {
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
    }
</script>
<template>
    <div class="nav-bar"></div>
  
  <div class="cart">Carrito({{ cart }})</div>

  <div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img v-bind:src="image" alt="Product Image">
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inventory > 10">En Stock</p>
        <p v-else-if="inventory <= 10 && inventory > 0">Quedan pocas unidades</p>
        <p v-else>Fuera de Stock</p>

        <ul>
          <li v-for="alias in components" :key="alias">{{ alias }}</li>
        </ul>
        
        <div
         v-for="(variant, index) in variants"
         :key="variant.id"
         @mouseover="updateVariant(index)"
         class="color-circle"
         :style="{ backgroundColor: variant.color }">
        </div>

        <button
          class="button"
          :class="{ disabledButton: !enStock }"
          :disabled="!enStock"
          v-on:click="addToCart">
          Añadir al carrito
        </button>

        <button
          class="buttonRemove"
          :class="{ disabledButton: !cart }"
          :disabled="!cart"
          v-on:click="removeFromCart">
          Eliminar del carrito
        </button>
      </div>
    </div>
  </div>
</template>
<style>
    .color-circle {
    width: 50px;
    height: 50px;
    margin-top: 8px;
    border: 2px solid #d8d8d8;
    border-radius: 50%;
    }
    .disabledButton {
        background-color:#d8d8d8;
        cursor: not-allowed;
    }
</style>