function formatDate(date: string) {
  const dateObj = new Date(date);

  // 数秒前なら N 秒前
  const diffTime = new Date().getTime() - dateObj.getTime();
  const diffSeconds = Math.floor(diffTime / 1000);
  if (diffSeconds < 60) {
    return `${diffSeconds}秒前`;
  }

  // 数分前なら N 分前
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  if (diffMinutes < 60) {
    return `${diffMinutes}分前`;
  }

  // 数時間前なら N 時間前
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  if (diffHours < 24) {
    return `${diffHours}時間前`;
  }

  // 1週間以内なら N 日前
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays < 7) {
    return `${diffDays}日前`;
  }

  // 1週間以上なら N 週間前
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 4) {
    return `${diffWeeks}週間前`;
  }

  // 1ヶ月以内なら N ヶ月前
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    return `${diffMonths}ヶ月前`;
  }

  // 1年以内なら N 年前
  const diffYears = Math.floor(diffMonths / 12);
  if (diffYears < 100) {
    return `${diffYears}年前`;
  }

  return dateObj.toLocaleDateString();
}

export { formatDate };
