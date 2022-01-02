-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 14 Nis 2021, 16:26:50
-- Sunucu sürümü: 10.4.17-MariaDB
-- PHP Sürümü: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `vize`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `contact`
--

CREATE TABLE `contact` (
  `contact_id` int(11) NOT NULL,
  `contact_subject` varchar(255) NOT NULL,
  `contact_nameandsurname` varchar(255) NOT NULL,
  `contact_companyname` varchar(255) NOT NULL,
  `contact_phone` varchar(55) NOT NULL,
  `contact_email` varchar(55) NOT NULL,
  `contact_message` text NOT NULL,
  `contact_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `contact`
--

INSERT INTO `contact` (`contact_id`, `contact_subject`, `contact_nameandsurname`, `contact_companyname`, `contact_phone`, `contact_email`, `contact_message`, `contact_date`) VALUES
(4, 'konu', 'isim', 'cmopany', 'telefon', 'mail', 'mesaj', '2021-04-14 14:26:12');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`contact_id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `contact`
--
ALTER TABLE `contact`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
