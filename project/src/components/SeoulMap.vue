<script setup>
import { useRouter } from 'vue-router'
import districts from '../data/districts.json'

const router = useRouter()

const goToDistrict = (district) => {
  router.push(`/district/${district.path}`)
}
</script>

<template>
  <section class="map-card">
    <div class="map-header">
      <h2>서울 데이트 코스 지도</h2>
      <p>원하는 자치구를 눌러 감성 있는 관광지를 둘러보세요.</p>
    </div>

    <svg viewBox="0 0 560 480" class="seoul-map" role="img" aria-label="서울 지도">
      <rect x="0" y="0" width="560" height="480" rx="24" fill="#fdf6ee" />
      <g>
        <path
          v-for="district in districts"
          :key="district.name"
          :d="district.name === '강남구' ? 'M430 280 L470 270 L500 300 L490 340 L450 350 L425 315 Z' : district.name === '강동구' ? 'M490 320 L520 320 L530 360 L500 385 L475 345 Z' : district.name === '강북구' ? 'M305 150 L350 140 L360 190 L330 220 L292 210 Z' : district.name === '강서구' ? 'M120 250 L175 235 L210 260 L170 305 L120 295 Z' : district.name === '관악구' ? 'M280 370 L315 360 L340 390 L310 410 L270 400 Z' : district.name === '광진구' ? 'M395 275 L420 268 L440 292 L430 320 L390 315 Z' : district.name === '구로구' ? 'M170 330 L208 320 L232 342 L205 360 L160 350 Z' : district.name === '금천구' ? 'M215 330 L245 320 L255 345 L230 355 Z' : district.name === '노원구' ? 'M300 170 L340 160 L355 220 L315 230 L285 205 Z' : district.name === '도봉구' ? 'M250 115 L285 105 L302 130 L276 150 L238 145 Z' : district.name === '동대문구' ? 'M350 220 L375 210 L397 235 L375 260 L340 250 Z' : district.name === '동작구' ? 'M270 350 L310 340 L332 365 L300 388 L255 375 Z' : district.name === '마포구' ? 'M245 260 L292 250 L315 280 L285 305 L240 295 Z' : district.name === '서대문구' ? 'M295 250 L330 240 L352 260 L325 285 L288 276 Z' : district.name === '서초구' ? 'M345 320 L385 310 L405 335 L378 355 L332 345 Z' : district.name === '성동구' ? 'M370 270 L400 262 L415 285 L392 305 L355 295 Z' : district.name === '성북구' ? 'M315 210 L352 200 L365 230 L340 245 L307 232 Z' : district.name === '송파구' ? 'M430 300 L470 288 L485 325 L455 348 L420 332 Z' : district.name === '양천구' ? 'M155 280 L195 270 L215 300 L180 320 L145 307 Z' : district.name === '영등포구' ? 'M205 300 L240 290 L255 320 L225 335 L192 321 Z' : district.name === '용산구' ? 'M300 290 L330 280 L345 305 L315 320 L288 308 Z' : district.name === '은평구' ? 'M255 220 L290 210 L305 240 L278 258 L238 248 Z' : district.name === '종로구' ? 'M320 220 L345 210 L362 235 L337 255 L310 245 Z' : district.name === '중구' ? 'M310 250 L335 240 L350 266 L326 280 L300 268 Z' : 'M390 230 L420 220 L438 245 L412 260 L380 250 Z'"
          :class="`district ${district.path}`"
          @click="goToDistrict(district)"
          @mouseenter="($event.currentTarget).classList.add('active')"
          @mouseleave="($event.currentTarget).classList.remove('active')"
        />
      </g>
    </svg>
  </section>
</template>

<style scoped>
.map-card {
  background: rgba(255,255,255,0.9);
  border-radius: 24px;
  padding: 1.3rem;
  box-shadow: 0 14px 40px rgba(120, 88, 61, 0.12);
}
.map-header {
  margin-bottom: 1rem;
}
.map-header h2 {
  margin: 0 0 0.3rem;
  color: #7b4f2f;
}
.map-header p {
  color: #7d6d5a;
}
.seoul-map {
  width: 100%;
  max-width: 640px;
  height: auto;
  display: block;
  margin: 0 auto;
}
.district {
  fill: #f3c7b1;
  stroke: #ffffff;
  stroke-width: 2;
  cursor: pointer;
  transition: all 0.25s ease;
}
.district:hover,
.district.active {
  fill: #d88c6b;
  transform: scale(1.01);
}
</style>
