<script setup>
<<<<<<< HEAD
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SeoulMap from '../components/SeoulMap.vue'
import BoardList from '../components/BoardList.vue'
import FloatingChatButton from '../components/FloatingChatButton.vue'

const router = useRouter()
const selectedDistrict = ref(null)

function onSelectDistrict(name) {
  selectedDistrict.value = name
  // name은 컴포넌트에서 보내는 한글 자치구명(예: '송파구')으로 가정
  router.push({ name: 'district', params: { name } })
}
=======
import SeoulMap from '../components/SeoulMap.vue'
import BoardList from '../components/BoardList.vue'
import FloatingChatButton from '../components/FloatingChatButton.vue'
>>>>>>> origin/joo
</script>

<template>
  <main class="home-page">
    <header class="hero">
      <div class="hero-text">
        <p class="eyebrow">서울 데이트 코스 추천</p>
        <h1>따뜻한 감성으로 채우는 서울 여행</h1>
        <p class="subtitle">감성 있는 카페, 풍경, 전통 명소까지 한눈에 만나보세요.</p>
      </div>
    </header>

<<<<<<< HEAD
    <SeoulMap @select-district="onSelectDistrict" />

    <div v-if="selectedDistrict" class="selected-bubble">
      선택된 자치구: {{ selectedDistrict }}
    </div>

=======
    <SeoulMap />
>>>>>>> origin/joo
    <BoardList />
    <FloatingChatButton />
  </main>
</template>

<style scoped>
<<<<<<< HEAD
.home-page { display: grid; gap: 1.3rem; }
.hero { background: linear-gradient(135deg, #fff6eb, #f7dfcf); border-radius: 28px; padding: 2rem; box-shadow: 0 15px 40px rgba(160,112,72,0.14); }
.hero-text h1 { margin: 0.3rem 0 0.7rem; font-size: clamp(1.8rem,3vw,2.6rem); color:#7b4f2f; }
.selected-bubble { max-width: 760px; margin: 0.6rem auto; padding: 0.6rem 1rem; background: #fff8f2; border-radius: 12px; color: #6e4a33; font-weight: 600; text-align: center; box-shadow: 0 8px 20px rgba(110,80,50,0.06); }
</style>
=======
.home-page {
  display: grid;
  gap: 1.3rem;
}
.hero {
  background: linear-gradient(135deg, #fff6eb, #f7dfcf);
  border-radius: 28px;
  padding: 2rem;
  box-shadow: 0 15px 40px rgba(160, 112, 72, 0.14);
}
.hero-text h1 { margin: 0.3rem 0 0.7rem; font-size: clamp(1.8rem, 3vw, 2.6rem); color: #7b4f2f; }
.eyebrow { letter-spacing: 0.2rem; text-transform: uppercase; color: #a36a43; font-weight: 700; }
.subtitle { color: #755b49; font-size: 1rem; }
</style>
>>>>>>> origin/joo
