export function scrollToSection(elementId) {
  document.getElementById(elementId)?.scrollIntoView({ behavior: "smooth" });
}

export function generateWaitlistPosition(min = 438, max = 738) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function shareOrCopy(shareData) {
  if (navigator.share) {
    try { await navigator.share(shareData); } catch { /* cancelled */ }
  } else if (navigator.clipboard) {
    await navigator.clipboard.writeText(shareData.url || window.location.href);
  }
}
