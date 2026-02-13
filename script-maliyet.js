
document.getElementById('btnHesapla').addEventListener('click', function() {
    // 1. Elementleri Seçme
    const platformSelect = document.getElementById('platform');
    const typeSelect = document.getElementById('type');
    const multiplayerCheck = document.getElementById('multiplayer');
    const resultDiv = document.getElementById('result');
    const priceHeading = document.getElementById('totalPrice');

    // 2. Değerleri Alma
    const tabanFiyat = parseFloat(platformSelect.value);
    const carpan = parseFloat(typeSelect.value);
    const multiplayerIstiyorMu = multiplayerCheck.checked;

    // 3. Hesaplama Algoritması
    let toplamMaliyet = tabanFiyat * carpan;

    if (multiplayerIstiyorMu) {
        toplamMaliyet *= 1.4; // %40 ek maliyet
    }

    // 4. UI Güncelleme (DOM Manipülasyonu)
    priceHeading.textContent = new Intl.NumberFormat('tr-TR', { 
        style: 'currency', 
        currency: 'TRY' 
    }).format(toplamMaliyet);

    resultDiv.style.display = 'block';
    
    // Yumuşak odaklanma
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});