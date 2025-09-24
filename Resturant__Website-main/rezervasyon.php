<?php
$host = "localhost";
$dbname = "veritabani_adi";
$username = "kullanici_adi";
$password = "sifre";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Veritabanı bağlantı hatası: " . $e->getMessage());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $ad = trim($_POST["ad"]);
    $telefon = trim($_POST["telefon"]);
    $email = trim($_POST["email"]);
    $tarih = trim($_POST["tarih"]);
    $kisi_sayisi = (int)$_POST["kisi_sayisi"];
    $mesaj = trim($_POST["mesaj"]);

    $tarihObj = DateTime::createFromFormat('Y-m-d H:i', $tarih);
    if (!$tarihObj) {
        $error = "Tarih formatı hatalı.";
    } else {
        $tarihSql = $tarihObj->format('Y-m-d H:i:s');
    }

    if (empty($error)) {
        $stmt = $pdo->prepare("INSERT INTO rezervasyonlar (ad, telefon, email, tarih, kisi_sayisi, mesaj) VALUES (?, ?, ?, ?, ?, ?)");
        $result = $stmt->execute([$ad, $telefon, $email, $tarihSql, $kisi_sayisi, $mesaj]);

        if ($result) {
            // Mail gönderme kodu buraya gelecek
            $to = "esinmanti@outlook.com"; // Esin'in mail adresi ile değiştir
            $subject = "Yeni Rezervasyon - Esin Mantı";
            $message = "Yeni bir rezervasyon yapıldı:\n\n";
            $message .= "Ad Soyad: $ad\n";
            $message .= "Telefon: $telefon\n";
            $message .= "E-posta: $email\n";
            $message .= "Tarih ve Saat: $tarihSql\n";
            $message .= "Kişi Sayısı: $kisi_sayisi\n";
            $message .= "Mesaj: $mesaj\n";

    $headers = "From: noreply@esinmanti.com\r\n";

    mail($to, $subject, $message, $headers);

    $success = "Rezervasyonunuz başarıyla kaydedildi ve Esin'e bildirildi. Teşekkürler!";

    $ad = $telefon = $email = $tarih = $kisi_sayisi = $mesaj = "";
        } else {
            $error = "Kayıt sırasında bir hata oluştu.";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Rezervasyon | Esin Mantı</title>

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css" />
  <script src="https://cdn.jsdelivr.net/npm/flatpickr/dist/l10n/tr.js"></script>

  <link rel="stylesheet" href="main.css" />
</head>
<body>
  <header>
    <div class="header-text">
      <h1>Rezervasyon Yap</h1>
      <p>Gelenekten ilham alan bir lezzet yolculuğu için yerinizi ayırtın.</p>
    </div>
  </header>

  <?php if (!empty($success)) : ?>
    <p style="color: green; font-weight: bold;"><?php echo htmlspecialchars($success); ?></p>
  <?php elseif (!empty($error)) : ?>
    <p style="color: red; font-weight: bold;"><?php echo htmlspecialchars($error); ?></p>
  <?php endif; ?>

  <form action="rezervasyon.php" method="POST">
    <label for="ad">Ad Soyad:</label>
    <input type="text" id="ad" name="ad" required value="<?php echo isset($ad) ? htmlspecialchars($ad) : ''; ?>" />

    <label for="telefon">Telefon:</label>
    <input type="tel" id="telefon" name="telefon" required value="<?php echo isset($telefon) ? htmlspecialchars($telefon) : ''; ?>" />

    <label for="email">E-posta:</label>
    <input type="email" id="email" name="email" value="<?php echo isset($email) ? htmlspecialchars($email) : ''; ?>" />

    <label for="tarih">Tarih ve Saat:</label>
    <input type="text" id="tarih" name="tarih" required value="<?php echo isset($tarih) ? htmlspecialchars($tarih) : ''; ?>" />

    <label for="kisi_sayisi">Kişi Sayısı:</label>
    <input type="number" id="kisi_sayisi" name="kisi_sayisi" min="1" max="20" required value="<?php echo isset($kisi_sayisi) ? htmlspecialchars($kisi_sayisi) : 1; ?>" />

    <label for="mesaj">Ek Notlar:</label>
    <textarea id="mesaj" name="mesaj" rows="4" placeholder="Özel istekleriniz varsa yazabilirsiniz."><?php echo isset($mesaj) ? htmlspecialchars($mesaj) : ''; ?></textarea>

    <button type="submit">Rezervasyon Gönder</button>
  </form>

  <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
  <script>
    flatpickr("#tarih", {
      enableTime: true,
      dateFormat: "Y-m-d H:i",
      minDate: "today",
      locale: "tr",
      minTime: "10:00",
      maxTime: "22:00"
    });
  </script>
</body>
</html>
