// 챗봇 UI와 향후 API 연동을 분리하기 위한 서비스 구조입니다.
export const getChatReply = async (message) => {
  const lower = message.toLowerCase()

  if (lower.includes('맛집') || lower.includes('food')) {
    return '서울에서는 강남의 맛집 거리나 홍대의 감성 맛집을 추천해 드릴게요.'
  }

  if (lower.includes('데이트') || lower.includes('date')) {
    return '한강 산책, 북촌 산책, 경복궁 주변 데이트 코스를 추천해 드릴 수 있어요.'
  }

  if (lower.includes('축제')) {
    return '서울의 계절 축제와 야간 이벤트를 확인해 보세요.'
  }

  return '서울 관광지, 데이트 코스, 축제 정보에 대해 물어보세요.'
}
