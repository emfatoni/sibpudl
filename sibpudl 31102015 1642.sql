-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 31, 2015 at 10:41 AM
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=58 ;

--
-- Dumping data for table `donasis`
--

INSERT INTO `donasis` (`id`, `tanggal`, `nominal`, `termin`, `channel`, `jenis`, `syarat`, `kota`, `status`, `id_donatur`, `created_at`, `updated_at`) VALUES
(52, '2015-06-12', 21000000, '1 kali', 'Non-cash', 'Donasi Bersyarat', 'Untuk prodi x', 'Bandung', 'disahkan', 61, '2015-10-30 16:05:08', '2015-10-30 16:08:19'),
(53, '2015-06-12', 60000000, '1 kali', 'Cek', 'Dana Lestari Tidak Bersyarat', NULL, 'Jakarta', 'disahkan', 62, '2015-10-30 16:05:08', '2015-10-30 16:08:20'),
(54, '2015-06-12', 22000000, '1 kali', 'Cash', 'Dana Lestari Bersyarat', 'Untuk prodi x', 'Bandung', 'disahkan', 63, '2015-10-30 16:05:08', '2015-10-30 16:08:20'),
(55, '2015-06-11', 90000000, '1 kali', 'Non-cash', 'Donasi Bersyarat', 'Untuk prodi x', 'Jakarta', 'disahkan', 64, '2015-10-30 16:05:08', '2015-10-30 16:08:27'),
(56, '2015-06-12', 12000000, '1 kali', 'Cek', 'Dana Lestari Tidak Bersyarat', NULL, 'Bandung', 'disahkan', 65, '2015-10-30 16:05:08', '2015-10-30 16:08:20'),
(57, '2015-06-12', 80000000, '1 kali', 'Cash', 'Dana Lestari Bersyarat', 'Untuk prodi x', 'Jakarta', 'disahkan', 66, '2015-10-30 16:05:08', '2015-10-30 16:08:20');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=67 ;

--
-- Dumping data for table `donaturs`
--

INSERT INTO `donaturs` (`id`, `nama`, `id_prodi`, `angkatan`, `jenis`, `nama_wakil`, `telp`, `email`, `alamat_surat`, `created_at`, `updated_at`) VALUES
(59, 'John Doe', NULL, NULL, 'Personal', NULL, NULL, NULL, NULL, '2015-10-30 16:05:08', '2015-10-30 16:05:08'),
(60, 'John Doe', 11, 2009, 'Alumni Individu', NULL, NULL, NULL, NULL, '2015-10-30 16:05:08', '2015-10-31 00:57:27'),
(61, 'Sistem dan Teknologi Informasi (STI)', 2, 2007, 'Alumni Program Studi', 'Suprapto', NULL, NULL, NULL, '2015-10-30 16:05:08', '2015-10-31 01:00:23'),
(62, 'ITB', 11, 1998, 'Alumni Satu ITB', NULL, NULL, NULL, NULL, '2015-10-30 16:05:08', '2015-10-31 00:59:58'),
(63, 'BPUDL', NULL, NULL, 'Organisasi ITB', NULL, NULL, NULL, NULL, '2015-10-30 16:05:08', '2015-10-30 16:05:08'),
(64, 'PT. Freeport', NULL, NULL, 'Organisasi Non-ITB', 'Shintiya', NULL, NULL, NULL, '2015-10-30 16:05:08', '2015-10-30 16:05:08'),
(65, 'Jane Susania', 9, 2001, 'Alumni Individu', NULL, '08997', 'susandoe@gmail.com', 'Yogyakarta', '2015-10-30 16:05:08', '2015-10-31 01:07:48'),
(66, 'Teknik Telekomunikasi', 8, 1999, 'Alumni Program Studi', 'Fauzan', NULL, 'fauzan@gmail.com', NULL, '2015-10-30 16:05:08', '2015-10-31 00:56:22');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=15 ;

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=12 ;

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=14 ;

--
-- Dumping data for table `prodis`
--

INSERT INTO `prodis` (`id`, `kode`, `singkatan`, `kepanjangan`, `id_fakultas`, `created_at`, `updated_at`) VALUES
(2, '182', 'STI', 'Sistem dan Teknologi Informasi (STI)', 2, '2015-09-08 00:36:13', '2015-10-30 15:40:42'),
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=19 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role`, `email`, `password`, `remember_token`, `id_pengguna`, `created_at`, `updated_at`) VALUES
(4, 'Admin BPUDL', 'gunawan@bpudl.itb.ac.id', '$2y$10$xZlpLXf1FQoVMe0NQjVfOemdn6P4exI3dy8MAQv3uCKsIOMFdcBnC', 'Tq7qPzfzTGnbrnT5f0lNKl3YtSNgnbl4J1BeeNnVSTDNeWzvsOfDy4CoWDxl', 4, '2015-08-03 19:28:40', '2015-10-31 02:40:48'),
(11, 'Admin BPUDL', 'soadmin@bpudl.itb.ac.id', '$2y$10$XzgPt4vI/x2k22ouKCaGG.VJCtfXxBvuTayirJ.xQtcyFZEkcNHoW', 'ftZ8gvTn23qQKQp09pWJYD6pRocjbIDvFLPexxVdoHVr4joSRUj0cqx9hael', 10, '2015-09-29 18:41:51', '2015-10-02 19:24:22'),
(12, 'Tim Fundrising', 'sofund@bpudl.itb.ac.id', '$2y$10$9CiPsvMDdgaj./MbczPfQO2yO5jNyejY626DxRKy.y7R/ym/di5P.', 'DgKbxjG4xxiNBZa5HWKjN3PE2pJ6eHcZpLoccjtxjcSxCvSYPSryQyzmtd5P', 11, '2015-09-29 18:42:48', '2015-10-20 23:38:02'),
(18, 'Donatur', 'susandoe@gmail.com', '$2y$10$ky1JhgLXhJLoDTMvFYX/wOlK0M/6T9Cx1VRI4trVJIBzwUDtIr7jC', 'hUVv9hHKUyASJ0z6jGKxQMXMsJyQhEcNOA3QYjdSXkkj9PdQjn7S5t6kSg9j', 65, '2015-10-31 00:31:57', '2015-10-31 01:08:09');

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
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=58;
--
-- AUTO_INCREMENT for table `donaturs`
--
ALTER TABLE `donaturs`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=67;
--
-- AUTO_INCREMENT for table `fakultass`
--
ALTER TABLE `fakultass`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `karyawans`
--
ALTER TABLE `karyawans`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `prodis`
--
ALTER TABLE `prodis`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=19;
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
