// Fungsi untuk menambah data peminjaman ke tabel
function tampilkanPeminjaman() {
    const peminjamanList = JSON.parse(localStorage.getItem('peminjaman')) || [];
    const tabel = document.getElementById('daftar-peminjaman').getElementsByTagName('tbody')[0];
    tabel.innerHTML = ''; // Bersihkan tabel sebelum menambah data baru

    peminjamanList.forEach((peminjaman) => {
        const row = tabel.insertRow();
        row.innerHTML = `
            <td>${peminjaman.kelas_siswa}</td>
            <td>${peminjaman.nama_siswa}</td>
            <td>${peminjaman.barang}</td>
            <td>${peminjaman.jumlah}</td>
            <td>${peminjaman.tgl_pinjam}</td>
            <td>${peminjaman.tgl_kembali}</td>
        `;
    });
}

// Fungsi untuk menangani submit form
document.getElementById('pinjamForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah form submit biasa

    const kelas_siswa = document.getElementById('kelas_siswa').value;
    const nama_siswa = document.getElementById('nama_siswa').value;
    const barang = document.getElementById('barang').value;
    const jumlah = document.getElementById('jumlah').value;
    const tgl_pinjam = document.getElementById('tgl_pinjam').value;
    const tgl_kembali = document.getElementById('tgl_kembali').value;

    // Membuat objek peminjaman baru
    const peminjamanBaru = {
        kelas_siswa,
        nama_siswa,
        barang,
        jumlah,
        tgl_pinjam,
        tgl_kembali
    };

    // Ambil data peminjaman dari localStorage
    const peminjamanList = JSON.parse(localStorage.getItem('peminjaman')) || [];

    // Tambahkan peminjaman baru ke array
    peminjamanList.push(peminjamanBaru);

    // Simpan kembali ke localStorage
    localStorage.setItem('peminjaman', JSON.stringify(peminjamanList));

    // Tampilkan data peminjaman yang terbaru
    tampilkanPeminjaman();

    // Reset form
    document.getElementById('pinjamForm').reset();
});

// Panggil fungsi untuk menampilkan data peminjaman saat halaman dimuat
window.onload = tampilkanPeminjaman;
document.getElementById('pinjamForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah form agar tidak reload halaman setelah submit

    // Mengambil data dari form
    var kelas_siswa = document.getElementById('kelas_siswa').value;
    var nama_siswa = document.getElementById('nama_siswa').value;
    var barang = document.getElementById('barang').value;
    var jumlah = document.getElementById('jumlah').value;
    var tgl_pinjam = document.getElementById('tgl_pinjam').value;
    var tgl_kembali = document.getElementById('tgl_kembali').value;

    // Membuat objek data untuk dikirim ke server (Google Apps Script)
    var formData = {
        kelas_siswa: kelas_siswa,
        nama_siswa: nama_siswa,
        barang: barang,
        jumlah: jumlah,
        tgl_pinjam: tgl_pinjam,
        tgl_kembali: tgl_kembali
    };

    // URL Web App yang dihasilkan oleh Google Apps Script
    var url = 'https://script.google.com/macros/s/AKfycbyy1lUs9BA3e6FPu_SmpbMEm7Qtd5l2jaLXQ0g7TaMg9RQuUdvGfIHQ1DAmZs9OYWibFw/exec'; // Gantilah dengan URL Web App Anda

    // Mengirim data ke Google Apps Script menggunakan fetch
    fetch(url, {'https://script.google.com/macros/s/AKfycbyy1lUs9BA3e6FPu_SmpbMEm7Qtd5l2jaLXQ0g7TaMg9RQuUdvGfIHQ1DAmZs9OYWibFw/exec
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData) // Mengubah data form menjadi format URL encoded
    })
    .then(response => response.text()) // Menerima respons dari server
    .then(data => {
        alert('Data berhasil disimpan!');
        // Jika data berhasil disimpan, tambahkan baris baru di tabel di halaman
        var table = document.getElementById('daftar-peminjaman').getElementsByTagName('tbody')[0];
        var newRow = table.insertRow();
        newRow.innerHTML = `
            <tr>
                <td>${kelas_siswa}</td>
                <td>${nama_siswa}</td>
                <td>${barang}</td>
                <td>${jumlah}</td>
                <td>${tgl_pinjam}</td>
                <td>${tgl_kembali}</td>
            </tr>
        `;
    })
    .catch(error => {
        alert('Gagal mengirim data: ' + error);
    });
});


