/* Q-Line Mülakat Motoru - Anlık Puan & Navigasyon Modeli */

// Soru verileri: Soru metni, seçenekler ve doğru cevaplar
const sorular = [
    { s: "Unity'de 'Awake' mi yoksa 'Start' mı önce çalışır?", o: ["Start", "Awake", "Aynı anda", "Sıralama rastgeledir"], c: "Awake" },
    { s: "C#'da bir sınıfın örneğini oluşturmak için hangi anahtar kelime kullanılır?", o: ["new", "create", "static", "void"], c: "new" },
    { s: "3D grafiklerde 'Vertex' nedir?", o: ["Kaplama", "Köşe noktası", "Işık kaynağı", "Kamera açısı"], c: "Köşe noktası" },
    { s: "Hangisi bir oyun motorudur?", o: ["Docker", "Unreal Engine", "Python", "Kubernetes"], c: "Unreal Engine" },
    { s: "LIFO (Last In First Out) prensibiyle çalışan veri yapısı hangisidir?", o: ["Queue", "List", "Stack", "Dictionary"], c: "Stack" },
    { s: "Raycasting ne amaçla kullanılır?", o: ["Ses çalmak", "Çarpışma/Mesafe algılama", "Texture boyama", "Dosya kaydetme"], c: "Çarpışma/Mesafe algılama" },
    { s: "FPS (Frames Per Second) neyi ölçer?", o: ["İnternet hızını", "Grafik performansını", "İşlemci sıcaklığını", "Bellek miktarını"], c: "Grafik performansını" },
    { s: "Unity'de fizik hesaplamaları hangi fonksiyon içinde yapılmalıdır?", o: ["Update", "FixedUpdate", "LateUpdate", "OnDrawGizmos"], c: "FixedUpdate" },
    { s: "C#'da kalıtım (inheritance) hangi sembolle belirtilir?", o: [":", ";", "->", "@"], c: ":" },
    { s: "Bir objenin dokusunu (yüzeyini) tanımlayan yazılımlara ne denir?", o: ["Compiler", "Shader", "Kernel", "Script"], c: "Shader" },
    { s: "Git sisteminde değişiklikleri uzak sunucuya göndermek için ne kullanılır?", o: ["pull", "commit", "push", "fetch"], c: "push" },
    { s: "Hangisi 'UI' (Kullanıcı Arayüzü) elemanıdır?", o: ["Rigidbody", "Button", "Mesh Renderer", "Collider"], c: "Button" },
    { s: "Oyunlarda 'Draw Call' sayısının artması neye sebep olur?", o: ["FPS düşüşü", "Ses bozulması", "Yüksek internet hızı", "Daha iyi grafik"], c: "FPS düşüşü" },
    { s: "Nesne yönelimli programlamada (OOP) hangisi temel bir ilkedir?", o: ["Encapsulation", "Compilation", "Iteration", "Debugging"], c: "Encapsulation" },
    { s: "Unity'de sahneler arası veri taşımak için ne kullanılır?", o: ["DontDestroyOnLoad", "Destroy", "Reset", "Quit"], c: "DontDestroyOnLoad" },
    { s: "Yapay zeka navigasyonu için kullanılan zemin verisine ne denir?", o: ["NavMesh", "Terrain", "Sprite", "Skybox"], c: "NavMesh" },
    { s: "Bir objenin şeffaflık değerine ne ad verilir?", o: ["Beta", "Gamma", "Alpha", "Delta"], c: "Alpha" },
    { s: "İki değer arasında yumuşak geçiş yapmak için kullanılan fonksiyon?", o: ["Clamp", "Lerp", "Min", "Abs"], c: "Lerp" },
    { s: "Unity'de prefab (önceden hazırlanmış obje) uzantısı nedir?", o: [".unity", ".prefab", ".fbx", ".obj"], c: ".prefab" },
    { s: "Bir metodun kendi kendini çağırmasına ne denir?", o: ["Loop", "Inheritance", "Recursion", "Overriding"], c: "Recursion" }
];

// Mevcut soru indeksi ve cevaplar dizisi
let mevcutSoruIndex = 0;
let cevaplar = new Array(sorular.length).fill(null); 

// HTML elementlerini seçme
const startBtn = document.getElementById('start-btn');
const qText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');

// Başlangıç butonuna tıklama olayı
startBtn.addEventListener('click', () => {
    document.getElementById('start-screen').classList.add('hidden'); // Başlangıç ekranını gizle
    document.getElementById('quiz-screen').classList.remove('hidden'); // Soru ekranını göster
    soruYükle(); // İlk soruyu yükle
});

// Anlık puanı güncelleyen fonksiyon
function anlikPuanGuncelle() {
    let toplam = 0;
    cevaplar.forEach((cevap, index) => {
        if(cevap === sorular[index].c) {
            toplam += 5;
        }
    });
    document.getElementById('score-board').innerText = `Mevcut Puan: ${toplam}`; // Puanı güncelle
    return toplam;
}

// Soruyu yükleyen fonksiyon
function soruYükle() {
    const soruData = sorular[mevcutSoruIndex]; // Mevcut soruyu al
    document.getElementById('question-number').innerText = `Soru ${mevcutSoruIndex + 1}/${sorular.length}`; // Soru numarasını güncelle
    qText.innerText = soruData.s; // Soru metnini güncelle
    optionsContainer.innerHTML = ''; // Önceki seçenekleri temizle

    // Seçenekleri oluştur ve ekle
    soruData.o.forEach(secenek => {
        const btn = document.createElement('button');
        btn.classList.add('btn');
        if (cevaplar[mevcutSoruIndex] === secenek) btn.classList.add('selected');
        
        btn.innerText = secenek;
        btn.onclick = () => {
            cevaplar[mevcutSoruIndex] = secenek; // Seçilen cevabı kaydet
            anlikPuanGuncelle(); // Puanı güncelle
            soruYükle(); // Soruyu yeniden yükle
        };
        optionsContainer.appendChild(btn); // Seçeneği ekle
    });

    // Navigasyon butonlarını güncelle
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const finishBtn = document.getElementById('finish-btn');

    if (prevBtn) prevBtn.style.visibility = mevcutSoruIndex === 0 ? "hidden" : "visible"; // İlk soruda geri butonunu gizle
    
    const sonSoruMu = mevcutSoruIndex === sorular.length - 1;
    if (nextBtn) nextBtn.classList.toggle('hidden', sonSoruMu); // Son soruda ileri butonunu gizle
    if (finishBtn) finishBtn.classList.toggle('hidden', !sonSoruMu); // Son soruda bitir butonunu göster
}

// Navigasyon buton tıklama olayları
document.getElementById('next-btn').onclick = () => { 
    if(mevcutSoruIndex < sorular.length -1) { 
        mevcutSoruIndex++; 
        soruYükle(); 
    } 
};

document.getElementById('prev-btn').onclick = () => { 
    if(mevcutSoruIndex > 0) { 
        mevcutSoruIndex--; 
        soruYükle(); 
    } 
};

// Mülakatı bitirme butonuna tıklama olayı
document.getElementById('finish-btn').onclick = () => {
    const finalSkor = anlikPuanGuncelle(); // Son puanı hesapla
    sonucGoster(finalSkor); // Sonuç ekranını göster
};

// Sonuç ekranını gösteren fonksiyon
function sonucGoster(skor) {
    document.getElementById('quiz-screen').classList.add('hidden'); // Soru ekranını gizle
    document.getElementById('result-screen').classList.remove('hidden'); // Sonuç ekranını göster
    document.getElementById('final-score').innerText = skor; // Nihai puanı göster
    
    const feedback = document.getElementById('hr-feedback');
    if (skor >= 75) {
        feedback.innerText = "TEBRİKLER! Teknik mülakatta yeterlilik aşamasını geçtiniz. Ekibimiz sizinle ileşime geçecektir.";
        feedback.style.backgroundColor = "#d1fae5"; // Başarılı geri bildirim rengi
        feedback.style.color = "#065f46"; // Başarılı geri bildirim yazı rengi
    } else {
        feedback.innerText = "ÜZGÜNÜZ. Barajın altında kaldınız.";
        feedback.style.backgroundColor = "#fee2e2"; // Başarısız geri bildirim rengi
        feedback.style.color = "#991b1b"; // Başarısız geri bildirim yazı rengi
    }
}