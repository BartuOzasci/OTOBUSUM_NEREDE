// Projenin ilerleyen adımlarında kullanılacak JavaScript kodları buraya eklenecektir.
// Örneğin: Harita entegrasyonu, API'den otobüs konumlarını çekme vb.
// Typewriter efekti için bir sınıf (class) oluşturuyoruz.
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate; // Yazılacak metinler (array)
  this.el = el; // Metnin yazılacağı HTML elemanı (span)
  this.loopNum = 0; // Metin dizisinde hangi sırada olduğumuz
  this.period = parseInt(period, 10) || 2000; // Yazma hızı/bekleme süresi
  this.txt = ""; // O an ekranda yazan metin
  this.tick(); // Animasyonu başlatan fonksiyon
  this.isDeleting = false; // Silme modunda olup olmadığımızı belirten bayrak
};

// Yazma ve silme işlemini yapan ana fonksiyon
TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i]; // Diziden o anki tam metni al

  // Silme modundaysa harfleri eksilt, değilse artır
  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // HTML elemanının içeriğini güncel metinle doldur
  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100; // Yazma hızını rastgele ayarla

  if (this.isDeleting) {
    delta /= 2;
  } // Silme işlemi daha hızlı olsun

  // Metin tamamen yazıldıysa veya tamamen silindiyse ne olacağını belirle
  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period; // Kelime sonunda bekleme süresi
    this.isDeleting = true; // Silme moduna geç
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++; // Sonraki metne geç
    delta = 500; // Yeni kelimeye başlamadan önce kısa bir bekleme
  }

  // Belirlenen süre sonunda tick fonksiyonunu tekrar çağır
  setTimeout(function () {
    that.tick();
  }, delta);
};

// Sayfa yüklendiğinde animasyonu başlat
window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
};
// Mevcut Typewriter kodunuzun hemen altına veya üstüne ekleyebilirsiniz.
// Önemli olan window.onload bloğunun içinde olması.

window.onload = function () {
  // Mevcut typewriter kodunuz...
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // ...typewriter kodunuzun sonu.
};

// TxtType class tanımınız burada yer alıyor...
// var TxtType = function(el, toRotate, period) { ... };
// ...
