<?php
$host = "localhost";
$dbname = "esin_manti";
$username = "yusufemremanti";       // Senin mysql kullanıcı adın
$password = "manti200404";           // Şifren (localhost için genelde boş)
try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    // Hata ayıklama modu (opsiyonel)
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Veritabanı bağlantı hatası: " . $e->getMessage());
}
?>
