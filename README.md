# Service Media
Service media adalah bagian dari sebuah microservice yang dibangun untuk membuat API aplikasi crowdfunding, pada service ini digunakan untuk menghandle segala sesuatu tentang media/file.

## Daftar Isi
1. [Prasyarat](#prasyarat)
2. [Teknologi yang Digunakan](#teknologi-yang-digunakan)
3. [Fitur-fitur](#fitur---fitur)
4. [Pemasangan](#pemasangan)

## Prasyarat
- [GIT](https://www.git-scm.com/downloads)
- [Node 20.14](https://nodejs.org/en/download/package-manager/current)
- [MySQL 8.0](https://dev.mysql.com/downloads/installer/)

## Teknologi yang Digunakan
- Express 4
- Express Validator
- Mysql2
- Multer
- Sequelize
- Cors
- Dotenv

## Fitur - fitur
1. **Manajemen Media:**
    - Menampilkan, upload, dan menghapus media.

## Pemasangan
Langkah-langkah untuk menginstall proyek ini.

Clone proyek
```bash
git clone https://github.com/DimasPondra/service-media.git
```

Masuk ke dalam folder proyek
```bash
cd service-media
```

Install depedencies
```bash
npm install
```

Buat konfigurasi file
```bash
cp .env-example .env
```

Rubah `.env` untuk konfigurasi sesuai variabel
- `DB_HOST` - Hostname atau alamat IP server MySQL.
- `DB_DATABASE` - Database yang dibuat untuk aplikasi, default adalah laravel.
- `DB_USERNAME` - Username untuk mengakses database.
- `DB_PASSWORD` - Password untuk mengakses database.

Migrasi database tabel awal
```bash
npx sequelize-cli db:migrate
```

Mulai server
```bash
npm run start
```

Dengan mengikuti langkah-langkah di atas, Anda akan dapat menjalankan Service media dimana service tersebut bagian dari crowdfunding microservice.
