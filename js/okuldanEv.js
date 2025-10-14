document.addEventListener("DOMContentLoaded", function () {
  //--------------------------------
  // 1. DİNAMİK TARİH BÖLÜMÜ
  //--------------------------------
  const dateElement = document.getElementById("current-date");
  if (dateElement) {
    const gunler = [
      "Pazar",
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
    ];
    const aylar = [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ];
    const simdiTarih = new Date();
    const gunAdi = gunler[simdiTarih.getDay()];
    const gunSayisi = simdiTarih.getDate();
    const ayAdi = aylar[simdiTarih.getMonth()];
    const yil = simdiTarih.getFullYear();
    dateElement.textContent = `${gunSayisi} ${ayAdi} ${yil}, ${gunAdi}`;
  }

  //--------------------------------
  // 2. DİJİTAL SAAT BÖLÜMÜ
  //--------------------------------
  const digitalClockElement = document.getElementById("digital-clock");

  function setDigitalClock() {
    if (!digitalClockElement) return;
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    digitalClockElement.textContent = `${hours}:${minutes}:${seconds}`;
  }

  // Saati her saniye güncelle
  setInterval(setDigitalClock, 1000);
  setDigitalClock(); // Sayfa açılır açılmaz saati ayarla

  //--------------------------------
  // 3. SEFER GERİ SAYIM BÖLÜMÜ
  //--------------------------------
  const departureItems = document.querySelectorAll(".departure-item");

  function updateDepartureTimes() {
    if (departureItems.length === 0) return;
    const now = new Date();

    departureItems.forEach((item) => {
      const waitingTimeElement = item.querySelector(".waiting-time");
      if (!item.dataset.times || !waitingTimeElement) return;

      const timeList = JSON.parse(item.dataset.times);
      let nextDepartureTime = null;

      for (const time of timeList) {
        const [hour, minute] = time.split(":");
        const departureDate = new Date();
        departureDate.setHours(hour, minute, 0, 0);

        if (departureDate > now) {
          nextDepartureTime = departureDate;
          break;
        }
      }

      if (nextDepartureTime) {
        const diff = nextDepartureTime - now;
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        let timeString = "Kalan: ";
        if (hours > 0) {
          timeString += `${hours} sa `;
        }
        timeString += `${String(minutes).padStart(2, "0")} dk ${String(
          seconds
        ).padStart(2, "0")} sn`;

        waitingTimeElement.textContent = timeString;
        waitingTimeElement.classList.remove("ended");
      } else {
        waitingTimeElement.textContent = "Bugünkü seferler tamamlandı";
        waitingTimeElement.classList.add("ended");
      }
    });
  }

  // Geri sayımı her saniye güncelle
  setInterval(updateDepartureTimes, 1000);
  updateDepartureTimes(); // Sayfa açılır açılmaz çalıştır
});
