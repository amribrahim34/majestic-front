<!-- CartSummary.vue -->
<template>
  <div class="cart-summary">
    <div class="summary-row">
      <span>Subtotal:</span>
      <span>${{ subtotal.toFixed(2) }}</span>
    </div>
    <div class="summary-row">
      <span>Shipping:</span>
      <span>${{ shipping.toFixed(2) }}</span>
    </div>
    <div class="summary-row total">
      <span>Total:</span>
      <span>${{ total.toFixed(2) }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps(['subtotal', 'shipping', 'total'])
</script>

<style scoped>
.cart-summary {
  margin-top: 20px;
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.total {
  font-weight: bold;
  font-size: 1.2em;
}
</style>
