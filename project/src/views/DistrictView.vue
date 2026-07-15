<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const districtName = ref(route.params.name || '')

watchEffect(() => {
  districtName.value = route.params.name || ''
})

const isLoading = ref(false)
const errorMessage = ref('')
const attractions = ref([]) // filtered list to display

function extractDistrict(address) {
  if (!address) return ''
  const match = address.match(/서울특별시\s+([가-힣]+구)/)
  return match ? match[1] : ''
}

async function loadAttractions() {
  isLoading.value = true
  errorMessage.value = ''
  attractions.value = []
  try {
    const res = await fetch('/data/seoul_attractions.json')
    if (!res.ok) throw new Error(`데이터를 불러오지 못했습니다. 상태: ${res.status}`)
    const data = await res.json()
    if (!data || !Array.isArray(data.items)) {
      throw new Error('데이터 형식이 올바르지 않습니다.')
    }

    const items = data.items

    const filtered = items.filter(item => {
      const addr = item.addr1 || ''
      const district = extractDistrict(addr)
      return district === districtName.value
    }).map(item => {
      const image = item.firstimage && item.firstimage.trim() ? item.firstimage
                  : item.firstimage2 && item.firstimage2.trim() ? item.firstimage2
                  : ''
      return {
        contentid: item.contentid,
        title: item.title || '이름 없음',
        addr1: item.addr1 || '',
        addr2: item.addr2 || '',
        image
      }
    })

    attractions.value = filtered
  } catch (err) {
    console.error(err)
    errorMessage.value = err.message || '알 수 없는 오류가 발생했습니다.'
  } finally {
    isLoading.value = false
  }
}

// load when component mounts and when districtName changes
watchEffect(() => {
  if (districtName.value) loadAttractions()
})
</script>

<template>
  <section class="district-page">
    <div class="top-row">
      <router-link to="/" class="back-btn">← 서울 전체 지도로 돌아가기</router-link>
      <div class="title-block">
        <h1>{{ districtName }} 관광지</h1>
        <p v-if="!isLoading && !errorMessage">{{ attractions.length }}개의 관광지가 있습니다.</p>
      </div>
    </div>

    <div v-if="isLoading" class="status">로딩 중입니다...</div>
    <div v-else-if="errorMessage" class="status error">{{ errorMessage }}</div>
    <div v-else>
      <div v-if="attractions.length === 0" class="status">해당 자치구에 등록된 관광지가 없습니다.</div>

      <div v-else class="grid">
        <article v-for="a in attractions" :key="a.contentid" class="card">
          <div class="media">
            <img v-if="a.image" :src="a.image" :alt="`${a.title} 이미지`" />
            <div v-else class="no-image">등록된 이미지가 없습니다.</div>
          </div>
          <div class="body">
            <h3 class="title">{{ a.title }}</h3>
            <p class="addr">{{ a.addr1 || '주소 정보가 없습니다.' }}</p>
            <p v-if="a.addr2" class="addr2">{{ a.addr2 }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.district-page { padding: 1rem; max-width: 1100px; margin: 0 auto; }
.top-row { display:flex; align-items:center; gap:1rem; margin-bottom:1rem; flex-wrap:wrap; }
.back-btn { text-decoration:none; color:#2f4b5b; font-weight:700; }
.title-block h1 { margin:0; color:#234b6a; }
.title-block p { margin:6px 0 0; color:#6b7f8f; }

.status { padding:1rem; background:#fffdf7; border-radius:10px; color:#6b7f8f; }
.status.error { background:#fff1f0; color:#a33; }

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}
.card { background:#fff; border-radius:12px; overflow:hidden; border:1px solid #f0f6fb; display:flex; flex-direction:column; }
.media { background:#f8fafc; min-height:160px; display:flex; align-items:center; justify-content:center; }
.media img { width:100%; height:180px; object-fit:cover; display:block; }
.no-image { padding:1rem; color:#6b7f8f; font-weight:600; }

.body { padding:0.9rem; }
.title { margin:0 0 0.5rem; color:#7b4f2f; font-size:1.05rem; }
.addr, .addr2 { margin:0; color:#6f5a4d; font-size:0.95rem; word-break:keep-all; white-space:normal; }

@media (max-width: 768px) {
  .grid { grid-template-columns: 1fr; }
  .media img { height:200px; }
}
</style>