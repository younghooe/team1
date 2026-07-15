<script setup>
import { ref } from 'vue'

const emit = defineEmits(['select-district'])

const hovered = ref(null)
const selected = ref(null)

// 각 객체에 name: 자치구명, path: SVG path 문자열, label: {x,y}는 라벨 위치(옵션)
const districts = [
  { name: '도봉구', path: 'M230 80 L270 70 L290 95 L270 115 L235 110 Z', label: { x: 260, y: 92 } },
  { name: '노원구', path: 'M285 95 L330 90 L345 140 L305 150 L277 125 Z', label: { x: 310, y: 120 } },
  { name: '강북구', path: 'M320 120 L360 110 L375 150 L345 170 L315 150 Z', label: { x: 345, y: 140 } },
  { name: '성북구', path: 'M340 165 L370 155 L390 185 L360 205 L330 190 Z', label: { x: 360, y: 180 } },
  { name: '은평구', path: 'M200 150 L235 140 L260 170 L225 190 L190 180 Z', label: { x: 225, y: 165 } },
  { name: '마포구', path: 'M210 220 L250 210 L275 240 L245 260 L210 250 Z', label: { x: 240, y: 235 } },
  { name: '서대문구', path: 'M270 210 L305 200 L328 225 L300 245 L270 235 Z', label: { x: 295, y: 222 } },
  { name: '종로구', path: 'M300 232 L335 218 L358 242 L332 263 L305 250 Z', label: { x: 330, y: 240 } },
  { name: '중구', path: 'M305 265 L335 255 L355 278 L330 295 L300 285 Z', label: { x: 328, y: 276 } },
  { name: '성동구', path: 'M350 250 L380 238 L400 268 L375 288 L345 275 Z', label: { x: 370, y: 265 } },
  { name: '동대문구', path: 'M360 200 L395 188 L420 215 L392 235 L360 225 Z', label: { x: 388, y: 210 } },
  { name: '중랑구', path: 'M395 200 L430 190 L455 220 L425 245 L395 230 Z', label: { x: 425, y: 215 } },
  { name: '광진구', path: 'M410 250 L445 240 L470 270 L440 292 L405 280 Z', label: { x: 438, y: 267 } },
  { name: '강동구', path: 'M460 290 L495 280 L525 315 L490 340 L455 328 Z', label: { x: 485, y: 310 } },
  { name: '강서구', path: 'M70 260 L120 245 L160 270 L130 305 L85 295 Z', label: { x: 125, y: 275 } },
  { name: '양천구', path: 'M115 290 L150 280 L175 310 L145 330 L110 318 Z', label: { x: 145, y: 305 } },
  { name: '구로구', path: 'M150 330 L190 320 L215 345 L185 360 L150 350 Z', label: { x: 188, y: 340 } },
  { name: '금천구', path: 'M205 340 L235 330 L250 355 L225 365 L200 355 Z', label: { x: 230, y: 350 } },
  { name: '영등포구', path: 'M200 300 L235 290 L255 315 L225 335 L195 322 Z', label: { x: 230, y: 312 } },
  { name: '동작구', path: 'M260 340 L298 330 L322 358 L290 378 L255 370 Z', label: { x: 290, y: 350 } },
  { name: '관악구', path: 'M275 380 L315 370 L340 398 L310 418 L272 405 Z', label: { x: 305, y: 390 } },
  { name: '서초구', path: 'M330 335 L370 324 L395 350 L368 372 L330 360 Z', label: { x: 360, y: 350 } },
  { name: '강남구', path: 'M385 340 L425 330 L455 355 L430 378 L395 365 Z', label: { x: 420, y: 355 } },
  { name: '송파구', path: 'M435 320 L475 308 L505 336 L480 360 L445 347 Z', label: { x: 470, y: 338 } }
]

// hover/focus handlers
function onHover(name) {
  hovered.value = name
}
function onLeave() {
  hovered.value = null
}
function onSelect(d) {
  selected.value = d.name
  emit('select-district', d.name)
}
function onKeydown(e, d) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    onSelect(d)
  }
}
</script>

<template>
  <section class="map-card" aria-labelledby="map-title">
    <div class="map-header">
      <h2 id="map-title">서울 도식형 자치구 지도</h2>
      <p>각 구에 마우스를 올리면 이름이 표시되고, 클릭하면 선택됩니다.</p>
    </div>

    <svg viewBox="0 0 560 480" class="seoul-map" role="img" aria-label="서울 도식형 자치구 지도">
      <rect x="0" y="0" width="560" height="480" rx="20" fill="#fffefb" />

      <!-- 한강: 지도 위에 표시. (한강을 먼저 그려서 뒤에 위치하게 함) -->
      <path
        d="M30 260 C120 220, 220 220, 300 245 C380 270, 460 260, 530 290 L530 308 C465 278, 385 288, 305 260 C225 232, 125 238, 30 278 Z"
        class="han-river"
        aria-hidden="true"
      />

      <g class="district-layer" aria-hidden="false">
        <path
          v-for="d in districts"
          :key="d.name"
          :d="d.path"
          class="district"
          :class="{ hovered: hovered === d.name, selected: selected === d.name }"
          :aria-label="d.name"
          tabindex="0"
          @mouseenter="onHover(d.name)"
          @mouseleave="onLeave"
          @focus="onHover(d.name)"
          @blur="onLeave"
          @click="onSelect(d)"
          @keydown="(e) => onKeydown(e, d)"
        />
        <g class="labels">
          <text
            v-for="d in districts"
            :key="d.name + '-label'"
            :x="d.label.x"
            :y="d.label.y"
            class="district-label"
            pointer-events="none"
          >
            {{ d.name }}
          </text>
        </g>
      </g>

    </svg>

    <div class="map-info">
      <p v-if="hovered" class="info-text">마우스 오버: {{ hovered }}</p>
      <p v-else-if="selected" class="info-text">선택된 구: {{ selected }}</p>
      <p v-else class="info-text">구역 위에 마우스를 올려보세요.</p>

      <p class="disclaimer">이 지도는 실제 행정경계와 다른 도식형 지도입니다.</p>
    </div>
  </section>
</template>

<style scoped>
.map-card {
  background: linear-gradient(180deg, #fffdf9, #fff8f2);
  border-radius: 20px;
  padding: 1.2rem;
  box-shadow: 0 12px 32px rgba(100, 70, 50, 0.08);
}
.map-header h2 {
  margin: 0 0 0.25rem;
  color: #6e4a33;
}
.map-header p { margin: 0 0 0.8rem; color: #7b6a5b; font-size: 0.95rem; }

.seoul-map {
  width: 100%;
  max-width: 760px;
  height: auto;
  display: block;
  margin: 0 auto 0.8rem;
}

/* 구역 스타일 */
.district {
  fill: #fdeee0;
  stroke: #ffffff;
  stroke-width: 2;
  cursor: pointer;
  transition: fill 180ms ease, transform 180ms ease;
  transform-box: fill-box;
  transform-origin: center;
}
.district.hovered {
  fill: #f7cbb7;
  transform: scale(1.02);
  filter: drop-shadow(0 4px 10px rgba(160, 110, 80, 0.09));
}
.district.selected {
  fill: #eaa379;
  stroke: #fff8f1;
  stroke-width: 2.5;
  transform: scale(1.03);
  filter: drop-shadow(0 6px 18px rgba(170, 100, 60, 0.18));
}

/* label */
.district-label {
  font-size: 11px;
  font-weight: 600;
  fill: #4e3b2b;
  text-anchor: middle;
  dominant-baseline: middle;
  pointer-events: none;
}

/* 한강 */
.han-river {
  fill: #bfe6ff;
  opacity: 0.95;
  pointer-events: none;
  filter: drop-shadow(0 6px 10px rgba(70, 140, 200, 0.08));
}

/* info + disclaimer */
.map-info {
  text-align: center;
  margin-top: 8px;
}
.info-text {
  margin: 0;
  color: #5f4a3a;
  font-weight: 600;
}
.disclaimer {
  margin-top: 8px;
  color: #8a7a6a;
  font-size: 0.9rem;
}
</style>