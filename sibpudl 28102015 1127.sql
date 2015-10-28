-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 28, 2015 at 05:27 AM
-- Server version: 5.6.20
-- PHP Version: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `sibpudl`
--

-- --------------------------------------------------------

--
-- Table structure for table `donasis`
--

CREATE TABLE IF NOT EXISTS `donasis` (
`id` int(10) unsigned NOT NULL,
  `tanggal` date NOT NULL,
  `nominal` bigint(20) NOT NULL,
  `termin` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `channel` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `jenis` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `syarat` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `kota` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` enum('ditunda','disahkan') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'ditunda',
  `id_donatur` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=49 ;

--
-- Dumping data for table `donasis`
--

INSERT INTO `donasis` (`id`, `tanggal`, `nominal`, `termin`, `channel`, `jenis`, `syarat`, `kota`, `status`, `id_donatur`, `created_at`, `updated_at`) VALUES
(1, '2010-12-14', 20000000, '1 bulan', 'Non-cash', 'Dana Lestari Tidak Bersyarat', '', 'Bandung', 'disahkan', 50, '2015-06-18 20:21:47', '2015-10-11 21:02:19'),
(2, '2013-12-10', 150000000, '2 bulan', 'Cash', 'Dana Lestari Bersyarat', 'Untuk Farmasi', 'Bandung', 'disahkan', 2, '2015-06-19 00:24:07', '2015-10-11 21:02:20'),
(3, '2015-06-12', 5000000, '1 tahun', 'Non-cash', 'Dana Lestari Tidak Bersyarat', '', 'Jakarta', 'disahkan', 48, '2015-06-19 00:27:29', '2015-10-11 21:02:20'),
(4, '2015-02-10', 20000000, '12 bulan', 'Cash', 'Donasi Bersyarat', 'Untuk prodi teknik sipil', 'Bandung', 'disahkan', 3, '2015-06-23 06:54:31', '2015-09-16 17:14:00'),
(5, '2014-07-07', 1000000, '1 tahun', 'Cash', 'Dana Lestari Tidak Bersyarat', '', 'Jepara', 'disahkan', 7, '2015-06-24 16:03:49', '2015-08-22 21:39:15'),
(7, '2015-06-11', 20000000, '10 bulan', 'Non-cash', 'Donasi Bersyarat', 'Untuk Labtek VIII', '', 'disahkan', 5, '2015-06-24 16:25:50', '2015-06-24 23:53:39'),
(41, '2015-06-02', 5000000, '1 bulan', 'Cek', 'Dana Lestari Tidak Bersyarat', NULL, 'Bandung', 'disahkan', 44, '2015-06-26 00:02:00', '2015-08-02 20:01:21'),
(43, '2016-01-14', 100000000, '1 tahun', 'Non-cash', 'Donasi Bersyarat', 'Untuk fakultas SITH', 'Jayapura', 'disahkan', 46, '2015-06-26 00:02:00', '2015-08-22 21:37:34'),
(44, '2010-06-16', 5000000, '1 bulan', 'Cash', 'Dana Lestari Bersyarat', 'ke STI', 'Bandung', 'disahkan', 2, '2015-09-09 06:46:46', '2015-10-11 21:02:20'),
(45, '2015-06-28', 10000000, '1 bulan', 'Cek', 'Dana Lestari Tidak Bersyarat', NULL, 'Bandung', 'disahkan', 51, '2015-10-07 22:30:57', '2015-10-26 19:23:31'),
(46, '2015-06-28', 20000000, '1 bulan', 'Cash', 'Dana Lestari Tidak Bersyarat', NULL, 'Bandung', 'disahkan', 52, '2015-10-21 00:36:54', '2015-10-26 19:23:42'),
(48, '2015-10-11', 15000000, '1 kali', 'Non-cash', 'Dana Lestari Tidak Bersyarat', '', 'Bandung', 'disahkan', 56, '2015-10-26 19:52:46', '2015-10-26 19:52:59');

-- --------------------------------------------------------

--
-- Table structure for table `donaturs`
--

CREATE TABLE IF NOT EXISTS `donaturs` (
`id` int(10) unsigned NOT NULL,
  `nama` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `id_prodi` int(11) unsigned DEFAULT NULL,
  `angkatan` int(5) DEFAULT NULL,
  `jenis` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `nama_wakil` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `telp` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `alamat_surat` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=57 ;

--
-- Dumping data for table `donaturs`
--

INSERT INTO `donaturs` (`id`, `nama`, `id_prodi`, `angkatan`, `jenis`, `nama_wakil`, `telp`, `email`, `alamat_surat`, `created_at`, `updated_at`) VALUES
(1, 'Muhammad Fulan  ', NULL, NULL, 'Personal ', '', '0877-2204-5742', 'fulan@gmail.com', 'Setia Budi, Bandung', '2015-06-18 20:08:33', '2015-07-27 19:58:06'),
(2, 'Fulana   2001', 8, 2001, 'Alumni Individu', '', NULL, 'fulana@yahoo.com', NULL, '2015-06-18 20:10:17', '2015-10-27 20:13:35'),
(3, 'Manajemen      2002', 11, 2002, 'Alumni Program Studi', 'Fulan Sipil', NULL, 'fulansipil@gmail.com', '', '2015-06-18 20:14:23', '2015-10-27 20:40:56'),
(4, 'ITB 2011', NULL, 2011, 'Alumni Satu ITB', 'Fulana ITB', NULL, 'fulanaitb@ymail.com', NULL, '2015-06-18 20:15:32', '2015-10-27 20:14:07'),
(5, 'LPIK ITB ', NULL, NULL, 'Organisasi ITB', 'Pak Fulan', NULL, NULL, NULL, '2015-06-18 20:16:14', '2015-06-18 20:16:14'),
(7, 'Bahruddin Ali ', NULL, NULL, 'Personal ', '', NULL, NULL, NULL, '2015-06-24 16:02:54', '2015-06-24 16:02:54'),
(44, 'Budi Khoironi 23', NULL, NULL, 'Personal', NULL, NULL, NULL, NULL, '2015-06-26 00:02:00', '2015-06-26 00:02:00'),
(46, 'PT. Arsanesia Indotama  ', NULL, NULL, 'Organisasi Non-ITB', 'Abdullah H', '(0284) 23490', 'info@arsanesia.com', NULL, '2015-06-26 00:02:00', '2015-08-01 19:38:16'),
(47, 'M Fatoni 2011', 2, 2011, 'Alumni Individu', '', '0877 2204 5742', 'em.fatoni@gmail.com', 'Jl Pelesiran no. 82/56, Bandung', '2015-08-01 19:45:20', '2015-08-01 19:45:20'),
(48, 'Kewirausahaan  2002', 12, 2002, 'Alumni Program Studi', 'Susan', '089765432', 'susan2@gmail.com', 'Jakarta', '2015-09-13 17:24:36', '2015-10-27 20:50:12'),
(50, 'Teknik Telekomunikasi  2001', 8, 2001, 'Alumni Program Studi', 'Fulanah', NULL, 'fulanah@telkom.com', NULL, '2015-09-13 20:27:15', '2015-10-27 20:41:47'),
(51, 'Fajrin Muhammad', NULL, NULL, 'Personal', NULL, NULL, NULL, NULL, '2015-10-07 22:30:57', '2015-10-07 22:30:57'),
(52, 'Fatoni Muhammad', NULL, NULL, 'Personal', NULL, NULL, NULL, NULL, '2015-10-21 00:36:54', '2015-10-21 00:36:54'),
(56, 'Sains dan Teknologi Farmasi 2002', 9, 2002, 'Alumni Program Studi', 'Bani Sya', NULL, NULL, NULL, '2015-10-26 19:52:07', '2015-10-26 19:52:07');

-- --------------------------------------------------------

--
-- Table structure for table `fakultass`
--

CREATE TABLE IF NOT EXISTS `fakultass` (
`id` int(10) unsigned NOT NULL,
  `kode` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `singkatan` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `kepanjangan` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=16 ;

--
-- Dumping data for table `fakultass`
--

INSERT INTO `fakultass` (`id`, `kode`, `singkatan`, `kepanjangan`, `created_at`, `updated_at`) VALUES
(1, '161', 'SITH-S', 'Sekolah Ilmu dan Teknologi Hayati Program Sains', '0000-00-00 00:00:00', '2015-09-13 16:15:14'),
(2, '165', 'STEI', 'Sekolah Teknik Elektro dan Informatika', '2015-09-07 21:39:28', '2015-09-07 21:39:28'),
(3, '160', 'FMIPA', 'Fakultas Matematika dan Ilmu Pengetahuan Alam', '2015-09-08 00:24:42', '2015-09-08 00:24:42'),
(4, '198', 'SITH-R', 'Sekolah Ilmu dan Teknologi Hayati Program Rekayasa', '2015-09-13 16:16:21', '2015-09-13 16:16:21'),
(5, '162', 'SF', 'Sekolah Farmasi', '2015-09-13 16:16:53', '2015-09-13 16:16:53'),
(6, '164', 'FTTM', 'Fakultas Teknik Pertambangan dan Perminyakan', '2015-09-13 16:17:27', '2015-09-13 16:17:27'),
(7, '163', 'FITB', 'Fakultas Ilmu dan Teknologi Kebumian', '2015-09-13 16:17:57', '2015-09-13 16:17:57'),
(9, '169', 'FTMD', 'Fakultas Teknik Mesin dan Kedirgantaraan', '2015-09-13 16:19:36', '2015-09-13 16:19:36'),
(10, '167', 'FTI', 'Fakultas Teknologi Industri', '2015-09-13 16:19:51', '2015-09-13 16:19:51'),
(11, '166', 'FTSL', 'Fakultas Teknik Sipil dan Lingkungan', '2015-09-13 16:20:46', '2015-09-13 16:20:46'),
(12, '199', 'SAPPK', 'Sekolah Arsitektur dan Perencanaan Pengembangan Kebijakan', '2015-09-13 16:21:59', '2015-09-13 16:21:59'),
(13, '168', 'FSRD', 'Fakultas Seni Rupa dan Desain', '2015-09-13 16:22:33', '2015-09-13 16:22:33'),
(14, '197', 'SBM', 'Sekolah Bisnis dan Manajemen', '2015-09-13 16:23:02', '2015-09-13 16:23:02');

-- --------------------------------------------------------

--
-- Table structure for table `karyawans`
--

CREATE TABLE IF NOT EXISTS `karyawans` (
`id` int(10) unsigned NOT NULL,
  `nama` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `alamat` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `telp` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `jabatan` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=13 ;

--
-- Dumping data for table `karyawans`
--

INSERT INTO `karyawans` (`id`, `nama`, `alamat`, `telp`, `jabatan`, `created_at`, `updated_at`) VALUES
(4, 'Gunawan Halim Kusuma', 'Jl. Cikawao, Bandung', '0877 2209 2340', 'Ketua BPUDL', '2015-08-03 19:28:39', '2015-10-25 18:21:03'),
(10, 'Seorang Admin', 'Bandung', '087722045743', 'Admin BPUDL', '2015-09-29 18:41:50', '2015-09-29 18:41:50'),
(11, 'Muhammad Fajrin', 'Bandung', '087722045734', 'Staf Fundrising', '2015-09-29 18:42:48', '2015-09-30 19:25:00');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE IF NOT EXISTS `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`migration`, `batch`) VALUES
('2014_10_12_000000_create_users_table', 1),
('2014_10_12_100000_create_password_resets_table', 1),
('2015_06_19_010014_create_karyawans_table', 1),
('2015_06_19_010024_create_donaturs_table', 1),
('2015_06_19_015955_create_donasis_table', 1),
('2015_09_03_113253_create_fakultass', 2),
('2015_09_03_113655_create_prodis', 2),
('2015_09_06_133346_prodiss', 3);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `prodis`
--

CREATE TABLE IF NOT EXISTS `prodis` (
`id` int(10) unsigned NOT NULL,
  `kode` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `singkatan` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `kepanjangan` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id_fakultas` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=15 ;

--
-- Dumping data for table `prodis`
--

INSERT INTO `prodis` (`id`, `kode`, `singkatan`, `kepanjangan`, `id_fakultas`, `created_at`, `updated_at`) VALUES
(2, '182', 'II', 'Sistem dan Teknologi Informasi (STI)', 2, '2015-09-08 00:36:13', '2015-09-08 00:48:17'),
(3, '135', 'IF', 'Teknik Informatika', 2, '2015-09-08 00:39:30', '2015-09-08 00:39:30'),
(6, '132', 'EL', 'Teknik Elektro', 2, '2015-09-13 16:23:52', '2015-09-13 16:23:52'),
(7, '180', 'EP', 'Teknik Tenaga Listrik', 2, '2015-09-13 16:24:32', '2015-09-13 16:24:32'),
(8, '181', 'ET', 'Teknik Telekomunikasi', 2, '2015-09-13 16:25:09', '2015-09-13 16:25:09'),
(9, '107', 'FA', 'Sains dan Teknologi Farmasi', 5, '2015-09-13 16:26:16', '2015-09-13 16:26:16'),
(10, '116', 'FK', 'Farmasi Klinik dan Komunikasi', 5, '2015-09-13 16:27:08', '2015-09-13 16:27:08'),
(11, '190', 'MB', 'Manajemen', 14, '2015-09-13 16:27:46', '2015-09-13 16:27:46'),
(12, '192', 'MK', 'Kewirausahaan', 14, '2015-09-13 16:28:33', '2015-10-25 18:37:46'),
(13, '', '', 'Matematika', 3, '2015-10-07 21:46:39', '2015-10-07 21:46:39');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
`id` int(10) unsigned NOT NULL,
  `role` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id_pengguna` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=17 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role`, `email`, `password`, `remember_token`, `id_pengguna`, `created_at`, `updated_at`) VALUES
(4, 'Admin BPUDL', 'gunawan@bpudl.itb.ac.id', '$2y$10$xZlpLXf1FQoVMe0NQjVfOemdn6P4exI3dy8MAQv3uCKsIOMFdcBnC', 'o3xWSNa5jJ0GJBherQFnNztX3ApT4klL6zIiE5cLKcpgqCVfSndtEuyD8pFw', 4, '2015-08-03 19:28:40', '2015-10-27 19:29:02'),
(11, 'Admin BPUDL', 'soadmin@bpudl.itb.ac.id', '$2y$10$XzgPt4vI/x2k22ouKCaGG.VJCtfXxBvuTayirJ.xQtcyFZEkcNHoW', 'ftZ8gvTn23qQKQp09pWJYD6pRocjbIDvFLPexxVdoHVr4joSRUj0cqx9hael', 10, '2015-09-29 18:41:51', '2015-10-02 19:24:22'),
(12, 'Tim Fundrising', 'sofund@bpudl.itb.ac.id', '$2y$10$9CiPsvMDdgaj./MbczPfQO2yO5jNyejY626DxRKy.y7R/ym/di5P.', 'DgKbxjG4xxiNBZa5HWKjN3PE2pJ6eHcZpLoccjtxjcSxCvSYPSryQyzmtd5P', 11, '2015-09-29 18:42:48', '2015-10-20 23:38:02'),
(15, 'Donatur', 'fulanaitb@ymail.com', '$2y$10$d6q3ZkQ7kGVuE7A5me8QfuaJi3mEzovTdZHipQZAEJ3gaHSZ/hfGa', NULL, 4, '2015-10-27 21:08:00', '2015-10-27 21:08:00'),
(16, 'Donatur', 'susan2@gmail.com', '$2y$10$Ke9nkWOhxV3LZuBewnZRt.NlGrPDIt2pFp.n90diHoxR5wky/61g6', NULL, 48, '2015-10-27 21:25:35', '2015-10-27 21:25:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `donasis`
--
ALTER TABLE `donasis`
 ADD PRIMARY KEY (`id`), ADD KEY `donasis_id_donatur_foreign` (`id_donatur`);

--
-- Indexes for table `donaturs`
--
ALTER TABLE `donaturs`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fakultass`
--
ALTER TABLE `fakultass`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `karyawans`
--
ALTER TABLE `karyawans`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
 ADD KEY `password_resets_email_index` (`email`), ADD KEY `password_resets_token_index` (`token`);

--
-- Indexes for table `prodis`
--
ALTER TABLE `prodis`
 ADD PRIMARY KEY (`id`), ADD KEY `prodis_id_fakultas_foreign` (`id_fakultas`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `donasis`
--
ALTER TABLE `donasis`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=49;
--
-- AUTO_INCREMENT for table `donaturs`
--
ALTER TABLE `donaturs`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=57;
--
-- AUTO_INCREMENT for table `fakultass`
--
ALTER TABLE `fakultass`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `karyawans`
--
ALTER TABLE `karyawans`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `prodis`
--
ALTER TABLE `prodis`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=17;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `donasis`
--
ALTER TABLE `donasis`
ADD CONSTRAINT `donasis_id_donatur_foreign` FOREIGN KEY (`id_donatur`) REFERENCES `donaturs` (`id`);

--
-- Constraints for table `prodis`
--
ALTER TABLE `prodis`
ADD CONSTRAINT `prodis_id_fakultas_foreign` FOREIGN KEY (`id_fakultas`) REFERENCES `fakultass` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
