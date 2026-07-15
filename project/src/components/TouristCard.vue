<script setup>
defineProps({
  attraction: Object,
})
</script>

<template>
  <article class="card">
    <img :src="attraction.image" :alt="attraction.name" />
    <div class="card-body">
      <h3>{{ attraction.name }}</h3>
      <p>{{ attraction.description }}</p>
    </div>
  </article>
</template>

<style scoped>
.card {
  background: #fffaf5;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 24px rgba(143, 105, 72, 0.12);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 30px rgba(143, 105, 72, 0.2);
}
.card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}
.card-body {
  padding: 1rem;
}
.card-body h3 {
  margin: 0 0 0.4rem;
  color: #7b4f2f;
}
.card-body p {
  color: #6f5a4d;
  font-size: 0.95rem;
  line-height: 1.5;
}
</style>
