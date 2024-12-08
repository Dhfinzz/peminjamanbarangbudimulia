// Fungsi untuk menambah data peminjaman ke tabel
function tampilkanPeminjaman() {
    const peminjamanList = JSON.parse(localStorage.getItem('peminjaman')) || [];
    const tabel = document.getElementById('daftar-peminjaman').getElementsByTagName('tbody')[0];
    tabel.innerHTML = ''; // Bersihkan tabel sebelum menambah data baru

    peminjamanList.forEach((peminjaman) => {
        const row = tabel.insertRow();
        row.innerHTML = `
            <td>${peminjaman.id_siswa}</td>
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

    const id_siswa = document.getElementById('id_siswa').value;
    const nama_siswa = document.getElementById('nama_siswa').value;
    const barang = document.getElementById('barang').value;
    const jumlah = document.getElementById('jumlah').value;
    const tgl_pinjam = document.getElementById('tgl_pinjam').value;
    const tgl_kembali = document.getElementById('tgl_kembali').value;

    // Membuat objek peminjaman baru
    const peminjamanBaru = {
        id_siswa,
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
