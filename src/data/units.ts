import { LkpdLevel, LkpdQuestion } from '../types';

export const INITIAL_LEVELS: LkpdLevel[] = [
  {
    id: 'level-1',
    level: 1,
    judul: 'Menciptakan Karya Seni yang Berdampak bagi Lingkungan Sekitar',
    deskripsi: 'Mengeksplorasi potensi limbah, material daur ulang (upcycling), dan isu ekologis di lingkungan sekitar untuk dirancang menjadi karya seni berdampak sosial, estetis, dan ramah lingkungan.',
    urutan: 1,
    tema: 'Unit 1: Menciptakan Karya Seni yang Berdampak bagi Lingkungan Sekitar',
    tujuan_pembelajaran: [
      'Mengidentifikasi Isu Lingkungan: Mengamati dan mendokumentasikan permasalahan limbah atau lingkungan fisik sekitar sekolah/masyarakat.',
      'Pengembangan Ide & Gagasan: Menemukan gagasan kreatif berorientasi ekologi yang merefleksikan kepedulian terhadap isu alam.',
      'Perancangan Konsep & Media: Merancang konsep karya (tema, tujuan, pesan) melalui metode Corong Konsep dan memilih material daur ulang yang aman.',
      'Manajemen Proyek & Produksi: Menyusun alokasi waktu kerja terstruktur (timeline 5 tahap) dan mengeksekusi karya dengan teknik seni rupa yang tepat.',
      'Evaluasi Dampak Positif: Menganalisis efektivitas pesan dan mempresentasikan dampak nyata karya seni terhadap masyarakat dan lingkungan berdasarkan 7 Spektrum Dampak Positif.'
    ],
    materi_teks: '',
    video_url: 'https://www.youtube-nocookie.com/embed/zL8pT9qN5gU',
    video_title: 'Seni Berkelanjutan: Mengubah Limbah Lingkungan Menjadi Karya Berdaya Guna',
    quiz_data: [
      {
        id: 1,
        question: 'Konsep mengubah limbah anorganik sekitar menjadi karya seni bernilai estetis dan fungsi yang lebih tinggi disebut...',
        options: ['Downcycling', 'Upcycling Art', 'Landfill', 'Degradasi material'],
        answerIndex: 1,
        explanation: 'Upcycling art meningkatkan nilai guna dan keindahan barang buangan tanpa merusak mutu bahan.'
      },
      {
        id: 2,
        question: 'Tujuan utama penciptaan karya seni yang berdampak bagi lingkungan sekitar adalah...',
        options: [
          'Membuat tumpukan sampah semakin banyak di selokan',
          'Membangkitkan kesadaran kritis masyarakat terhadap isu kelestarian lingkungan melalui media visual',
          'Meniru karya orang lain tanpa izin',
          'Membeli bahan-bahan mahal dari luar negeri'
        ],
        answerIndex: 1,
        explanation: 'Seni rupa kontekstual ekologis bertujuan mengedukasi dan menggugah kepedulian sosial terhadap alam.'
      },
      {
        id: 3,
        question: 'Bahan limbah sekitar yang sangat cocok dimanfaatkan untuk teknik kolase tekstur timbul adalah...',
        options: ['Kertas koran bekas, serbuk kayu, dan cangkang kerang', 'Limbah beracun B3', 'Pecahan kaca tajam tanpa pengaman', 'Gas aerosol'],
        answerIndex: 0,
        explanation: 'Kertas koran, serbuk gergaji kayu, dan cangkang kerang merupakan material aman yang kaya akan ragam tekstur rupa.'
      },
      {
        id: 4,
        question: 'Karya seni instalasi ramah lingkungan yang ditempatkan di halaman sekolah sebaiknya mempertimbangkan aspek...',
        options: [
          'Ketahanan terhadap cuaca dan keamanan bagi siswa yang melintas',
          'Harus dibuat dari bahan yang mudah terbakar',
          'Tidak boleh dilihat oleh orang lain',
          'Hanya boleh berwarna hitam pekat'
        ],
        answerIndex: 0,
        explanation: 'Aspek keselamatan pengguna (safety) dan durabilitas cuaca merupakan syarat mutlak seni lingkungan luar ruang.'
      },
      {
        id: 5,
        question: 'Sikap yang harus dikembangkan siswa saat merancang karya seni lingkungan adalah...',
        options: [
          'Apatis dan mengabaikan sampah sekitar',
          'Peka observatif terhadap lingkungan serta berdaya cipta inovatif',
          'Bergantung sepenuhnya pada cat impor',
          'Membuang sisa cat ke saluran air bersih'
        ],
        answerIndex: 1,
        explanation: 'Kepekaan observasi terhadap masalah lingkungan sekitar adalah fondasi lahirnya ide seni yang orisinal dan berdampak.'
      }
    ],
    matching_quiz: {
      title: 'Kuis Menjodohkan: Konsep Seni Berdampak bagi Lingkungan',
      instruction: 'Hubungkan istilah atau konsep seni di kolom kiri dengan definisi/perannya yang tepat di kolom kanan!',
      pairs: [
        {
          id: 'u1-m1',
          left: 'Upcycling Art',
          right: 'Mengubah limbah menjadi karya seni bernilai estetis & ekonomis tinggi tanpa merusak bahan dasarnya',
          explanation: 'Upcycling art meningkatkan nilai guna dan keindahan limbah menjadi produk bernilai lebih tinggi.'
        },
        {
          id: 'u1-m2',
          left: 'Site-Specific Eco-Installation',
          right: 'Karya seni 3D yang dibuat dan ditempatkan menyatu langsung dengan kondisi ekosistem lokal',
          explanation: 'Karya seni instalasi berbasis lokasi dirancang khusus selaras dengan ekosistem tempat ia dipajang.'
        },
        {
          id: 'u1-m3',
          left: 'The Concept Funnel',
          right: 'Alur perumusan karya: dari Tema payung, Tujuan dampak, Pesan persuasif, hingga Bentuk visual',
          explanation: 'Corong konsep membantu seniman mengerucutkan isu lingkungan menjadi wujud seni konkret.'
        },
        {
          id: 'u1-m4',
          left: 'Beautifikasi Publik',
          right: 'Mentransformasikan sudut dinding kusam/kumuh menjadi galeri visual asri sarat edukasi',
          explanation: 'Beautifikasi mempercantik ruang publik yang terbengkalai sekaligus menyisipkan pesan edukatif.'
        },
        {
          id: 'u1-m5',
          left: 'Spektrum 7 Dampak Positif',
          right: 'Kerangka evaluasi keberhasilan karya seni dalam mereduksi limbah dan menginspirasi publik',
          explanation: 'Spektrum dampak mengukur keberhasilan karya seni dalam memicu perubahan nyata di masyarakat.'
        }
      ]
    },
    fill_blank_quiz: {
      title: 'Kuis Isian Rumpang (Fill in the Blank): Seni Lingkungan',
      instruction: 'Ketik kata kunci yang tepat untuk melengkapi kalimat rumpang berikut dengan benar!',
      questions: [
        {
          id: 1,
          sentence_before: 'Proses mendaur ulang limbah anorganik sekitar menjadi produk seni rupa bernilai estetis dan fungsi yang lebih tinggi disebut seni ',
          target_word: 'upcycling',
          sentence_after: '.',
          hint: 'Dimulai dengan huruf "U" (istilah daur ulang bernilai tambah)',
          acceptable_answers: ['upcycling', 'upcycling art', 'upcycle'],
          explanation: 'Upcycling art adalah proses kreatif meningkatkan nilai keindahan dan fungsi material buangan.'
        },
        {
          id: 2,
          sentence_before: 'Tahap awal investigasi lapangan untuk mencatat dan mendokumentasikan fenomena tumpukan limbah di sekitar sekolah disebut tahap ',
          target_word: 'observasi',
          sentence_after: '.',
          hint: 'Dimulai dengan huruf "O" (kegiatan mengamati fenomena)',
          acceptable_answers: ['observasi', 'pengamatan', 'investigasi'],
          explanation: 'Observasi merupakan langkah awal menangkap isu konkret sebelum merancang ide berkarya.'
        },
        {
          id: 3,
          sentence_before: 'Tingkat gagasan paling atas dalam Corong Konsep Karya yang memayungi tujuan dan pesan moral seni disebut ',
          target_word: 'tema',
          sentence_after: '.',
          hint: 'Kata 4 huruf berawalan "T" (pokok pikiran utama)',
          acceptable_answers: ['tema', 'konsep tema'],
          explanation: 'Tema adalah payung besar persoalan ekologis yang dipilih sebagai fokus penciptaan karya.'
        },
        {
          id: 4,
          sentence_before: 'Lapisan pelindung bening yang dioleskan pada tahap akhir (finishing) patung daur ulang agar tahan cuaca dan debu disebut lapisan ',
          target_word: 'pernis',
          sentence_after: '.',
          hint: 'Dimulai dengan huruf "P" (cairan pelapis kilau/doff)',
          acceptable_answers: ['pernis', 'varnish', 'coating'],
          explanation: 'Pernis (varnish) melindungi pigmen karya dari kelembapan, debu, dan paparan cuaca luar ruangan.'
        }
      ]
    },
    game_data: {
      type: 'upcycle_match',
      title: 'Tantangan Inovator Desain Seni Lingkungan',
      instruction: 'Pasangkan jenis limbah lingkungan sekitar dengan bentuk karya seni inovatif yang paling tepat!',
      items: [
        { waste: 'Tutup botol plastik warna-warni', product: 'Mozaik mural dinding edukasi hemat air' },
        { waste: 'Kertas koran & kardus bekas', product: 'Relief paper-mache dekoratif bernilai seni tinggi' },
        { waste: 'Kain perca sisa konveksi seragam', product: 'Tote bag seni rupa anyam perca ramah lingkungan' },
        { waste: 'Pecahan genteng & keramik sisa', product: 'Instalasi pot taman mozaik tahan cuaca' }
      ]
    }
  },
  {
    id: 'level-2',
    level: 2,
    judul: 'Kritik Seni Rupa',
    deskripsi: 'Mempelajari konsep, fungsi strategis, 4 jenis kritik seni (Jurnalistik, Populer, Pedagogik, Ilmiah), pendekatan kritik, serta 4 tahapan prosedur penulisan kritik (Deskripsi, Analisis Formal, Interpretasi, dan Evaluasi) bersumber dari Bahan Ajar Kritik Seni Rupa dan Presentasi Kritik Seni Rupa.',
    urutan: 2,
    tema: 'Unit 2: Kritik Seni Rupa',
    tujuan_pembelajaran: [
      'Mengidentifikasi dan membedakan 4 jenis kritik seni rupa: Jurnalistik, Populer, Pedagogik, dan Ilmiah.',
      'Menganalisis karya seni rupa melalui pendekatan formalistik, ekspresionistik, instrumentalistik, dan kontekstual.',
      'Memahami fungsi strategis kritik seni sebagai "dua mata panah" jembatan estetik antara seniman dan penikmat seni.',
      'Menyusun ulasan kritik seni rupa secara terstruktur melalui 4 tahapan: Deskripsi, Analisis Formal, Interpretasi, dan Evaluasi.'
    ],
    materi_teks: `
### Unit 2: Kritik Seni Rupa
Materi Pembelajaran Digital Resmi (Literasi SMANEB):
1. **Bahan Ajar Kritik Seni Rupa**: https://literasi-smaneb.my.canva.site/kritik-senirupa
2. **Kritik Seni Rupa**: https://literasi-smaneb.my.canva.site/kritik-seni-rupa

---

### BAGIAN I: BAHAN AJAR KRITIK SENI RUPA
> Sumber: Bahan Ajar Kritik Seni Rupa (https://literasi-smaneb.my.canva.site/kritik-senirupa)

#### 1. Pendekatan dalam Kritik Seni
Dalam menelaah dan mengkritisi karya seni rupa, terdapat beberapa pendekatan utama yang digunakan oleh kritikus seni:
- **Pendekatan Formalistik**: Menekankan pada kualitas formal visual, keselarasan unsur rupa (garis, bidang, bentuk, warna, tekstur, ruang), dan prinsip-prinsip penataan komposisi (keseimbangan, irama, kesatuan, penekanan/focal point).
- **Pendekatan Ekspresionistik**: Menilai karya seni berdasarkan intensitas ekspresi perasaan, kedalaman emosional batin, serta orisinalitas luapan jiwa penciptanya.
- **Pendekatan Instrumentalistik**: Memandang karya seni sebagai instrumen atau sarana untuk mencapai tujuan moral, pendidikan, sosial, religius, atau politik tertentu.
- **Pendekatan Kontekstual**: Tidak terlalu mempersoalkan kualitas formal semata, melainkan melihat aspek konteksnya (keterkaitan antara objek, isi, tema, tujuan, dan pesan moral yang ingin disampaikan pelukisnya terhadap konteks ketika karya tersebut dihadirkan). Contoh nyata: lukisan *"Penangkapan Pangeran Diponegoro"* karya Raden Saleh dikritisi tidak saja dari segi teknis melukisnya, melainkan juga muatan politis perlawanan anti-kolonial dan martabat bangsa.

#### 2. Empat Tahap Menulis Kritik Seni
Berdasarkan pendekatan dalam kritik seni, tahapan kritik dirumuskan secara sistematis sebagai berikut:
1. **Deskripsi**: Tahapan menemukan, mencatat, dan mendeskripsikan segala sesuatu yang dilihat apa adanya tanpa berusaha melakukan analisis atau mengambil kesimpulan awal. Pengkritik harus menguasai istilah teknis seni rupa agar mampu mendeskripsikan fenomena visual yang kasat mata secara akurat.
2. **Analisis Formal**: Tahapan menelusuri karya seni berdasarkan struktur formal dan unsur-unsur pembentuknya (garis, bidang, warna, ruang, tekstur) serta prinsip penataannya. Melibatkan pemahaman struktur, pola, dan relasi antar elemen melalui pendekatan analitis.
3. **Interpretasi**: Tahapan penafsiran makna sebuah karya seni, meliputi tema yang digarap, simbol yang dihadirkan, serta masalah filosofis yang dikedepankan seniman. Penafsiran ini bersifat terbuka dan dipengaruhi keluasan wawasan pengkritik.
4. **Evaluasi atau Penilaian**: Tahapan yang menjadi ciri khas pembeda utama kritik seni, yaitu menentukan kualitas suatu karya seni bila dibandingkan dengan karya lain yang sejenis. Langkah evaluasi kritis meliputi:
   - Mengaitkan sebanyak-banyaknya karya yang dinilai dengan karya lain yang sejenis.
   - Menetapkan tujuan atau fungsi karya yang ditelaah.
   - Menetapkan sejauh mana karya tersebut "menyimpang" atau menghadirkan kebaruan dari karya sebelumnya.
   - Menelaah karya dari sudut pandang dan kebutuhan khusus yang melatarbelakanginya.

#### 3. Kapasitas Mental Manusia dalam Melakukan Kritik
Manusia memiliki dorongan alami untuk memberikan tanggapan atau evaluasi terhadap karya seni karena memiliki kapasitas mental:
- **Kemampuan reasoning**: Kemampuan menganalisis, menimbang, dan memikirkan secara rasional.
- Dorongan kritis yang didasari oleh keterpaduan unsur **cipta, rasa, dan karsa** dalam diri manusia.

#### 4. Fungsi Strategis Kritik Seni
Kritik seni memiliki fungsi yang sangat strategis dalam dunia kesenirupaan dan pendidikan:
- Menjembatani persepsi dan apresiasi artistik dan estetik antara pencipta (seniman), karya, dan penikmat seni (publik).
- Menjadi **"dua mata panah"** yang saling dibutuhkan:
  - **Bagi Seniman**: Membutuhkan mata panah tajam untuk mendeteksi kelemahan, mengupas kedalaman makna, dan membangun kekurangan sebagai umpan balik refleksi komunikatif-ekspresifnya.
  - **Bagi Penikmat (Publik Seni)**: Membutuhkan tali penghubung pemahaman terhadap realita artistik dan estetik dalam karya seni agar proses apresiasi terjalin lekat.

#### 5. Kualifikasi dan Sosok Kritikus Seni
Kritikus seni adalah orang yang melakukan kritik terhadap karya seni orang lain atau dirinya sendiri (*self-critic*). Persyaratan ideal seorang kritikus:
- Memiliki ketajaman dan sensibilitas indera, pikiran, dan perasaan (*reasoning and creative*).
- Memiliki pengalaman dan pergaulan yang memadai dalam mengamati, menyelidiki, dan membandingkan materi seni rupa.
- Menguasai landasan keilmuan seni (sejarah seni rupa Barat dan Timur, teori seni, filsafat seni, antropologi, dan sosiologi seni).
- Memahami medium, proses melukis/membentuk, dan biografi seniman pencipta.
- Menguasai media kebahasaan yang efektif (sesuai tata bahasa baku) dan komunikatif (mudah dicerna audiens sesuai sasaran pembaca publik/jurnalistik maupun akademis).

---

### BAGIAN II: KRITIK SENI RUPA
> Sumber: Modul Presentasi Kritik Seni Rupa (https://literasi-smaneb.my.canva.site/kritik-seni-rupa)

#### 1. Pemantik dan Refleksi
- Pernahkah kalian mendengar kata kritik?
- Menurut pendapat kalian apakah kritik itu?
- Bagaimanakah cara menyampaikan sebuah kritik yang baik, santun, dan membangun?

#### 2. Tujuan Pembelajaran
1. Siswa dapat mengidentifikasi jenis-jenis kritik seni rupa.
2. Siswa dapat menganalisis jenis-jenis kritik seni rupa.
3. Siswa dapat menyusun kritik seni rupa secara terstruktur dan santun.

#### 3. Pengertian Kritik Seni Rupa
Kritik seni rupa merupakan proses evaluasi terhadap karya seni rupa, baik dari segi teknis maupun isi pesan yang ingin disampaikan oleh sang seniman. Kritik seni rupa dapat membantu dalam memahami makna dan nilai sebuah karya seni, serta memberikan pandangan yang berbeda untuk menghargai keunikan dan keindahan dalam seni.

Aspek yang perlu diperhatikan dalam kritik seni rupa:
- Komposisi dan tata letak unsur rupa
- Penggunaan warna dan pencahayaan
- Teknik penggambaran dan pengolahan medium
- Ekspresi visual dan pesan yang ingin disampaikan
- Konteks sosial, budaya, dan sejarah yang melatarbelakangi karya seni

#### 4. Empat Jenis Kritik Seni Rupa
1. **Kritik Jurnalistik**:
   Penilaian terhadap kualitas suatu karya untuk konsumsi pembaca umum di media massa (artikel, berita, majalah). Tujuannya menyajikan informasi ulasan secara cepat, akurat, seimbang, dan dapat dipercaya khalayak ramai.
2. **Kritik Populer**:
   Bentuk evaluasi atau penilaian yang sering dilakukan oleh masyarakat umum terhadap karya seni, film, buku, atau musik di ruang publik (media daring, majalah, televisi). Menggunakan gaya bahasa santai dan komunikatif.
3. **Kritik Pedagogik**:
   Evaluasi dalam dunia pendidikan seni untuk meningkatkan mutu pengajaran dan pembelajaran. Bertujuan membimbing siswa agar lebih memahami seni, mematangkan keterampilan teknis, dan memupuk rasa percaya diri.
4. **Kritik Ilmiah (Akademik)**:
   Evaluasi mendalam terhadap metodologi, analisis data, struktur rupa, atau kesimpulan dalam karya seni/penelitian ilmiah seni. Bertujuan memperbaiki kelemahan penelitian serta meningkatkan validitas dan reliabilitas keilmuan seni.

#### 5. Prosedur Penulisan Kritik Seni
Alur baku penyusunan kritik seni rupa:
**Deskripsi ➔ Analisis Formal ➔ Interpretasi ➔ Evaluasi**
Dengan menerapkan alur 4 tahap ini, siswa dapat menghasilkan ulasan kritik yang komprehensif, santun, objektif, dan berbobot.
    `,
    video_url: 'https://www.youtube-nocookie.com/embed/kOqf0lYh_Qc',
    video_title: 'Panduan Kritik Seni Rupa: 4 Jenis Kritik & Prosedur Analisis Feldman',
    quiz_data: [
      {
        id: 1,
        question: 'Menurut modul pembelajaran Canva, kritik seni rupa diartikan sebagai...',
        options: [
          'Proses evaluasi terhadap karya seni rupa, baik dari segi teknis maupun isi pesan yang disampaikan seniman',
          'Tindakan mencela dan mencari kelemahan karya orang lain agar tidak dipamerkan',
          'Penetapan harga komersial suatu lukisan sebelum dilelang',
          'Pemberian tanda tangan sertifikat keaslian karya seni'
        ],
        answerIndex: 0,
        explanation: 'Kritik seni rupa mengevaluasi segi teknis dan pesan karya untuk memahami makna serta menghargai keindahan seni.'
      },
      {
        id: 2,
        question: 'Jenis kritik seni rupa yang disajikan untuk konsumsi pembaca umum di media massa seperti surat kabar atau artikel berita adalah kritik...',
        options: ['Kritik Pedagogik', 'Kritik Jurnalistik', 'Kritik Ilmiah', 'Kritik Kolektor'],
        answerIndex: 1,
        explanation: 'Kritik jurnalistik menyajikan ulasan ringkas, cepat, akurat, dan seimbang bagi pembaca media massa.'
      },
      {
        id: 3,
        question: 'Pendekatan kritik seni yang menelaah karya dengan melihat keterkaitan objek, isi, tema, serta konteks sejarah masa lalu (seperti lukisan Raden Saleh "Penangkapan Pangeran Diponegoro") disebut pendekatan...',
        options: ['Kontekstual', 'Formalistik Murni', 'Dekoratif', 'Materialistik'],
        answerIndex: 0,
        explanation: 'Pendekatan kontekstual menelaah keterkaitan karya dengan kondisi sosial budaya dan pesan historis yang melatarbelakanginya.'
      },
      {
        id: 4,
        question: 'Fungsi kritik seni yang diibaratkan sebagai "dua mata panah" bermakna bahwa kritik seni...',
        options: [
          'Dibutuhkan seniman untuk mendeteksi kekurangan karya, sekaligus dibutuhkan publik untuk membantu memahami realita estetik',
          'Seniman dan penikmat seni harus saling bermusuhan dalam menilai karya',
          'Setiap karya seni harus dinilai oleh tepat dua orang kritikus',
          'Kritik hanya boleh disampaikan dengan dua buah kalimat saja'
        ],
        answerIndex: 0,
        explanation: 'Dua mata panah berarti kritik seni menjadi umpan balik refleksi bagi seniman sekaligus tali penghubung pemahaman bagi penikmat seni.'
      },
      {
        id: 5,
        question: 'Tahapan dalam kritik karya seni yang bertugas menentukan kualitas suatu karya seni bila dibandingkan dengan karya lain yang sejenis adalah tahap...',
        options: ['Deskripsi', 'Analisis Formal', 'Interpretasi', 'Evaluasi / Penilaian'],
        answerIndex: 3,
        explanation: 'Evaluasi atau penilaian merupakan ciri khas utama kritik seni untuk menentukan mutu kualitas karya melalui telaah komparatif.'
      }
    ],
    matching_quiz: {
      title: 'Kuis Menjodohkan: Konsep & Jenis Kritik Seni Rupa',
      instruction: 'Hubungkan istilah/konsep kritik seni di kolom kiri dengan pasangan penjelasan yang tepat di kolom kanan!',
      pairs: [
        {
          id: 'u2-m1',
          left: 'Kritik Jurnalistik',
          right: 'Penilaian karya seni untuk konsumsi pembaca umum di media massa (artikel, berita, majalah)',
          explanation: 'Kritik jurnalistik mengutamakan informasi yang cepat, akurat, dan komunikatif bagi masyarakat luas.'
        },
        {
          id: 'u2-m2',
          left: 'Kritik Pedagogik',
          right: 'Evaluasi dalam dunia pendidikan untuk meningkatkan mutu pembelajaran dan bakat estetis siswa',
          explanation: 'Kritik pedagogik bertujuan mendidik dan mematangkan rasa percaya diri peserta didik.'
        },
        {
          id: 'u2-m3',
          left: 'Analisis Formal',
          right: 'Menelusuri struktur formal, organisasi unsur visual (garis, warna, ruang), dan prinsip komposisi',
          explanation: 'Analisis formal membedah sintaks visual bagaimana karya seni dibangun secara teknis.'
        },
        {
          id: 'u2-m4',
          left: 'Fungsi Dua Mata Panah',
          right: 'Umpan balik bagi seniman merefleksi karya, sekaligus jembatan pemahaman estetik bagi publik',
          explanation: 'Kritik seni menjembatani komunikasi ekspresif antara pencipta dan penikmat seni.'
        },
        {
          id: 'u2-m5',
          left: 'Pendekatan Kontekstual',
          right: 'Menelaah karya berdasarkan keterkaitan tema dengan konteks sosial budaya (seperti lukisan Raden Saleh)',
          explanation: 'Konteks sejarah dan latar belakang sosial menjadi pisau bedah utama dalam pendekatan ini.'
        }
      ]
    },
    fill_blank_quiz: {
      title: 'Kuis Isian Rumpang: Materi Kritik Seni Rupa',
      instruction: 'Lengkapi bagian kalimat yang rumpang dengan istilah kritik seni yang tepat sesuai materi Canva!',
      questions: [
        {
          id: 1,
          sentence_before: 'Jenis kritik seni rupa yang diterapkan di lingkungan sekolah untuk mematangkan proses belajar siswa disebut kritik ',
          target_word: 'pedagogik',
          sentence_after: '.',
          hint: 'Kata 9 huruf berawalan "P" (bidang kependidikan)',
          acceptable_answers: ['pedagogik', 'pedagogis', 'kritik pedagogik'],
          explanation: 'Kritik pedagogik bersifat edukatif untuk mengembangkan bakat dan apresiasi siswa.'
        },
        {
          id: 2,
          sentence_before: 'Tahap kritik seni rupa yang bertujuan menafsirkan makna, tema, dan simbol di balik karya adalah tahap ',
          target_word: 'interpretasi',
          sentence_after: '.',
          hint: 'Dimulai dengan huruf "I" (penafsiran makna)',
          acceptable_answers: ['interpretasi', 'interpretation'],
          explanation: 'Interpretasi mengungkap pesan filosofis dan simbolisme yang dihadirkan seniman.'
        },
        {
          id: 3,
          sentence_before: 'Kapasitas mental manusia untuk menganalisis dan mempertimbangkan secara rasional dalam melakukan kritik disebut kemampuan ',
          target_word: 'reasoning',
          sentence_after: '.',
          hint: 'Kata bahasa Inggris berawalan "R" (penalaran/pertimbangan rasional)',
          acceptable_answers: ['reasoning', 'penalaran'],
          explanation: 'Kemampuan reasoning membuat manusia terdorong untuk menimbang dan mengevaluasi karya.'
        },
        {
          id: 4,
          sentence_before: 'Tahap pertama dalam kritik seni yang murni mencatat objek kasat mata apa adanya tanpa opini disebut tahap ',
          target_word: 'deskripsi',
          sentence_after: '.',
          hint: 'Dimulai dengan huruf "D" (mencatat fakta visual kasat mata)',
          acceptable_answers: ['deskripsi', 'description'],
          explanation: 'Deskripsi menginventarisasi data fisik karya tanpa penilaian subjektif.'
        }
      ]
    },
    game_data: {
      type: 'sort_feldman',
      title: 'Urutan Prosedur Baku Penulisan Kritik Seni Rupa',
      instruction: 'Susun kartu tahapan kritik berikut sesuai alur metodologis yang sistematis!',
      items: [
        { step: 1, name: 'Deskripsi', clue: 'Menemukan dan mencatat fakta visual serta data fisik karya apa adanya' },
        { step: 2, name: 'Analisis Formal', clue: 'Menelusuri struktur unsur rupa dan prinsip penataan komposisi' },
        { step: 3, name: 'Interpretasi', clue: 'Menafsirkan tema, simbol, dan makna filosofis di balik karya seni' },
        { step: 4, name: 'Evaluasi / Penilaian', clue: 'Menentukan mutu kualitas karya seni secara komparatif dan argumentatif' }
      ]
    }
  },
  {
    id: 'level-3',
    level: 3,
    judul: 'Berkarya Seni Rupa 3 Dimensi',
    deskripsi: 'Mempelajari konsep karya seni rupa tiga dimensi, urgensi & 5 langkah daur ulang limbah, identifikasi jenis bahan bekas, serta praktik penciptaan kriya fashion ramah lingkungan (pelepah pisang, daun pandan, dan tas kresek).',
    urutan: 3,
    tema: 'Unit 3: Berkarya Seni Rupa 3 Dimensi',
    tujuan_pembelajaran: [
      'Menumbuhkan sikap peduli lingkungan melalui apresiasi dan pemanfaatan limbah sekitar.',
      'Mengidentifikasi jenis-jenis bahan daur ulang (kertas/karton, botol/plastik, kaca, dan logam).',
      'Memahami konsep seni rupa tiga dimensi serta perpaduan nilai guna dan estetika kerajinan daur ulang.',
      'Membuat karya kerajinan kriya fashion 3 dimensi sederhana berbahan limbah alam atau buatan.'
    ],
    materi_teks: `
### Berkarya Seni Rupa Tiga Dimensi
> Sumber Belajar Digital Canva Site: https://literasi-smaneb.my.canva.site/berkaryasenirupatigadimensi (Seni Budaya Kelas XI Fase F)

#### 1. Kompetensi Pembelajaran
- Menumbuhkan sikap peduli lingkungan
- Mengidentifikasi jenis bahan daur ulang
- Membuat karya kerajinan sederhana
- Memahami kerajinan dari bahan daur ulang

---

#### 2. Pengertian Karya Seni Rupa Tiga Dimensi
Karya seni rupa tiga dimensi adalah karya seni yang memiliki volume dan dapat diraba dari berbagai sisi. Cirinya adalah adanya unsur ruang yang nyata (memiliki dimensi panjang, lebar, dan tinggi serta dapat dinikmati dari sudut pandang 360 derajat).

---

#### 3. Konsep Daur Ulang & Mengapa Daur Ulang Penting?
Daur ulang adalah proses mengubah barang bekas atau sampah menjadi barang baru yang berguna. Contohnya, kertas bekas dapat diolah kembali menjadi kertas baru, sedangkan botol plastik bisa didaur ulang menjadi berbagai macam barang lain yang juga akan bermanfaat.

Alasan mengapa daur ulang sampah itu diperlukan:
1. **Mengurangi adanya sampah** di lingkungan dan tempat pembuangan akhir.
2. **Menghemat sumber daya alam** serta energi produksi material baru.
3. **Berusaha melindungi lingkungan** dari polusi, kerusakan ekosistem, dan pemanasan global.

---

#### 4. Jenis-Jenis Bahan yang Bisa Didaur Ulang
Berikut jenis-jenis bahan yang bisa didaur ulang antara lain:
- **Koran, majalah, dan karton**: Bahan selulosa yang mudah dibubur, dipilin, dilipat, atau dianyam.
- **Botol, kantong, dan plastik**: Fleksibel, tahan air, dan dapat disetrika lapis (*fused plastic*) atau dirajut.
- **Botol minuman dan toples (kaca)**: Kuat, transparan, dan dapat dialihfungsikan menjadi wadah estetik.
- **Kaleng dan peralatan besi**: Kokoh dan memberikan aksen struktural atau industrial yang menarik.

---

#### 5. 5 Langkah Daur Ulang yang Sistematis
1. **Pengumpulan sampah**: Menghimpun barang atau limbah yang masih layak untuk diolah.
2. **Pemilahan sampah**: Memisahkan jenis sampah organik dan anorganik secara teliti.
3. **Pembersihan sampah**: Mencuci, merendam, dan mengeringkan agar higienis dan bebas bau.
4. **Pengolahan sampah**: Mengubah bentuk bahan (memotong, memilin, menyayat, atau memipihkan).
5. **Pembuatan produk baru**: Mengeksekusi desain karya kriya fungsional hingga tahapan *finishing*.

---

#### 6. Manfaat & Cara Membantu Proses Daur Ulang
- **Manfaat Daur Ulang**: Daur ulang membantu kita menjaga bumi tetap bersih dan sehat. Ketika kita mengumpulkan barang bekas seperti kertas, plastik, dan kaleng, barang-barang itu diubah menjadi barang baru, sehingga tidak banyak sampah yang berserakan di lingkungan serta agar lebih rapi dan bersih.
- **Cara Membantu**: Memilah sampah di rumah dengan memisahkan sampah organik dan non-organik, mengurangi penggunaan barang sekali pakai dengan memakai botol minum atau tas kain, serta mengajak teman dan keluarga untuk ikut mendaur ulang adalah langkah sederhana yang juga akan bermanfaat.
- **Fakta Menarik**:
  - Satu ton kertas bekas dapat menyelamatkan sekitar 17 pohon yang bermanfaat.
  - Mendaur ulang satu botol plastik dapat menghemat listrik untuk menyalakan lampu beberapa jam.
  - Banyak negara di dunia telah berhasil mengurangi sampah dengan menerapkan sistem daur ulang modern.

---

#### 7. Pengertian & Tujuan Kerajinan Daur Ulang
- **Pengertian Kerajinan Daur Ulang**: Karya seni atau barang kerajinan yang dibuat dari bahan bekas atau barang yang sudah tidak terpakai, kemudian diolah kembali menjadi benda baru yang memiliki nilai guna dan nilai estetika. Kerajinan ini bertujuan untuk mengurangi limbah, menjaga lingkungan, serta mengembangkan kreativitas dan keterampilan dalam memanfaatkan barang bekas menjadi sesuatu yang bermanfaat.
- **Tujuan Kerajinan Daur Ulang**: Memanfaatkan barang bekas agar dapat digunakan kembali sehingga mengurangi jumlah sampah di lingkungan. Selain itu, bertujuan untuk melatih kreativitas dan keterampilan, menumbuhkan sikap peduli terhadap lingkungan, serta menambah nilai guna dan nilai jual dari bahan yang sebelumnya tidak terpakai.

---

#### 8. Tugas Akhir Projek: Kriya Fashion Daur Ulang
Pada tugas akhir unit ini, kalian akan membuat sebuah kerajinan Kriya daur ulang menggunakan bahan limbah alam atau buatan (pilih salah satu):
1. **Pelepah Pisang**: Serat alam bertekstur eksotis, dikeringkan dan dianyam.
2. **Daun Pandan**: Serat lentur beraroma khas, disayat halus dan dianyam rapi.
3. **Tas Kresek**: Sampah plastik kantong belanja yang disetrika lapis (*fused plastic*) atau dipilin.

Dibuat menjadi karya kriya fashion fungsional seperti:
- **Tas Selempang (Sling Bag)**
- **Totebag atau Tas Jinjing**
- **Dompet Lipat / Kartu**
- **Pouch Serbaguna**

---

#### 9. Kesimpulan
Kerajinan daur ulang merupakan kegiatan mengolah barang bekas menjadi karya yang memiliki nilai guna dan nilai keindahan. Melalui kerajinan daur ulang, kita dapat mengurangi sampah, menjaga kelestarian lingkungan, serta melatih kreativitas dan keterampilan. Oleh karena itu, kerajinan daur ulang menjadi kegiatan yang bermanfaat, mudah dilakukan, dan penting untuk diterapkan dalam kehidupan sehari-hari, khususnya bagi siswa SMA.
    `,
    video_url: 'https://www.youtube-nocookie.com/embed/fT5_wRj4h2U',
    video_title: 'Berkarya Seni Rupa 3 Dimensi: Eksplorasi Kriya Daur Ulang Ramah Lingkungan',
    quiz_data: [
      {
        id: 1,
        question: 'Ciri utama yang membedakan karya seni rupa tiga dimensi dari dua dimensi adalah...',
        options: [
          'Memiliki volume dan dapat diraba dari berbagai sisi karena adanya ruang nyata',
          'Hanya dapat dinikmati dari satu arah depan saja',
          'Selalu menggunakan media cat minyak di atas kanvas',
          'Tidak memiliki ukuran ketebalan fisik'
        ],
        answerIndex: 0,
        explanation: 'Karya 3 dimensi memiliki panjang, lebar, tinggi, bervolume, dan menempati ruang nyata sehingga dapat diapresiasi dari 360 derajat.'
      },
      {
        id: 2,
        question: 'Manakah di bawah ini yang BUKAN merupakan alasan mengapa daur ulang sampah sangat diperlukan?',
        options: [
          'Mengurangi timbunan sampah di lingkungan',
          'Menghemat sumber daya alam dan energi',
          'Meningkatkan pencemaran air dan tanah',
          'Melindungi kelestarian lingkungan bumi'
        ],
        answerIndex: 2,
        explanation: 'Daur ulang bertujuan mengurangi pencemaran lingkungan, bukan meningkatkannya.'
      },
      {
        id: 3,
        question: 'Berdasarkan materi literasi Canva, mendaur ulang 1 ton kertas bekas diperkirakan dapat menyelamatkan sekitar...',
        options: ['5 pohon', '17 pohon', '50 pohon', '100 pohon'],
        answerIndex: 1,
        explanation: 'Fakta menarik dari modul menunjukkan bahwa 1 ton kertas bekas yang didaur ulang menyelamatkan sekitar 17 pohon produktif.'
      },
      {
        id: 4,
        question: 'Karya seni atau kerajinan yang dibuat dari barang bekas dan diolah kembali menjadi benda yang memiliki perpaduan nilai guna dan estetika disebut...',
        options: ['Seni Grafis', 'Kerajinan Daur Ulang', 'Seni Komersial', 'Lukisan Digital'],
        answerIndex: 1,
        explanation: 'Kerajinan daur ulang menggabungkan nilai fungsi (dapat dipakai) dan nilai keindahan estetis dari barang bekas.'
      },
      {
        id: 5,
        question: 'Pada tugas proyek kriya fashion Unit 3, bahan limbah yang disediakan sebagai opsi pilihan praktik siswa adalah...',
        options: [
          'Pelepah pisang, daun pandan, atau tas kresek',
          'Kaca patri, paku karatan, atau tembaga murni',
          'Batu marmer, semen cor, atau asbes',
          'Kayu jati gelondongan, lilin malam, atau kulit buaya'
        ],
        answerIndex: 0,
        explanation: 'Tugas akhir Unit 3 memberikan 3 pilihan bahan limbah: pelepah pisang, daun pandan, atau tas kresek.'
      }
    ],
    matching_quiz: {
      title: 'Kuis Menjodohkan: Berkarya Seni Rupa 3 Dimensi & Daur Ulang',
      instruction: 'Hubungkan istilah/konsep di kolom kiri dengan pasangan penjelasan yang tepat di kolom kanan!',
      pairs: [
        {
          id: 'u3-m1',
          left: 'Karya Rupa 3D',
          right: 'Karya seni yang memiliki volume, panjang, lebar, tinggi, dan ruang nyata yang dapat diraba',
          explanation: 'Karya 3 dimensi dapat dinikmati dari berbagai arah sudut pandang.'
        },
        {
          id: 'u3-m2',
          left: 'Pelepah Pisang',
          right: 'Limbah serat alam bertekstur kecokelatan yang dikeringkan dan dianyam menjadi tas/dompet etnik',
          explanation: 'Pelepah pisang memiliki serat kuat dan bernilai eksotis jika dipernis.'
        },
        {
          id: 'u3-m3',
          left: 'Tas Kresek (Plastik)',
          right: 'Limbah anorganik yang dapat disetrika lapis (fused plastic) menjadi bahan kriya fashion tahan air',
          explanation: 'Teknik fused plastic memanfaatkan limbah kantong kresek menjadi bahan lentur kedap air.'
        },
        {
          id: 'u3-m4',
          left: 'Daun Pandan',
          right: 'Bahan serat alami lentur yang disayat halus dan dianyam menjadi pouch atau dompet',
          explanation: 'Daun pandan sangat terkenal dalam kerajinan anyam kriya Nusantara.'
        },
        {
          id: 'u3-m5',
          left: '17 Pohon',
          right: 'Jumlah estimasi pohon yang dapat diselamatkan dari kegiatan mendaur ulang 1 ton kertas bekas',
          explanation: 'Menunjukkan dampak nyata efisiensi ekologis dari daur ulang kertas.'
        }
      ]
    },
    fill_blank_quiz: {
      title: 'Kuis Isian Rumpang: Materi Berkarya Seni Rupa 3 Dimensi',
      instruction: 'Ketik istilah atau kata yang tepat sesuai materi Canva pada bagian kalimat yang rumpang!',
      questions: [
        {
          id: 1,
          sentence_before: 'Karya seni rupa yang memiliki volume dan dapat diraba dari berbagai sisi karena adanya unsur ruang nyata disebut karya seni rupa ',
          target_word: 'tiga dimensi',
          sentence_after: '.',
          hint: 'Dua kata (tiga dimensi / 3 dimensi)',
          acceptable_answers: ['tiga dimensi', '3 dimensi', '3d'],
          explanation: 'Karya tiga dimensi menempati ruang nyata secara fisik.'
        },
        {
          id: 2,
          sentence_before: 'Proses mengubah barang bekas atau sampah menjadi barang baru yang bermanfaat disebut ',
          target_word: 'daur ulang',
          sentence_after: '.',
          hint: 'Dua kata berawalan "D" dan "U" (recycling)',
          acceptable_answers: ['daur ulang', 'recycle', 'daur-ulang'],
          explanation: 'Daur ulang memberi nilai guna baru pada barang yang sudah tidak terpakai.'
        },
        {
          id: 3,
          sentence_before: 'Mendaur ulang satu ton kertas bekas mampu menyelamatkan sekitar ',
          target_word: '17',
          sentence_after: ' pohon.',
          hint: 'Angka belasan (tujuh belas)',
          acceptable_answers: ['17', 'tujuh belas'],
          explanation: 'Satu ton kertas daur ulang menyelamatkan sekitar 17 pohon.'
        },
        {
          id: 4,
          sentence_before: 'Salah satu pilihan bahan limbah plastik tipis untuk kriya fashion tas selempang pada Unit 3 adalah tas ',
          target_word: 'kresek',
          sentence_after: '.',
          hint: 'Kata 6 huruf berawalan "K" (kantong plastik belanja)',
          acceptable_answers: ['kresek', 'plastik kresek', 'tas kresek'],
          explanation: 'Kantong kresek bekas dapat disetrika lapis menjadi lembaran kuat untuk dijahit.'
        }
      ]
    },
    game_data: {
      type: 'material_mixer',
      title: 'Studio Eksplorasi Bahan Daur Ulang 3 Dimensi',
      instruction: 'Padukan jenis limbah bahan dengan teknik pengolahan untuk menghasilkan produk kriya 3D bernilai tinggi!',
      items: [
        { name: 'Pelepah Pisang Kering + Teknik Anyam Silang', type: 'Kriya Serat Alam', result: 'Tas Jinjing Etnik Ramah Lingkungan' },
        { name: 'Kantong Kresek + Teknik Fused Plastic Setrika', type: 'Kriya Plastik Daur Ulang', result: 'Tas Selempang Waterproof Modis' },
        { name: 'Daun Pandan Kering + Pewarna Alami', type: 'Kriya Tradisional Modern', result: 'Pouch Kosmetik Beraroma Alami' },
        { name: 'Kardus Bekas + Pilinan Kertas Koran', type: 'Struktur Rangka 3D', result: 'Kotak Wadah Fungsional Kokoh' }
      ]
    }
  },
  {
    id: 'level-4',
    level: 4,
    judul: 'Membuat dan Mempresentasikan Karya Seni Rupa',
    deskripsi: 'Mempelajari hakikat dan fungsi pendidikan seni (tujuan berkreasi dan berekspresi, fungsi pemenuh kebutuhan berekspresi, berkreasi, dan berapresiasi), pengelompokan fungsi karya (Seni Murni, Seni Kriya, Seni Desain: Arsitektur, Grafis, Industri, Interior), klasifikasi wujud dimensi (Dwimatra & Trimatra), periodisasi zaman (Pramodern: Primitivisme, Naturalisme, Realisme, Dekorativisme; Modern: Seni Pop, Seni Optik, Seni Konseptual, Seni Kontemporer; Postmodern), serta langkah-langkah aspek konseptual penciptaan karya (Penemuan Sumber Inspirasi Realitas Internal/Eksternal, Penetapan Interes Seni Pragmatis/Reflektif/Estetis, dan Penetapan Interes Bentuk Figuratif/Semifiguratif/Nonfiguratif) berdasarkan modul literasi Canva SMANEB.',
    urutan: 4,
    tema: 'Unit 4: Membuat dan Mempresentasikan Karya Seni Rupa',
    tujuan_pembelajaran: [
      'Memahami hakikat pendidikan seni, tujuan utama (berkreasi dan berekspresi), serta fungsinya sebagai pemenuh kebutuhan berekspresi, berkreasi, dan berapresiasi.',
      'Mengklasifikasikan karya seni rupa berdasarkan fungsinya (Seni Murni, Seni Kriya, dan Seni Desain: Arsitektur, Grafis, Industri, Interior) serta dimensinya (Dwimatra dan Trimatra).',
      'Menganalisis periodisasi seni rupa berdasarkan zamannya: Seni Rupa Pramodern (Primitivisme, Naturalisme, Realisme, Dekorativisme), Seni Rupa Modern (Seni Pop, Seni Optik, Seni Konseptual, Seni Kontemporer), dan Seni Rupa Postmodern.',
      'Merumuskan aspek konseptual penciptaan karya: menemukan sumber inspirasi (Realitas Internal vs Realitas Eksternal), menetapkan interes seni (Pragmatis, Reflektif, Estetis), dan memilih interes bentuk (Figuratif, Semifiguratif, Nonfiguratif).',
      'Membuat dan mempresentasikan karya seni rupa secara terstruktur dengan memadukan gagasan konseptual dan wujud artistik.'
    ],
    materi_teks: `
### 1. Hakikat, Tujuan, dan Fungsi Pendidikan Seni
**Pendidikan seni** adalah segala usaha untuk meningkatkan kemampuan kreatif dan ekspresif anak didik dalam mewujudkan kegiatan artistiknya berdasarkan aturan-aturan estetika tertentu.
- **Tujuan Pendidikan Seni**:
  1. *Kegiatan Berkreasi*: Menghasilkan wujud fisik karya baru melalui eksplorasi medium dan keterampilan artistik.
  2. *Kegiatan Berekspresi*: Mencurahkan luapan batin, perasaan, dan gagasan personal ke dalam bentuk rupa.
- **Fungsi Pendidikan Seni**:
  1. *Pemenuh Kebutuhan Berekspresi*: Menjadi saluran katarsis emosi dan komunikasi visual subjektif.
  2. *Pemenuh Kebutuhan Berkreasi*: Merangsang daya cipta, inovasi, dan kepekaan rasa estetis.
  3. *Pemenuh Kebutuhan Berapresiasi*: Mengasah kepekaan indera dalam menghayati dan menilai keindahan karya ciptaan orang lain.

---

### 2. Berkarya Seni Rupa & Pengelompokan Berdasarkan Fungsi
**Berkarya seni rupa** adalah merealisasikan konsep seni dengan mengekspresikannya ke dalam karya seni fisik. Berdasarkan fungsinya, seni rupa terbagi menjadi tiga rumpun:
1. **Seni Rupa Murni (*Fine Art*)**: Seni yang tercipta bebas tanpa mempertimbangkan segi fungsi dan kegunaannya sehari-hari, melainkan lebih mengutamakan fungsi keindahan (estetika murni). *Contoh*: Seni Lukis, Seni Kaligrafi, Seni Patung.
2. **Seni Kriya (*Craft*)**: Cabang seni rupa terapan yang menekankan pada keterampilan tangan yang tinggi (*handcraftmanship*) dalam proses pengerjaannya. *Contoh*: Kriya Tekstil (batik/tenun), Kriya Kayu (ukir/pahat), Kriya Keramik.
3. **Seni Desain**: Pola rancangan yang menjadi dasar pembuatan suatu benda fungsional:
   - *Desain Arsitektur*: Desain yang terkonsentrasi terhadap perancangan bangunan fisik seperti rumah hunian dan fasilitas publik.
   - *Desain Grafis (DKV)*: Bentuk komunikasi visual yang digunakan untuk menyampaikan pesan atau informasi secara selektif dan efektif menggunakan media gambar serta teks.
   - *Desain Industri (Produk)*: Suatu kreasi tentang bentuk, konfigurasi garis atau warna yang memberikan kesan estetis pada produk massal manufaktur.
   - *Desain Interior*: Cabang seni rupa yang fokus pada perancangan dan penataan ruang dalam bangunan demi kenyamanan dan keindahan.

---

### 3. Klasifikasi Berdasarkan Wujud Dimensi
Berdasarkan wujud atau dimensinya, karya seni rupa dibagi menjadi dua kelompok:
- **Karya Seni Dua Dimensi (Dwimatra)**: Hanya memiliki ukuran panjang dan lebar pada bidang datar. Hanya dapat dinikmati dari satu arah pandang (depan). *Contoh*: lukisan cat minyak, gambar ilustrasi, karya cetak grafis, poster.
- **Karya Seni Tiga Dimensi (Trimatra)**: Memiliki ukuran panjang, lebar, dan tinggi serta menempati ruang nyata bervolume. Dapat dinikmati dan diraba dari berbagai arah 360 derajat. *Contoh*: patung, instalasi ruang, kriya keramik gerabah, anyaman 3D.

---

### 4. Periodisasi Seni Rupa Berdasarkan Perkembangan Zaman
Perkembangan corak seni rupa dibagi ke dalam tiga era utama:
1. **Seni Rupa Pramodern (Dihasilkan Sebelum Zaman Modern)**:
   - *Primitivisme*: Aliran seni yang dilakukan oleh seorang seniman berdasarkan pada sebuah objektivitas yang diinginkan (kesederhanaan bentuk magis purba).
   - *Naturalisme*: Corak seni rupa yang berusaha melukiskan suatu objek sesuai dengan keindahan alamiah secara visual presisi.
   - *Realisme*: Aliran yang memandang dunia sebagai sesuatu yang nyata apa adanya tanpa didramatisir (realitas kehidupan sosial masyarakat).
   - *Dekorativisme*: Seni rupa yang berusaha menyederhanakan bentuk-bentuk alam dengan cara mengadakan distorsi atau stilisasi demi tujuan hiasan/ornamen.
2. **Seni Rupa Modern (Eksplorasi Ide & Sains)**:
   - *Seni Pop (Pop Art)*: Menampilkan suasana sindiran, karikatur, humor, budaya konsumsi massa, dan apa adanya, sering menggunakan media campuran (*mixed media*).
   - *Seni Optik (Op Art)*: Didasari penemuan ilmu fisika dan anatomi optik mata manusia. Berupa susunan gelombang berulang-ulang yang mengeksploitasi kelemahan mata dengan ilusi ruang dan gerak semu.
   - *Seni Konseptual*: Gagasan atau ide lebih penting daripada objek fisiknya, menerapkan semiotika, feminisme, dan budaya populer.
   - *Seni Kontemporer*: Seni masa kini yang tidak terikat batas ruang dan waktu, tidak berpatokan pada periodisasi masa lampau.
3. **Seni Rupa Postmodern**:
   - Gaya seni rupa perpaduan antara penyederhanaan bentuk dan sedikit ornamental.
   - *Ciri-Ciri Utama*: Objek karyanya mengutamakan kebebasan berekspresi, dinamis, eklektik, dan tidak terikat aturan baku modernisme.

---

### 5. Langkah-Langkah Aspek Konseptual Penciptaan Karya
Aspek konseptual merupakan konsep awal dari sebuah penciptaan sebelum dilakukan aktivitas berkarya fisik di studio:
1. **Penemuan Sumber Inspirasi (Gagasan)**:
   - *Realitas Internal*: Perambatan kehidupan spiritual kita sendiri (perasaan batin, harapan, cita-cita, renungan eksistensi diri).
   - *Realitas Eksternal*: Hubungan pribadi manusia dengan Tuhan, hubungan manusia dengan masyarakat sesama, dan interaksi manusia dengan alam sekitar.
2. **Penetapan Interes Seni**:
   - *Interes Pragmatis*: Menempatkan seni sebagai instrumen pencapaian tujuan praktis tertentu (pendidikan, moral, dakwah, sosial).
   - *Interes Reflektif*: Menempatkan seni sebagai pencerminan realitas aktual kehidupan nyata dan dunia khayali/imajinatif seniman.
   - *Interes Estetis*: Berupaya melepaskan seni dari nilai-nilai pragmatis dan reflektif demi mengejar kemurnian keindahan semata.
3. **Penetapan Interes Bentuk**:
   - *Bentuk Figuratif*: Meniru atau merepresentasikan wujud nyata di alam (sosok manusia, hewan, tumbuhan, pemandangan).
   - *Bentuk Semifiguratif*: Bentuk nyata yang telah mengalami stilisasi, deformasi, atau distorsi artistik namun masih dapat dikenali figur asalnya.
   - *Bentuk Nonfiguratif (Abstrak)*: Susunan murni elemen rupa (garis, bidang, warna, tekstur) tanpa meniru bentuk kasat mata di alam.
    `,
    video_url: 'https://www.youtube-nocookie.com/embed/PjE3W2t4m_k',
    video_title: 'Membuat Karya Seni Rupa: Klasifikasi Fungsi, Periodisasi Zaman, & Aspek Konseptual',
    quiz_data: [
      {
        id: 1,
        question: 'Berdasarkan materi modul pendidikan seni, tujuan pendidikan seni meliputi dua kegiatan utama, yaitu...',
        options: [
          'Kegiatan berbelanja dan menimbun bahan seni',
          'Kegiatan berkreasi dan kegiatan berekspresi',
          'Kegiatan mencetak poster dan menyalin karya orang lain',
          'Kegiatan mengarsip buku pelajaran'
        ],
        answerIndex: 1,
        explanation: 'Tujuan pendidikan seni meliputi kegiatan berkreasi (mencipta wujud fisik baru) dan berekspresi (mencurahkan isi batin).'
      },
      {
        id: 2,
        question: 'Karya seni rupa yang tercipta bebas tanpa mempertimbangkan fungsi kegunaan praktis sehari-hari, melainkan semata-mata mengutamakan nilai keindahan estetis disebut...',
        options: [
          'Seni Kriya Tekstil',
          'Seni Rupa Murni (Fine Art)',
          'Seni Desain Industri',
          'Seni Desain Arsitektur'
        ],
        answerIndex: 1,
        explanation: 'Seni rupa murni lebih mengutamakan fungsi estetika murni tanpa terikat fungsi guna praktis (contoh: lukisan dan patung murni).'
      },
      {
        id: 3,
        question: 'Cabang seni desain yang fokus pada komunikasi visual untuk menyampaikan pesan atau informasi secara selektif dan efektif menggunakan media gambar serta teks adalah...',
        options: [
          'Desain Interior',
          'Desain Grafis (Desain Komunikasi Visual)',
          'Desain Arsitektur Bangunan',
          'Desain Busana Anak'
        ],
        answerIndex: 1,
        explanation: 'Desain grafis atau DKV berfungsi mengomunikasikan pesan dan informasi selektif melalui elemen visual gambar dan tipografi.'
      },
      {
        id: 4,
        question: 'Aliran seni rupa modern yang didasari penelitian ilmu fisika dan anatomi mata, berupa susunan garis gelombang berulang yang mengeksploitasi ilusi gerak optik adalah...',
        options: [
          'Seni Pop (Pop Art)',
          'Seni Optik (Op Art)',
          'Primitivisme',
          'Realisme Sosialis'
        ],
        answerIndex: 1,
        explanation: 'Seni optik memanfaatkan kelemahan penglihatan mata manusia dengan susunan garis gelombang repetitif sehingga memunculkan ilusi gerak.'
      },
      {
        id: 5,
        question: 'Dalam aspek konseptual berkarya seni, sikap seniman yang menempatkan karyanya sebagai instrumen untuk mencapai tujuan tertentu (pendidikan, dakwah, atau pesan moral) disebut...',
        options: [
          'Interes Estetis',
          'Interes Pragmatis',
          'Interes Reflektif',
          'Interes Nonfiguratif'
        ],
        answerIndex: 1,
        explanation: 'Interes pragmatis menempatkan karya seni sebagai instrumen/alat untuk mencapai tujuan praktis tertentu di luar seni itu sendiri.'
      }
    ],
    matching_quiz: {
      title: 'Kuis Menjodohkan: Klasifikasi & Aspek Konseptual Seni Rupa',
      instruction: 'Jodohkan istilah seni rupa di kolom kiri dengan definisinya di kolom kanan sesuai modul Canva SMANEB!',
      pairs: [
        {
          id: 'u4-m1',
          left: 'Seni Rupa Murni',
          right: 'Seni yang tercipta bebas tanpa mempertimbangkan fungsi pakai dan lebih mengutamakan fungsi keindahan estetis',
          explanation: 'Seni rupa murni berfokus murni pada nilai ekspresi dan keindahan rupa.'
        },
        {
          id: 'u4-m2',
          left: 'Seni Kriya',
          right: 'Cabang seni rupa terapan yang menekankan pada keterampilan tangan yang tinggi dalam proses pembuatannya',
          explanation: 'Kriya menuntut keahlian tangan (handcrafted) yang tinggi seperti batik, ukir, dan keramik.'
        },
        {
          id: 'u4-m3',
          left: 'Seni Optik (Op Art)',
          right: 'Karya modern berbasis ilmu fisika dan anatomi mata berupa susunan gelombang berulang pengeksploitasi ilusi gerak',
          explanation: 'Seni optik menciptakan tipuan optik dan ilusi gerak semu pada retina mata.'
        },
        {
          id: 'u4-m4',
          left: 'Realitas Internal',
          right: 'Sumber inspirasi penciptaan seni yang bersumber dari perambatan kehidupan spiritual dan batin diri sendiri',
          explanation: 'Realitas internal menggali emosi, harapan, dan renungan jiwa seniman.'
        },
        {
          id: 'u4-m5',
          left: 'Interes Reflektif',
          right: 'Penetapan interes yang menempatkan karya seni sebagai pencerminan realitas aktual dan dunia khayali',
          explanation: 'Interes reflektif merefleksikan potret kenyataan hidup maupun imajinasi seniman.'
        }
      ]
    },
    fill_blank_quiz: {
      title: 'Kuis Isian Rumpang: Konsep Membuat Karya Seni Rupa',
      instruction: 'Lengkapi bagian rumpang kalimat berikut dengan istilah yang tepat sesuai modul Canva!',
      questions: [
        {
          id: 1,
          sentence_before: 'Segala usaha untuk meningkatkan kemampuan kreatif dan ekspresif anak didik dalam mewujudkan kegiatan artistik berdasarkan aturan estetika disebut pendidikan ',
          target_word: 'seni',
          sentence_after: '.',
          hint: 'Kata kunci: 4 huruf, berawalan huruf "s"',
          acceptable_answers: ['seni', 'pendidikan seni'],
          explanation: 'Pendidikan seni membina daya kreasi, ekspresi, dan apresiasi peserta didik.'
        },
        {
          id: 2,
          sentence_before: 'Cabang seni rupa terapan yang sangat mengutamakan keterampilan tangan yang tinggi dalam proses pengerjaannya disebut seni ',
          target_word: 'kriya',
          sentence_after: '.',
          hint: 'Kata kunci: 5 huruf, berawalan huruf "k" (kerajinan tangan)',
          acceptable_answers: ['kriya', 'seni kriya', 'craft'],
          explanation: 'Kriya bertumpu pada kemahiran tangan (handicraft) pengrajin.'
        },
        {
          id: 3,
          sentence_before: 'Aliran seni modern yang menampilkan suasana sindiran, karikatur, humor, dan budaya konsumsi massa masyarakat disebut seni ',
          target_word: 'pop',
          sentence_after: '.',
          hint: 'Kata kunci: 3 huruf (pop art)',
          acceptable_answers: ['pop', 'pop art', 'seni pop'],
          explanation: 'Pop art mengangkat ikon budaya massa dan sindiran humoris.'
        },
        {
          id: 4,
          sentence_before: 'Penetapan interes bentuk yang sama sekali tidak meniru wujud alamiah kasat mata melainkan susunan murni garis, bidang, dan warna disebut bentuk ',
          target_word: 'nonfiguratif',
          sentence_after: '.',
          hint: 'Lawan dari bentuk figuratif (bentuk abstrak murni)',
          acceptable_answers: ['nonfiguratif', 'non figuratif', 'abstrak'],
          explanation: 'Bentuk nonfiguratif membebaskan unsur visual dari peniruan rupa alamiah.'
        }
      ]
    },
    game_data: {
      type: 'match_style',
      title: 'Tebak Karakteristik Corak Seni Rupa Perkembangan Zaman',
      instruction: 'Cocokkan nama aliran seni modern dengan ciri khas visualnya!',
      items: [
        { id: 'm1', style: 'Seni Pop (Pop Art)', characteristic: 'Sindiran, karikatur, humor, dan budaya konsumsi populer dengan media campuran' },
        { id: 'm2', style: 'Seni Optik (Op Art)', characteristic: 'Eksploitasi ilusi ruang dan gerak semu pada mata lewat susunan gelombang berulang' },
        { id: 'm3', style: 'Seni Konseptual', characteristic: 'Menempatkan ide/konsep di atas wujud fisik, menerapkan semiotika & budaya' },
        { id: 'm4', style: 'Seni Postmodern', characteristic: 'Perpaduan penyederhanaan & ornamental, kebebasan ekspresi tanpa aturan kaku' }
      ]
    }
  },
  {
    id: 'level-5',
    level: 5,
    judul: 'Merancang Desain Produk Kriya Industri',
    deskripsi: 'Merancang desain produk kriya industri dan identitas visual (logo branding) yang memadukan kreativitas estetika dengan fungsi pakai, berorientasi pada penciptaan karya seni kriya berdampak bagi lingkungan sekitar (eco-friendly craft & upcycling material berkelanjutan sebagaimana di Unit 1). Mempelajari hakikat desain logo produk kriya, fungsi dan perannya dalam membangun citra merek ramah lingkungan (green branding), komponen visual (tipografi, bentuk, warna, ilustrasi), jenis-jenis logo, tahapan proses perancangan (identitas brand, riset kompetitor, sketsa, moodboard, brainstorming, digitalisasi dengan Canva/Illustrator/AI generator), penyusunan Desain Brief terstruktur, serta pembuatan video promosi produk kriya yang dinamis dan persuasif.',
    urutan: 5,
    tema: 'Unit 5: Merancang Desain Produk Kriya Industri',
    tujuan_pembelajaran: [
      'Memahami hakikat, fungsi, dan kriteria desain logo produk kriya industri sebagai alat komunikasi visual dan identitas merek yang unik serta terpercaya.',
      'Mengidentifikasi komponen dasar logo (tipografi, bentuk, warna, ilustrasi) dan mengklasifikasikan jenis-jenis logo (wordmark, monogram, simbol, abstrak, maskot, emblem, kombinasi).',
      'Menerapkan langkah-langkah sistematis pembuatan logo kriya (identitas brand, riset kompetitor, sketsa ide, pemilihan elemen desain, eksekusi digital via Canva/Illustrator/AI generator, dan ekspor resolusi tinggi).',
      'Merumuskan konsep desain produk kriya industri berwawasan ramah lingkungan (selaras Unit 1) melalui metode sketsa, mood board, brainstorming, dan penyusunan Desain Brief.',
      'Merancang strategi promosi visual produk kriya melalui video produk dinamis dengan memperhatikan penetapan tujuan, naskah/storyboard, dan tata pencahayaan yang memikat.'
    ],
    materi_teks: `
### 1. Hakikat Desain Logo Produk Kriya Industri & Sinergi Seni Berdampak Lingkungan
**Desain logo produk kriya industri** adalah proses kreatif pembuatan simbol, tanda, atau ikon visual yang secara eksklusif mewakili identitas, nilai, dan tujuan suatu perusahaan, produk, atau organisasi.
- **Perpaduan Kreativitas dan Fungsi**: Menggabungkan unsur keindahan artistik kriya tangan (*craftmanship*) dengan nilai fungsional produk pakai yang diproduksi secara terstandar.
- **Peran Krusial Pemasaran**: Membantu meningkatkan pengenalan merek (*brand recognition*) dan membangun kepercayaan konsumen (*consumer trust*).
- **Sinergi dengan Unit 1 (Seni Berdampak Lingkungan)**: Produk kriya industri dirancang dengan memanfaatkan material ramah lingkungan dan limbah daur ulang sekitar (*upcycling craft*) seperti kayu palet, anyaman bambu, serat alam, kain perca, dan kaleng/botol bekas, yang dikemas dengan identitas merek profesional (*green branding*).

---

### 2. Fungsi Utama, Komponen Dasar, Jenis & Kriteria Logo
- **Fungsi Utama**: Logo berfungsi sebagai alat komunikasi visual yang kuat untuk menyampaikan pesan merek secara instan kepada konsumen tanpa kata-kata.
- **Komponen Dasar**: Terdiri dari kombinasi elemen visual seperti teks (tipografi), bentuk (*shape*), warna (*color*), dan ilustrasi yang dirancang sedemikian rupa.
- **7 Jenis Logo dalam Industri**:
  1. *Wordmark (Logotype)*: Berbasis teks nama merek lengkap dengan perlakuan tipografi khas (contoh: Google, Sony).
  2. *Monogram (Lettermark)*: Berbasis inisial huruf nama brand, ringkas dan berkesan eksklusif (contoh: LV, NASA, HP).
  3. *Simbol / Ikon*: Menggunakan gambar objek visual yang mewakili produk atau filosofi merek (contoh: Apple, Twitter).
  4. *Abstrak*: Bentuk geometris/organis konseptual unik yang mengekspresikan dinamika inovasi (contoh: Nike, Adidas).
  5. *Maskot / Karakter*: Menggunakan ilustrasi karakter tokoh atau hewan ekspresif (contoh: KFC, Michelin).
  6. *Emblem*: Teks dan gambar menyatu di dalam bingkai lencana, perisai, atau stempel klasik (contoh: Starbucks, Harley-Davidson).
  7. *Kombinasi*: Memadukan teks nama merek dan simbol ikon secara harmonis berdampingan atau bertumpuk (paling fleksibel untuk kriya industri).
- **4 Kriteria Logo yang Baik & Efektif**:
  1. *Sederhana (Simple)*: Tidak rumit dan mudah dicerna mata dalam sekejap.
  2. *Mudah Diingat (Memorable)*: Memiliki ciri khas unik yang menempel kuat di ingatan audiens.
  3. *Tahan Lama (Timeless)*: Tidak cepat usang oleh pergantian tren musiman.
  4. *Serbaguna (Versatile)*: Fleksibel diaplikasikan di berbagai media (cetak label, sablon kemasan, bordir, website, media sosial).

---

### 3. Panduan Langkah demi Langkah & Alat Desain Digital
Berikut langkah sistematis pembuatan logo produk kriya industri:
1. **Tentukan Identitas Brand**: Pahami persona brand, visi, nilai ramah lingkungan, dan target audiens untuk menentukan gaya logo.
2. **Riset dan Cari Inspirasi**: Lihat logo kompetitor dan tren pasar untuk memastikan desain unik dan menonjol.
3. **Sketsa Ide**: Gambar ide-ide dasar di atas kertas untuk memvisualisasikan konsep awal secara cepat.
4. **Pilih Elemen Desain**: Pilih warna yang membangkitkan emosi yang tepat (psikologi warna) dan jenis huruf (font) yang mudah dibaca.
5. **Buat Desain Digital**: Eksekusi menggunakan perangkat lunak grafis:
   - *Canva & Adobe Express*: Mudah untuk pemula dengan pustaka template melimpah.
   - *Adobe Illustrator & CorelDraw*: Untuk pembuatan grafis vektor profesional dan mendetail.
   - *AI Logo Generator*: Looka, Wix Logo Maker, atau Logopony untuk eksplorasi instan.
6. **Sempurnakan dan Ekspor**: Uji logo pada mockup berbagai media (cetak/digital) dan simpan dalam format resolusi tinggi (*PNG transparan / SVG vektor*).

---

### 4. Konsep, Ideasi & Penyusunan Desain Brief
- **Sketsa**: Langkah awal penting untuk merumuskan ide visual secara langsung, spontan, dan cepat.
- **Mood Board**: Mengumpulkan inspirasi warna, tekstur bahan kriya, tipografi, dan gaya visual yang relevan.
- **Brainstorming**: Berpikir bebas bersama tim untuk melahirkan variasi ide kreatif yang dapat dieksplorasi lebih lanjut.
- **Desain Brief**: Dokumen panduan tertulis resmi yang merangkum tujuan proyek, profil produk kriya ramah lingkungan, target pasar, batasan bahan/teknik, dan spesifikasi hasil akhir desain.

---

### 5. Visualisasi Promosi Melalui Video Produk Kriya
- **Mengapa Video Produk Penting?**
  1. *Menarik Perhatian*: Menampilkan produk secara dinamis dan bergerak sehingga lebih memikat dan mudah diingat.
  2. *Menjelaskan Keunggulan*: Memperlihatkan fitur pakai, detail keindahan tekstur kriya buatan tangan, dan nilai guna yang sulit tersampaikan lewat foto diam.
- **3 Langkah Utama Membuat Video Produk**:
  1. *Tujuan*: Tentukan tujuan video untuk menarik perhatian dan menjelaskan produk secara efektif kepada audiens yang tepat.
  2. *Naskah & Storyboard*: Siapkan naskah narasi dan papan cerita (*storyboard*) singkat agar alur video terstruktur jelas dan proses shooting efisien.
  3. *Pencahayaan (Lighting)*: Gunakan pencahayaan yang baik untuk menonjolkan tekstur produk, menciptakan suasana estetik dan profesional.
    `,
    video_url: 'https://www.youtube-nocookie.com/embed/PjE3W2t4m_k',
    video_title: 'Merancang Desain Produk Kriya Industri: Logo Branding, Desain Brief & Video Produk',
    quiz_data: [
      {
        id: 1,
        question: 'Pengertian desain logo produk kriya industri yang paling tepat berdasarkan modul literasi Canva SMANEB adalah...',
        options: [
          'Gambar foto pemandangan alam untuk dipajang di dinding kamar',
          'Proses kreatif pembuatan simbol atau tanda visual yang secara eksklusif mewakili identitas, nilai, dan tujuan suatu produk atau jenama',
          'Daftar belanjaan bahan mentah kayu dan paku di toko bangunan',
          'Kumpulan nota penjualan barang kerajinan tangan'
        ],
        answerIndex: 1,
        explanation: 'Desain logo menggabungkan bentuk, warna, dan tipografi untuk mewakili identitas eksklusif produk kriya industri.'
      },
      {
        id: 2,
        question: 'Jenis logo yang memadukan elemen teks nama merek dengan simbol atau ikon visual secara berdampingan atau bertumpuk disebut...',
        options: [
          'Logo Monogram (Lettermark)',
          'Logo Kombinasi (Combination Mark)',
          'Logo Wordmark murni',
          'Logo Abstrak tanpa teks'
        ],
        answerIndex: 1,
        explanation: 'Logo kombinasi menggabungkan teks (nama merek) dan simbol grafis secara terpadu dan fleksibel.'
      },
      {
        id: 3,
        question: 'Empat kriteria utama dari sebuah desain logo yang baik dan efektif adalah...',
        options: [
          'Sangat rumit, berwarna-warni mencolok, mahal, dan besar',
          'Sederhana (simple), mudah diingat (memorable), tahan lama (timeless), dan serbaguna (versatile)',
          'Selalu berubah setiap minggu, sulit dibaca, dan tidak boleh dicetak',
          'Meniru logo kompetitor sebesar 90 persen'
        ],
        answerIndex: 1,
        explanation: 'Logo efektif wajib sederhana, mudah diingat, tak lekang waktu (timeless), dan serbaguna di aneka media cetak/digital.'
      },
      {
        id: 4,
        question: 'Dokumen acuan tertulis yang disusun desainer untuk memuat gambaran menyeluruh, profil produk, target audiens, dan tujuan desain disebut...',
        options: [
          'Nota Bon Penjualan',
          'Desain Brief (Design Brief)',
          'Ijazah Kelulusan',
          'Buku Tamu Pengunjung'
        ],
        answerIndex: 1,
        explanation: 'Desain Brief adalah panduan terstruktur perancangan yang memuat profil, target pasar, batasan, dan deliverables proyek desain.'
      },
      {
        id: 5,
        question: 'Dalam mempromosikan produk kriya industri, mengapa media video produk sangat penting dibanding gambar foto diam?',
        options: [
          'Karena video menghabiskan banyak kuota internet pembuatnya',
          'Dapat menampilkan produk secara dinamis, menarik perhatian calon pembeli, dan memperlihatkan keunggulan fitur/tekstur secara visual',
          'Agar produk aslinya tidak perlu dibuat sama sekali',
          'Karena video hanya boleh ditonton pada malam hari'
        ],
        answerIndex: 1,
        explanation: 'Video mampu menyajikan fitur pakai, tekstur material kriya, dan keindahan produk secara dinamis dan persuasif.'
      }
    ],
    matching_quiz: {
      title: 'Kuis Menjodohkan: Istilah Desain Produk Kriya Industri & Logo',
      instruction: 'Jodohkan istilah perancangan desain di kolom kiri dengan definisinya di kolom kanan!',
      pairs: [
        {
          id: 'u5-m1',
          left: 'Wordmark (Logotype)',
          right: 'Jenis logo berbasis teks nama merek lengkap dengan perlakuan gaya tipografi yang khas dan mudah dibaca',
          explanation: 'Wordmark mengandalkan kekuatan keterbacaan teks dan tipografi unik nama merek.'
        },
        {
          id: 'u5-m2',
          left: 'Monogram (Lettermark)',
          right: 'Jenis logo berbasis inisial huruf dari brand kriya, berkesan ringkas, minimalis, dan eksklusif',
          explanation: 'Monogram menggunakan singkatan huruf nama merek seperti LV atau NASA.'
        },
        {
          id: 'u5-m3',
          left: 'Mood Board',
          right: 'Kumpulan kolase visual berupa elemen warna, tekstur bahan, dan gaya desain untuk merumuskan konsep produk',
          explanation: 'Mood board mengonsepkan inspirasi visual sebelum eksekusi digital dilakukan.'
        },
        {
          id: 'u5-m4',
          left: 'Desain Brief',
          right: 'Dokumen panduan tertulis yang memuat gambaran menyeluruh, tujuan proyek, target audiens, dan spesifikasi desain',
          explanation: 'Desain brief menjadi peta arah kerja perancangan produk kriya.'
        },
        {
          id: 'u5-m5',
          left: 'Storyboard Video',
          right: 'Rangkaian gambar sketsa adegan berurutan yang memandu alur pengambilan gambar video promosi produk',
          explanation: 'Storyboard menyusun alur visual dan adegan video agar terstruktur dan efisien.'
        }
      ]
    },
    fill_blank_quiz: {
      title: 'Kuis Isian Rumpang: Konsep Desain Produk Kriya Industri',
      instruction: 'Lengkapi pernyataan rumpang berikut dengan istilah yang tepat sesuai modul Canva SMANEB!',
      questions: [
        {
          id: 1,
          sentence_before: 'Logo berfungsi sebagai alat komunikasi visual yang kuat untuk menyampaikan pesan merek secara instan kepada konsumen tanpa ',
          target_word: 'kata-kata',
          sentence_after: '.',
          hint: 'Kata kunci: pesan tersampaikan tanpa bicara/tulisan panjang',
          acceptable_answers: ['kata-kata', 'kata kata', 'kata', 'suara'],
          explanation: 'Logo berbicara secara instan melalui bahasa rupa simbolis.'
        },
        {
          id: 2,
          sentence_before: 'Kombinasi elemen visual dasar penyusun sebuah logo terdiri atas teks (tipografi), bentuk, ilustrasi, dan ',
          target_word: 'warna',
          sentence_after: '.',
          hint: 'Elemen rupa berawalan huruf "w" (psikologi rona visual)',
          acceptable_answers: ['warna', 'unsur warna', 'color'],
          explanation: 'Warna membangkitkan respon emosional dan citra brand di benak konsumen.'
        },
        {
          id: 3,
          sentence_before: 'Mengumpulkan inspirasi gaya visual, tekstur bahan kriya, dan palet warna sebelum mendesain dilakukan melalui papan ',
          target_word: 'mood board',
          sentence_after: '.',
          hint: 'Istilah bahasa Inggris: mood...',
          acceptable_answers: ['mood board', 'moodboard'],
          explanation: 'Mood board mengarahkan desainer menyatukan inspirasi visual proyek kriya.'
        },
        {
          id: 4,
          sentence_before: 'Untuk memudahkan dan memandu seluruh tahapan proses pembuatan desain produk kriya industri, desainer menyusun desain ',
          target_word: 'brief',
          sentence_after: '.',
          hint: 'Kata berawalan huruf "b" (dokumen ringkasan instruksi desain)',
          acceptable_answers: ['brief', 'desain brief', 'design brief'],
          explanation: 'Desain brief memuat rangkuman tujuan, audiens, dan batasan teknis desain.'
        }
      ]
    },
    game_data: {
      type: 'match_style',
      title: 'Cocokkan Jenis Logo Produk Kriya Industri',
      instruction: 'Pasangkan jenis logo dengan karakteristik visual dan contoh representatifnya!',
      items: [
        { id: 'm1', style: 'Wordmark (Logotype)', characteristic: 'Berbasis teks nama brand lengkap dengan tipografi unik (contoh: Sony, Google)' },
        { id: 'm2', style: 'Monogram (Lettermark)', characteristic: 'Berupa inisial huruf nama merek, ringkas dan elegan (contoh: LV, NASA, HP)' },
        { id: 'm3', style: 'Emblem (Lambang)', characteristic: 'Teks dan ikon terbingkai dalam lencana/stempel klasik (contoh: Starbucks, Harley)' },
        { id: 'm4', style: 'Kombinasi', characteristic: 'Perpaduan fleksibel teks nama brand dan ikon simbol (contoh: Kriya SMANEB, Adidas)' }
      ]
    }
  }
];

export const INITIAL_QUESTIONS: LkpdQuestion[] = [
  // Unit 1 Questions: Menciptakan Karya Seni yang Berdampak bagi Lingkungan Sekitar (Selaras Format LKPD Resmi 8 Bagian)
  {
    id: 'q-1-1',
    level_id: 'level-1',
    urutan: 1,
    pertanyaan: '1. Masalah / Potensi Lingkungan — Apa yang Kamu Amati? (Jelaskan: masalah atau potensi yang kamu temukan di lingkungan sekitar, lokasi pengamatan spesifik, dan alasan mengapa masalah/potensi tersebut menarik untuk dijadikan ide karya seni!)',
    tipe_input: 'textarea',
    panduan: 'Rincikan hasil observasi lapangan secara konkret: lokasi spesifik, fenomena limbah atau kondisi fisik lingkungan, dan urgensi diangkat menjadi seni rupa.'
  },
  {
    id: 'q-1-2',
    level_id: 'level-1',
    urutan: 2,
    pertanyaan: '2. Konsep Karya — Tema, Tujuan, dan Pesan yang Ingin Disampaikan (Rancang: tema karya yang dipilih, tujuan karya bagi audiens, pesan persuasif spesifik, dan bentuk karya yang dipilih: lukisan, poster, mural, kolase, patung/3D, instalasi seni, karya barang bekas, fotografi, seni digital, atau lainnya!)',
    tipe_input: 'textarea',
    panduan: 'Gunakan corong konsep: dari tema luas, tujuan terukur, pesan komunikatif, hingga pemilihan bentuk rupa fisik atau digital yang paling relevan.'
  },
  {
    id: 'q-1-3',
    level_id: 'level-1',
    urutan: 3,
    pertanyaan: '3. Teknik & Media yang Akan Digunakan (Uraikan: teknik berkarya, media/bahan utama, alat bantu, bahan bekas/ramah lingkungan yang digunakan, serta alasan kritis mengapa memilih teknik dan media tersebut!)',
    tipe_input: 'textarea',
    panduan: 'Sebutkan media daur ulang (kardus, botol plastik, perca dll), peralatan aman, perekat ramah lingkungan, dan pertimbangan higienitas serta keawetan.'
  },
  {
    id: 'q-1-4',
    level_id: 'level-1',
    urutan: 4,
    pertanyaan: '4. Perkiraan Waktu Pengerjaan & Jadwal (Tentukan: estimasi waktu pengerjaan total dan rincian alokasi jadwal pada 6 tahapan: (1) Mencari dan mengembangkan ide, (2) Menyiapkan alat dan bahan, (3) Membuat rancangan/sketsa, (4) Proses pembuatan karya, (5) Penyelesaian dan penyempurnaan, (6) Presentasi/pameran karya!)',
    tipe_input: 'textarea',
    panduan: 'Buat estimasi waktu realistis (misal target mingguan atau pertemuan) untuk setiap tahap pengerjaan proyek.'
  },
  {
    id: 'q-1-5',
    level_id: 'level-1',
    urutan: 5,
    pertanyaan: '5. Rencana Proses Pembuatan Karya (Tuliskan langkah-langkah terstruktur yang akan kamu lakukan dari awal sampai karya selesai pada 7 tahap: (1) Observasi, (2) Menentukan ide, (3) Membuat sketsa/rancangan, (4) Menyiapkan alat dan bahan, (5) Membuat karya, (6) Finishing, (7) Presentasi/Pameran!)',
    tipe_input: 'textarea',
    panduan: 'Deskripsikan aksi operasional terperinci yang akan kamu jalankan di masing-masing dari ke-7 tahapan kegiatan tersebut.'
  },
  {
    id: 'q-1-6',
    level_id: 'level-1',
    urutan: 6,
    pertanyaan: '6. Sketsa / Rancangan Karya (Rumuskan: judul sementara karya, deskripsi singkat rancangan komposisi, warna, tekstur, dan visualisasi sketsa ide karyamu!)',
    tipe_input: 'textarea',
    panduan: 'Jelaskan judul karya, deskripsi visual (focal point, dimensi, pemilihan warna), dan buat gambar sketsa pada kanvas sketsa LKPD.'
  },
  {
    id: 'q-1-7',
    level_id: 'level-1',
    urutan: 7,
    pertanyaan: '7. Dampak yang Diharapkan (Pilih indikator dampak positif bagi lingkungan yang ditargetkan dan jelaskan secara mendalam bagaimana karya senimu dapat mewujudkan dampak tersebut!)',
    tipe_input: 'textarea',
    panduan: 'Hubungkan dengan kesadaran kebersihan, pengurangan limbah, pemanfaatan barang bekas, ajakan menjaga lingkungan, beautifikasi, kritik sosial, atau inspirasi berkelanjutan.'
  },
  {
    id: 'q-1-8',
    level_id: 'level-1',
    urutan: 8,
    pertanyaan: '8. Refleksi & Komitmen Berkreasi (Jawab pertanyaan reflektif: (1) hal baru yang ditemukan, (2) alasan seni efektif menyampaikan pesan ekologis, (3) tantangan teknis & solusi, (4) manfaat bagi sesama/bumi, serta ikrar komitmenmu sebagai seniman peduli lingkungan!)',
    tipe_input: 'textarea',
    panduan: 'Tuliskan refleksi evaluatif yang jujur dan bermakna mengenai pengalaman belajar serta komitmenmu dalam menjaga kelestarian bumi.'
  },

  // Unit 1 - LKPD 2 Questions: Eksperimen Bahan, Proses Produksi & Logbook Jurnal Berkarya
  {
    id: 'q-1-9',
    level_id: 'level-1',
    urutan: 9,
    pertanyaan: 'LKPD 2 - Bagian 1: Eksperimen Material Limbah & Uji Daya Tahan Perekat (Uraikan hasil pengujian jenis material limbah ramah lingkungan yang digunakan, kekuatan sambungan/perekat non-toksik yang paling efektif, serta daya tahan bahan terhadap cuaca/air!)',
    tipe_input: 'textarea',
    panduan: 'Jelaskan hasil uji coba sambungan (misal lem tembak ramah lingkungan, kawat, tali rami, lem putih PVA) dan kecocokan pada material daur ulang.'
  },
  {
    id: 'q-1-10',
    level_id: 'level-1',
    urutan: 10,
    pertanyaan: 'LKPD 2 - Bagian 2: Logbook / Jurnal Tahapan Produksi & Pemecahan Masalah (Tuliskan catatan progres tahapan pembuatan karya mulai dari pembersihan bahan mentah, pembuatan struktur rangka, perakitan wujud seni, hingga finishing serta inovasi pemecahan kendala teknis yang dihadapi!)',
    tipe_input: 'textarea',
    panduan: 'Rincikan kronologi pengerjaan karya pertemuan demi pertemuan beserta troubleshooting kendala yang berhasil diselesaikan.'
  },
  {
    id: 'q-1-11',
    level_id: 'level-1',
    urutan: 11,
    pertanyaan: 'LKPD 2 - Bagian 3: Keselamatan Kerja (K3) & Pengelolaan Sampah Sisa (Zero-Waste) (Jelaskan penerapan keselamatan kerja selama proses berkarya dan bagaimana kamu mengelola remah/sisa potongan agar tidak menjadi limbah baru!)',
    tipe_input: 'textarea',
    panduan: 'Deskripsikan penggunaan APD sederhana (sarung tangan/masker) dan prinsip zero-waste selama proses pembuatan karya seni rupa.'
  },

  // Unit 1 - LKPD 3 Questions: Pameran, Uji Dampak Lingkungan, Asesmen & Keberlanjutan
  {
    id: 'q-1-12',
    level_id: 'level-1',
    urutan: 12,
    pertanyaan: 'LKPD 3 - Bagian 1: Manajemen Display Pameran & Narasi Kuratorial Ekologis (Rancang tata display karya seni pameran, buat label karya/caption resmi, dan tuliskan narasi kuratorial yang menggugah emosi pengunjung!)',
    tipe_input: 'textarea',
    panduan: 'Sertakan judul resmi, nama seniman, ukuran, media bahan limbah, serta esai kuratorial singkat yang menjelaskan filosofi kepedulian lingkungan.'
  },
  {
    id: 'q-1-13',
    level_id: 'level-1',
    urutan: 13,
    pertanyaan: 'LKPD 3 - Bagian 2: Pengujian Lapangan 7 Spektrum Dampak Positif & Umpan Balik Pengunjung (Ukur ketercapaian dampak nyata karya senimu bagi lingkungan sekolah/komunitas serta rangkum hasil survei respons audiens yang melihat karya!)',
    tipe_input: 'textarea',
    panduan: 'Kaitkan dengan reduksi sampah nyata, testimoni pengunjung tentang pesan yang tersampaikan, dan potensi inspirasi aksi nyata.'
  },
  {
    id: 'q-1-14',
    level_id: 'level-1',
    urutan: 14,
    pertanyaan: 'LKPD 3 - Bagian 3: Rubrik Asesmen Diri/Antarteman & Rencana Aksi Keberlanjutan Pascaproyek (Lakukan penilaian reflektif terhadap karya sendiri/rekan sebaya dan susun rencana perawatan karya serta komitmen gaya hidup ramah lingkungan setelah proyek berakhir!)',
    tipe_input: 'textarea',
    panduan: 'Evaluasi 4 kriteria asesmen dan rumuskan aksi nyata keberlanjutan yang akan diteruskan di sekolah atau lingkungan tempat tinggal.'
  },

  // Unit 2 - LKPD 1 Questions: Praktik 4 Tahap Kritik Seni Rupa (Metode Feldman)
  {
    id: 'q-2-1',
    level_id: 'level-2',
    urutan: 1,
    pertanyaan: 'LKPD 1 - Tahap 1: DESKRIPSI (Pilihlah satu karya seni rupa maestro seperti "Penangkapan Pangeran Diponegoro" karya Raden Saleh atau karya teman di galeri sekolah. Tuliskan data fisik: judul, seniman, tahun, media, ukuran, serta catat seluruh objek kasat mata secara objektif apa adanya tanpa opini pribadi!)',
    tipe_input: 'textarea',
    panduan: 'Sesuai naskah Bahan Ajar Kritik Seni Rupa, catat fakta visual empiris secara objektif dengan istilah teknis seni rupa yang tepat tanpa mengambil kesimpulan prematur.'
  },
  {
    id: 'q-2-2',
    level_id: 'level-2',
    urutan: 2,
    pertanyaan: 'LKPD 1 - Tahap 2: ANALISIS FORMAL (Bedah penataan unsur rupa: garis, bidang, bentuk, warna, tekstur, ruang, serta prinsip komposisi: keseimbangan, irama, kesatuan, dan focal point pada karya pilihanmu tersebut!)',
    tipe_input: 'textarea',
    panduan: 'Jelaskan bagaimana unsur-unsur visual diorganisasi dan di mana letak pusat perhatian (focal point) yang memikat pandangan pertama pengamat.'
  },
  {
    id: 'q-2-3',
    level_id: 'level-2',
    urutan: 3,
    pertanyaan: 'LKPD 1 - Tahap 3: INTERPRETASI (Tafsirkan makna batin, gagasan tematik, pesan filosofis, serta simbol-simbol yang dihadirkan seniman dalam karya tersebut!)',
    tipe_input: 'textarea',
    panduan: 'Eksplorasi makna tersirat dan emosi yang ingin dikomunikasikan perupa melalui bahasa visual simbolik.'
  },
  {
    id: 'q-2-4',
    level_id: 'level-2',
    urutan: 4,
    pertanyaan: 'LKPD 1 - Tahap 4: EVALUASI / PENILAIAN (Tentukan kualitas dan mutu karya bila dibandingkan dengan karya lain yang sejenis secara kritis, adil, rasional, dan santun!)',
    tipe_input: 'textarea',
    panduan: 'Kaitkan dengan orisinalitas, kematangan teknik berkarya, kebaruan gagasan, serta fungsi karya yang ditelaah.'
  },

  // Unit 2 - LKPD 2 Questions: 4 Pendekatan Kritik & Kajian Kontekstual Lukisan Raden Saleh
  {
    id: 'q-2-5',
    level_id: 'level-2',
    urutan: 5,
    pertanyaan: 'LKPD 2 - Bagian 1: Komparasi 4 Pendekatan Kritik Seni (Jelaskan perbedaan mendasar antara Pendekatan Formalistik, Ekspresionistik, Instrumentalistik, dan Kontekstual beserta fokus bedah masing-masing pendekatan!)',
    tipe_input: 'textarea',
    panduan: 'Rincikan fokus masing-masing: formalistik (unsur visual fisik), ekspresionistik (emosi batin), instrumentalistik (sarana pesan moral/politik), dan kontekstual (kaitan historis & sosial).'
  },
  {
    id: 'q-2-6',
    level_id: 'level-2',
    urutan: 6,
    pertanyaan: 'LKPD 2 - Bagian 2: Kajian Kontekstual Lukisan Raden Saleh "Penangkapan Pangeran Diponegoro" (Bedah bagaimana Raden Saleh menyelipkan pesan perlawanan moral anti-kolonial, martabat bangsa, dan kritik sejarah terhadap tipu daya Belanda dalam lukisannya!)',
    tipe_input: 'textarea',
    panduan: 'Analisis gestur tegar Pangeran Diponegoro, ekspresi pengikutnya, perbedaan dengan lukisan versi Pieneman, dan kehadiran figur Raden Saleh sendiri di lukisan.'
  },
  {
    id: 'q-2-7',
    level_id: 'level-2',
    urutan: 7,
    pertanyaan: 'LKPD 2 - Bagian 3: Eksplorasi Pendekatan Kontekstual pada Karya Seni Kontemporer / Sekitar (Pilihlah satu karya seni rupa masa kini di lingkunganmu dan telaah keterkaitannya dengan isu sosial, lingkungan hidup, atau budaya lokal!)',
    tipe_input: 'textarea',
    panduan: 'Kaitkan pesan karya dengan persoalan nyata di masyarakat (misal lukisan mural kepedulian sampah atau instalasi kritik sosial).'
  },

  // Unit 2 - LKPD 3 Questions: 4 Jenis Kritik Seni, Fungsi Dua Mata Panah & Peer-Review
  {
    id: 'q-2-8',
    level_id: 'level-2',
    urutan: 8,
    pertanyaan: 'LKPD 3 - Bagian 1: Simulasi Penulisan Kritik Jurnalistik vs Kritik Pedagogik (Buatlah draf artikel ulasan singkat bergaya jurnalistik untuk media massa, lalu bandingkan dengan draf kritik pedagogik yang membimbing siswa di sekolah!)',
    tipe_input: 'textarea',
    panduan: 'Tunjukkan perbedaan gaya bahasa (lugas & menarik untuk umum vs edukatif, apresiatif & memberi saran perbaikan untuk siswa).'
  },
  {
    id: 'q-2-9',
    level_id: 'level-2',
    urutan: 9,
    pertanyaan: 'LKPD 3 - Bagian 2: Refleksi Penerapan Fungsi "Dua Mata Panah" Kritik Seni (Jelaskan mengapa kritik seni diibaratkan sebagai dua mata panah yang saling dibutuhkan oleh seniman pencipta dan oleh masyarakat penikmat seni!)',
    tipe_input: 'textarea',
    panduan: 'Uraikan manfaat kritik bagi seniman (mendeteksi kekurangan & ruang refleksi) dan bagi penikmat seni (tali penghubung pemahaman realita artistik dan estetik).'
  },
  {
    id: 'q-2-10',
    level_id: 'level-2',
    urutan: 10,
    pertanyaan: 'LKPD 3 - Bagian 3: Lembar Asesmen Antarteman (Peer-Review) & Standar Etika Bahasa Kritikus (Lakukan ulasan apresiasi terhadap karya salah satu teman sekelasmu menggunakan 4 kriteria asesmen dengan bahasa yang santun, efektif, dan komunikatif!)',
    tipe_input: 'textarea',
    panduan: 'Berikan apresiasi pada kelebihan karya teman, tunjukkan aspek yang dapat ditingkatkan, dan sampaikan saran perbaikan yang konstruktif.'
  },

  // Unit 3 - LKPD 1 Questions: Konsep, Bahan Limbah & 5 Tahap Siklus Daur Ulang
  {
    id: 'q-3-1',
    level_id: 'level-3',
    urutan: 1,
    pertanyaan: 'LKPD 1 - Bagian 1: Pemilihan Bahan Limbah Utama & Konsep Produk Kriya 3D (Dalam proyek berkarya seni rupa 3 dimensi kriya fashion ini, tentukan bahan limbah utama yang kamu pilih: Pelepah Pisang, Daun Pandan, Tas Kresek/Fused Plastic, atau Kardus Bekas! Jelaskan alasan pemilihan bahan tersebut serta bentuk produk yang kamu rancang: Tas Selempang, Totebag, Dompet, Pouch, atau Wadah Estetik!)',
    tipe_input: 'textarea',
    panduan: 'Sebutkan jenis material, kondisi bahan limbah yang didapatkan, dan alasan mengapa produk tersebut fungsional serta menarik secara estetis.'
  },
  {
    id: 'q-3-2',
    level_id: 'level-3',
    urutan: 2,
    pertanyaan: 'LKPD 1 - Bagian 2: Prosedur 5 Tahap Siklus Daur Ulang Limbah (Uraikan secara kronologis 5 tahapan siklus daur ulang yang kamu lalui: (1) Pengumpulan limbah sekitar, (2) Pemilahan material layak pakai, (3) Pembersihan & Pengeringan higienis, (4) Pengolahan bahan baku melalui teknik pilin/anyam/setrika pelapisan, hingga (5) Pembuatan wujud kriya 3 dimensi!)',
    tipe_input: 'textarea',
    panduan: 'Ceritakan detail teknis pengerjaan nyata di studio/rumah agar konsistensi proses karya 3 dimensi terlihat jelas.'
  },
  {
    id: 'q-3-3',
    level_id: 'level-3',
    urutan: 3,
    pertanyaan: 'LKPD 1 - Bagian 3: Analisis Nilai Guna vs Nilai Estetika Ruang Tiga Dimensi (Analisis perpaduan antara nilai guna/kegunaan fungsional praktis sehari-hari dengan nilai keindahan estetika bentuk, warna, tekstur ruang 360 derajat nyata dari rancangan produk kriya 3 dimensi yang telah kamu rancang!)',
    tipe_input: 'textarea',
    panduan: 'Tuliskan evaluasi kritis mengenai keseimbangan antara fungsi pakai (ergonomi) dan daya tarik visual bentuk ruang nyata karya 3 dimensi.'
  },

  // Unit 3 - LKPD 2 Questions: Eksperimen Konstruksi Sambungan, Logbook Produksi & Uji Kekuatan 3D
  {
    id: 'q-3-4',
    level_id: 'level-3',
    urutan: 4,
    pertanyaan: 'LKPD 2 - Bagian 1: Eksperimen Teknik Konstruksi Sambungan & Penguatan Rangka 3D (Uraikan teknik pembentukan dan konstruksi 3 dimensi yang kamu gunakan: teknik anyaman kepang, pilinan pelepah, setrika lembaran plastik berlapis (fused plastic), teknik jahit manual, atau pengikatan lem tembak/PVA! Bagaimana caramu memastikan sambungan dan rangka kokoh berdiri?)',
    tipe_input: 'textarea',
    panduan: 'Jelaskan pengujian kekuatan sambungan antar bagian, kerapian kaitan, dan penggunaan rangka pendukung agar karya memiliki volume ruang nyata yang stabil.'
  },
  {
    id: 'q-3-5',
    level_id: 'level-3',
    urutan: 5,
    pertanyaan: 'LKPD 2 - Bagian 2: Logbook / Jurnal Tahapan Produksi Kriya 3 Dimensi & Troubleshooting (Tuliskan catatan kemajuan proses pembuatan karya pertemuan demi pertemuan: mulai dari penyiapan pola/mal pola, pembentukan dasar, perakitan wujud 3D, hingga kendala teknis kerumitan bentuk yang dihadapi serta solusi kreatif yang kamu terapkan!)',
    tipe_input: 'textarea',
    panduan: 'Rincikan kronologi pengerjaan fisik secara bertahap dan catat bagaimana kamu mengatasi masalah kerapuhan bahan atau sambungan yang lepas.'
  },
  {
    id: 'q-3-6',
    level_id: 'level-3',
    urutan: 6,
    pertanyaan: 'LKPD 2 - Bagian 3: Uji Ergonomi, Kapasitas Beban & Ketahanan Material Lingkungan (Lakukan uji kelayakan fisik terhadap produk kriya 3 dimensi buatanmu: uji beban muatan, kenyamanan pegangan/tali selempang, serta ketahanan material terhadap gesekan, kelembapan, air, atau jamur!)',
    tipe_input: 'textarea',
    panduan: 'Tuliskan hasil penimbangan bobot, uji kenyamanan pegangan tangan, dan langkah preventif agar bahan organik (seperti pelepah/pandan) tidak berjamur atau plastik tidak robek.'
  },

  // Unit 3 - LKPD 3 Questions: Finishing Estetis, Display Pameran 3D, Peer-Review & Refleksi Circular Economy
  {
    id: 'q-3-7',
    level_id: 'level-3',
    urutan: 7,
    pertanyaan: 'LKPD 3 - Bagian 1: Teknik Pelapisan Finishing Estetis & Standar Keamanan Pakai (Jelaskan tahap penyempurnaan akhir/finishing karya kriya 3D: aplikasi pernis/clear coat pelindung kilau atau doff, pewarnaan alami/akrilik aksen, pemangkasan sisa serat, serta pemeriksaan higienitas dan keamanan agar nyaman bersentuhan dengan kulit pemakai!)',
    tipe_input: 'textarea',
    panduan: 'Rincikan bahan pelapis anti-air/anti-jamur (seperti pernis kayu transparan atau lem pelapis) dan aspek kehalusan permukaan hasil akhir karya.'
  },
  {
    id: 'q-3-8',
    level_id: 'level-3',
    urutan: 8,
    pertanyaan: 'LKPD 3 - Bagian 2: Penataan Display Pameran 3 Dimensi & Label Kuratorial Produk (Rancang konsep tata pamer karya 3 dimensi agar dapat diapresiasi dari sudut 360 derajat: pemilihan pedestal/meja display, pengaturan pencahayaan/spotlighting, serta susunlah label karya resmi yang memuat judul karya, nama perajin, bahan limbah, fungsi, dan filosofi ekologisnya!)',
    tipe_input: 'textarea',
    panduan: 'Tuliskan layout penataan ruang pamer 3D, sudut pandang terbaik, dan draf label informasi karya pameran kriya ramah lingkungan.'
  },
  {
    id: 'q-3-9',
    level_id: 'level-3',
    urutan: 9,
    pertanyaan: 'LKPD 3 - Bagian 3: Lembar Ulasan Antarteman (Peer-Review), Peluang Kewirausahaan & Refleksi Gaya Hidup Berkelanjutan (Minta masukan teman sekelasmu mengenai kelebihan dan saran estetika kriya 3D-mu! Analisis potensi nilai jual ekonomi produk daur ulang ini (konsep circular economy/upcycling fashion), serta simpulkan refleksimu mengenai peran kriya daur ulang dalam pelestarian bumi!)',
    tipe_input: 'textarea',
    panduan: 'Sertakan masukan konstruktif dari rekan sebaya, estimasi nilai ekonomis produk bila dipasarkan, dan komitmen pribadi untuk terus mengurangi limbah.'
  },

  // Unit 4 - LKPD 1 Questions: Penggalian Ide Batin, Memori Personal & Aliran Seni Ekspresi
  {
    id: 'q-4-1',
    level_id: 'level-4',
    urutan: 1,
    pertanyaan: 'LKPD 1 - Bagian 1: Penggalian Ide Batin & Memori Personal (Gali dan ceritakan sumber inspirasi batin yang mendasari karyamu: pengalaman masa lalu, kenangan berharga, mimpi, atau gejolak emosi personal apa yang ingin kamu curahkan menjadi karya seni rupa?)',
    tipe_input: 'textarea',
    panduan: 'Tuliskan refleksi batinmu secara jujur dan orisinal sebagai fondasi emosional karya ekspresi personal.'
  },
  {
    id: 'q-4-2',
    level_id: 'level-4',
    urutan: 2,
    pertanyaan: 'LKPD 1 - Bagian 2: Pemilihan Gaya Ekspresi & Metafora Visual (Gaya seni ekspresi apa yang kamu pilih: Ekspresionisme dengan sapuan bebas emosional, Surealisme alam mimpi, atau Simbolisme? Objek metafora visual apa yang kamu pakai untuk mewakili perasaanmu?)',
    tipe_input: 'textarea',
    panduan: 'Jelaskan hubungan antara objek simbolik (misal sayap rapuh, jam meleleh, akar pohon melilit, warna ungu gelap) dengan suasana batin yang kamu maksud.'
  },
  {
    id: 'q-4-3',
    level_id: 'level-4',
    urutan: 3,
    pertanyaan: 'LKPD 1 - Bagian 3: Makna Katarsis & Komunikasi Batin (Bagaimana proses penciptaan karya ekspresi personal ini membantumu memahami dirimu sendiri? Apa pesan terdalam yang kamu harapkan dapat dirasakan oleh orang lain saat menatap karyamu?)',
    tipe_input: 'textarea',
    panduan: 'Uraikan nilai katarsis personal dan komunikasi empatik yang ingin kamu bangun antara karyamu dan apresiator.'
  },

  // Unit 4 - LKPD 2 Questions: Eksperimen Material, Teknik Goresan Katarsis & Studi Maestro
  {
    id: 'q-4-4',
    level_id: 'level-4',
    urutan: 4,
    pertanyaan: 'LKPD 2 - Bagian 1: Eksperimen Media & Teknik Goresan Katarsis (Uraikan hasil uji coba media dan teknik ekspresi yang kamu gunakan: cat akrilik/minyak, teknik plototan jari ala Affandi, sapuan impasto bertekstur tebal, atau kolase barang kenangan pribadi yang memperkuat intensitas rasa!)',
    tipe_input: 'textarea',
    panduan: 'Deskripsikan karakter media yang dipilih, ketebalan tekstur, dan bagaimana spontanitas sapuan kuas/jari mewakili getaran batin.'
  },
  {
    id: 'q-4-5',
    level_id: 'level-4',
    urutan: 5,
    pertanyaan: 'LKPD 2 - Bagian 2: Studi Komparasi Gaya Maestro Ekspresi (Bandingkan caramu berekspresi dengan gaya maestro dunia/Indonesia, misalnya Affandi dengan energi plototan spontan, Edvard Munch dengan distorsi kegelisahan jiwa, atau Salvador Dalí dengan paradoks alam mimpi!)',
    tipe_input: 'textarea',
    panduan: 'Tunjukkan kesamaan spirit atau inspirasi teknis yang kamu serap dari karya maestro rujukan.'
  },
  {
    id: 'q-4-6',
    level_id: 'level-4',
    urutan: 6,
    pertanyaan: 'LKPD 2 - Bagian 3: Eksplorasi Palet Warna Psikologis (Psychology of Color) (Jelaskan pilihan palet warna emosional dalam karyamu: bagaimana paduan warna panas, dingin, kontras, atau monokromatik merefleksikan suasana batin yang ingin kamu luapkan!)',
    tipe_input: 'textarea',
    panduan: 'Kaitkan nuansa rona warna (misal merah membara, biru kelam, kuning harapan) dengan emosi psikologis yang dialami.'
  },

  // Unit 4 - LKPD 3 Questions: Pernyataan Seniman (Artist Statement), Apresiasi Empatis & Refleksi Batin
  {
    id: 'q-4-7',
    level_id: 'level-4',
    urutan: 7,
    pertanyaan: 'LKPD 3 - Bagian 1: Pernyataan Seniman Resmi (Artist Statement) (Susunlah naskah Artist Statement formal untuk pameran galeri: judul karya, ukuran & media, latar belakang konseptual, dan esai naratif yang mengupas makna terdalam karyamu!)',
    tipe_input: 'textarea',
    panduan: 'Tuliskan pernyataan seniman yang puitis, berbobot, dan mengantarkan apresiator memasuki ruang batin karyamu.'
  },
  {
    id: 'q-4-8',
    level_id: 'level-4',
    urutan: 8,
    pertanyaan: 'LKPD 3 - Bagian 2: Apresiasi Empatis Antarteman (Peer Empathy Review) (Lakukan penelaahan empatik terhadap karya ekspresi salah satu teman sekelas: tafsirkan suasana perasaan yang terpancar, keunikan bahasa visualnya, dan sampaikan apresiasi yang menguatkan!)',
    tipe_input: 'textarea',
    panduan: 'Gunakan pendekatan empati yang santun, peka, dan menghargai kejujuran batin teman sebaya tanpa menghakimi.'
  },
  {
    id: 'q-4-9',
    level_id: 'level-4',
    urutan: 9,
    pertanyaan: 'LKPD 3 - Bagian 3: Refleksi Transformasi Diri & Katarsis Jiwa (Uraikan bagaimana proses menuangkan emosi ke atas kanvas/media seni membantu melepaskan beban psikologis (self-healing), menumbuhkan kedamaian batin, dan memperkuat penerimaan diri!)',
    tipe_input: 'textarea',
    panduan: 'Tuliskan refleksi introspektif mengenai perubahan suasana hati sebelum dan sesudah menyelesaikan karya ekspresi personal.'
  },

  // Unit 5 - LKPD 1 Questions: Identitas Brand & Riset Kriya Ramah Lingkungan (Sinergi Unit 1 & Unit 5)
  {
    id: 'q-5-1',
    level_id: 'level-5',
    urutan: 1,
    pertanyaan: 'LKPD 1 - Bagian 1: Identitas Merek & Riset Kriya Ramah Lingkungan (Sinergi Unit 1 & Unit 5) (Tentukan produk kriya industri yang kamu rancang berbasis potensi limbah atau material daur ulang sekitar sekolah/rumah (Unit 1). Jelaskan persona brand, visi, nilai ramah lingkungan, dan target audiensnya!)',
    tipe_input: 'textarea',
    panduan: 'Hubungkan pemanfaatan material limbah sekitar (Unit 1) dengan perancangan produk kriya industri yang memiliki nilai jual dan identitas brand profesional (Unit 5).'
  },
  {
    id: 'q-5-2',
    level_id: 'level-5',
    urutan: 2,
    pertanyaan: 'LKPD 1 - Bagian 2: Analisis Kompetitor & Keunikan Produk (Diferensiasi Merek) (Lakukan observasi pada produk kriya sejenis di pasar: apa kelebihan dan kekurangan logo/kemasan mereka, dan bagaimana produk kriya buatanmu tampil lebih unik, estetik, dan berdaya saing?)',
    tipe_input: 'textarea',
    panduan: 'Jelaskan faktor pembeda yang membuat produk kriya industri buatanmu menonjol dari produk lain di pasaran.'
  },
  {
    id: 'q-5-3',
    level_id: 'level-5',
    urutan: 3,
    pertanyaan: 'LKPD 1 - Bagian 3: Eksplorasi Sketsa Ide Awal Logo di Atas Kertas (Deskripsikan konsep sketsa kasar ide logo yang kamu buat di buku sketsa dengan pensil: simbol apa yang digambarkan, susunan huruf tipografi apa yang dirancang, dan bagaimana filosofi bentuknya?)',
    tipe_input: 'textarea',
    panduan: 'Rincikan ide visual awal yang kamu tuangkan di atas kertas sebelum masuk ke aplikasi komputer/ponsel.'
  },

  // Unit 5 - LKPD 2 Questions: Mood Board, Desain Digital Logo & Dokumen Desain Brief
  {
    id: 'q-5-4',
    level_id: 'level-5',
    urutan: 4,
    pertanyaan: 'LKPD 2 - Bagian 1: Mood Board Visual & Pemilihan Elemen Desain (Warna & Tipografi) (Uraikan mood board yang kamu susun: pilihan warna emosional (psikologi warna), jenis font huruf yang dipilih, dan alasan keselarasan elemen visual tersebut dengan produk kriya ramah lingkungan!)',
    tipe_input: 'textarea',
    panduan: 'Jelaskan harmoni warna, tekstur bahan, dan gaya tipografi yang kamu tetapkan untuk memperkuat citra merek.'
  },
  {
    id: 'q-5-5',
    level_id: 'level-5',
    urutan: 5,
    pertanyaan: 'LKPD 2 - Bagian 2: Eksekusi Desain Digital Logo & Pemilihan Jenis Logo (Jelaskan proses digitalisasi logomu menggunakan perangkat lunak (Canva/Illustrator/CorelDraw/AI). Sebutkan jenis logo yang dipilih (Wordmark, Monogram, Simbol, Emblem, Kombinasi) dan format resolusi ekspornya (PNG transparan/SVG)!)',
    tipe_input: 'textarea',
    panduan: 'Paparkan alat digital yang digunakan, tahapan pembuatan kurva vektor/elemen grafis, dan alasan pemilihan kategori jenis logo.'
  },
  {
    id: 'q-5-6',
    level_id: 'level-5',
    urutan: 6,
    pertanyaan: 'LKPD 2 - Bagian 3: Penyusunan Dokumen Desain Brief Produk Kriya Industri (Susun Desain Brief terpadu: profil produk kriya, tujuan desain logo, batasan teknis kemasan/stempel, dan deliverables hasil akhir desain yang siap diaplikasikan pada produk fisik!)',
    tipe_input: 'textarea',
    panduan: 'Tuliskan dokumen ringkas Desain Brief sebagai panduan resmi produksi identitas visual produk kriya industri.'
  },

  // Unit 5 - LKPD 3 Questions: Video Produk Promosi, Naskah/Storyboard & Pencahayaan
  {
    id: 'q-5-7',
    level_id: 'level-5',
    urutan: 7,
    pertanyaan: 'LKPD 3 - Bagian 1: Perumusan Tujuan & Naskah/Storyboard Video Produk Kriya (Rancang konsep video promosi: apa tujuan utama video produkmu (menarik perhatian / menjelaskan keunggulan fitur), serta uraikan alur naskah dan storyboard adegan dari awal hingga penutup!)',
    tipe_input: 'textarea',
    panduan: 'Tuliskan rencana naskah video dan urutan adegan visual yang efektif memikat minat calon pembeli.'
  },
  {
    id: 'q-5-8',
    level_id: 'level-5',
    urutan: 8,
    pertanyaan: 'LKPD 3 - Bagian 2: Teknik Pencahayaan (Lighting) & Visualisasi Keunggulan Produk (Jelaskan teknik pencahayaan dan sudut pengambilan video yang kamu gunakan untuk menonjolkan tekstur kriya daur ulang, detail logo merek, dan cara pemakaian produk secara memikat!)',
    tipe_input: 'textarea',
    panduan: 'Uraikan pemanfaatan cahaya alami/lampu dan sudut kamera untuk menghasilkan video bernilai estetis tinggi.'
  },
  {
    id: 'q-5-9',
    level_id: 'level-5',
    urutan: 9,
    pertanyaan: 'LKPD 3 - Bagian 3: Uji Coba Respon Audiens & Evaluasi Pemasaran Kriya (Tunjukkan video produk dan mockup logo kriya kepada teman sekelas atau guru. Apakah pesan produk tersampaikan jelas? Rangkum umpan balik audiens dan langkah penyempurnaannya!)',
    tipe_input: 'textarea',
    panduan: 'Evaluasi respon pasar sasaran mengenai daya tarik logo dan efektivitas video promosi yang telah kamu ciptakan.'
  }
];
