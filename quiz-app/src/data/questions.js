export const questions = {
  umum: [
    { id: 1, question: "Apa ibu kota Indonesia?", options: ["Bandung", "Surabaya", "Jakarta", "Medan"], answer: "Jakarta", category: "umum" },
    { id: 2, question: "Siapa presiden pertama Indonesia?", options: ["Soeharto", "Soekarno", "Habibie", "Megawati"], answer: "Soekarno", category: "umum" },
    { id: 3, question: "Berapa jumlah provinsi di Indonesia saat ini?", options: ["34", "37", "38", "40"], answer: "38", category: "umum" },
    { id: 4, question: "Gunung tertinggi di Indonesia adalah?", options: ["Gunung Semeru", "Gunung Rinjani", "Puncak Jaya", "Gunung Kerinci"], answer: "Puncak Jaya", category: "umum" },
    { id: 5, question: "Lagu kebangsaan Indonesia adalah?", options: ["Garuda Pancasila", "Indonesia Pusaka", "Indonesia Raya", "Bagimu Negeri"], answer: "Indonesia Raya", category: "umum" },
    { id: 6, question: "Hari Kemerdekaan Indonesia diperingati setiap tanggal?", options: ["17 Agustus", "20 Oktober", "1 Juni", "28 Oktober"], answer: "17 Agustus", category: "umum" },
    { id: 7, question: "Mata uang resmi Indonesia adalah?", options: ["Dollar", "Ringgit", "Rupiah", "Baht"], answer: "Rupiah", category: "umum" },
    { id: 8, question: "Pancasila terdiri dari berapa sila?", options: ["3", "4", "5", "6"], answer: "5", category: "umum" },
    { id: 9, question: "Pulau terbesar di Indonesia adalah?", options: ["Sumatra", "Kalimantan", "Papua", "Jawa"], answer: "Papua", category: "umum" },
    { id: 10, question: "Penulis lagu Indonesia Raya adalah?", options: ["WR Supratman", "Ismail Marzuki", "Chairil Anwar", "Raden Adjeng Kartini"], answer: "WR Supratman", category: "umum" },
  ],
  sains: [
    { id: 11, question: "Simbol kimia untuk Air adalah?", options: ["CO2", "H2O", "O2", "NaCl"], answer: "H2O", category: "sains" },
    { id: 12, question: "Planet terdekat dengan Matahari adalah?", options: ["Venus", "Bumi", "Mars", "Merkurius"], answer: "Merkurius", category: "sains" },
    { id: 13, question: "Kecepatan cahaya dalam vakum (km/s) adalah?", options: ["150.000", "200.000", "300.000", "400.000"], answer: "300.000", category: "sains" },
    { id: 14, question: "Siapa yang menemukan teori gravitasi?", options: ["Albert Einstein", "Galileo Galilei", "Isaac Newton", "Nikola Tesla"], answer: "Isaac Newton", category: "sains" },
    { id: 15, question: "Proses tumbuhan membuat makanan sendiri disebut?", options: ["Respirasi", "Fotosintesis", "Fermentasi", "Transpirasi"], answer: "Fotosintesis", category: "sains" },
    { id: 16, question: "Jumlah kromosom normal manusia adalah?", options: ["23", "44", "46", "48"], answer: "46", category: "sains" },
    { id: 17, question: "Lapisan terluar bumi disebut?", options: ["Mantel", "Inti", "Kerak", "Litosfer"], answer: "Kerak", category: "sains" },
    { id: 18, question: "Unsur paling melimpah di alam semesta adalah?", options: ["Oksigen", "Helium", "Hidrogen", "Karbon"], answer: "Hidrogen", category: "sains" },
    { id: 19, question: "Satuan kekuatan gempa bumi adalah?", options: ["Desibel", "Skala Richter", "Knot", "Pascal"], answer: "Skala Richter", category: "sains" },
    { id: 20, question: "Sel darah merah disebut juga?", options: ["Leukosit", "Trombosit", "Eritrosit", "Plasma"], answer: "Eritrosit", category: "sains" },
  ],
  teknologi: [
    { id: 21, question: "Kepanjangan dari HTML adalah?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tabular Markup Language", "Home Tool Markup Language"], answer: "Hyper Text Markup Language", category: "teknologi" },
    { id: 22, question: "Siapa pendiri Microsoft?", options: ["Steve Jobs", "Mark Zuckerberg", "Bill Gates", "Elon Musk"], answer: "Bill Gates", category: "teknologi" },
    { id: 23, question: "Kepanjangan dari CPU adalah?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Core Processing Unit"], answer: "Central Processing Unit", category: "teknologi" },
    { id: 24, question: "Bahasa pemrograman oleh Guido van Rossum adalah?", options: ["Java", "C++", "Python", "Ruby"], answer: "Python", category: "teknologi" },
    { id: 25, question: "WWW diciptakan oleh?", options: ["Bill Gates", "Tim Berners-Lee", "Linus Torvalds", "Dennis Ritchie"], answer: "Tim Berners-Lee", category: "teknologi" },
    { id: 26, question: "RAM adalah singkatan dari?", options: ["Read Access Memory", "Random Access Memory", "Run Application Memory", "Rapid Access Module"], answer: "Random Access Memory", category: "teknologi" },
    { id: 27, question: "Framework JavaScript yang dibuat oleh Facebook adalah?", options: ["Vue.js", "Angular", "React.js", "Svelte"], answer: "React.js", category: "teknologi" },
    { id: 28, question: "Sistem operasi Linux dibuat oleh?", options: ["Bill Gates", "Steve Jobs", "Linus Torvalds", "Dennis Ritchie"], answer: "Linus Torvalds", category: "teknologi" },
    { id: 29, question: "Kepanjangan dari URL adalah?", options: ["Uniform Resource Locator", "Universal Resource Link", "Uniform Reference Locator", "User Resource Locator"], answer: "Uniform Resource Locator", category: "teknologi" },
    { id: 30, question: "Git adalah alat untuk?", options: ["Editing kode", "Version control", "Hosting website", "Database management"], answer: "Version control", category: "teknologi" },
  ],
};

export const categoryInfo = {
  umum: { label: "Pengetahuan Umum", description: "Soal tentang Indonesia dan dunia", color: "#6366f1", emoji: "🌍" },
  sains: { label: "Sains dan IPA", description: "Fisika, kimia, biologi, astronomi", color: "#10b981", emoji: "🔬" },
  teknologi: { label: "Teknologi dan IT", description: "Komputer, pemrograman, internet", color: "#f59e0b", emoji: "💻" },
};