import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const DATA_DIR = path.resolve(__dirname, 'data');
const DB_FILE = path.resolve(DATA_DIR, 'db.json');

app.use(express.json({ limit: '10mb' }));
app.use('/assets', express.static(path.resolve(__dirname, 'public/assets')));
app.use(express.static(path.resolve(__dirname, 'public')));

// Ensure data directory and initial database structure
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface User {
  id: string;
  nama: string;
  username: string;
  email: string;
  password: string;
  kelas: string;
  created_at: string;
}

interface LkpdLevel {
  id: string;
  level: number;
  judul: string;
  deskripsi: string;
  urutan: number;
  tema: string;
  tujuan_pembelajaran: string[];
  materi_teks: string;
  video_url: string;
  video_title: string;
  quiz_data: Array<{
    id: number;
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  }>;
  game_data: {
    type: string;
    title: string;
    instruction: string;
    items: any[];
  };
}

interface LkpdQuestion {
  id: string;
  level_id: string;
  pertanyaan: string;
  tipe_input: 'text' | 'textarea' | 'choice';
  pilihan?: string[];
  panduan: string;
  urutan: number;
}

interface LkpdAnswer {
  id: string;
  user_id: string;
  level_id: string;
  question_id: string;
  jawaban: string;
  updated_at: string;
}

interface UserProgress {
  id: string;
  user_id: string;
  level_id: string;
  status: 'locked' | 'unlocked' | 'completed';
  completed_at: string | null;
}

interface GalleryArtwork {
  id: string;
  user_id: string;
  user_name: string;
  user_class: string;
  title: string;
  medium: string;
  description: string;
  image_url: string;
  likes: number;
  liked_by: string[];
  created_at: string;
  tags: string[];
}

interface ForumThread {
  id: string;
  user_id: string;
  user_name: string;
  user_class: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
  comments_count: number;
}

interface ForumComment {
  id: string;
  thread_id: string;
  user_id: string;
  user_name: string;
  user_class: string;
  content: string;
  created_at: string;
}

interface QuizScoreRecord {
  id: string;
  user_id: string;
  level_id: string;
  quiz_type: 'multiple_choice' | 'matching' | 'fill_in_blank';
  score: number;
  total: number;
  updated_at: string;
}

interface DatabaseSchema {
  users: User[];
  lkpd_levels: LkpdLevel[];
  lkpd_questions: LkpdQuestion[];
  lkpd_answers: LkpdAnswer[];
  user_progress: UserProgress[];
  gallery_artworks: GalleryArtwork[];
  forum_threads: ForumThread[];
  forum_comments: ForumComment[];
  quiz_scores: QuizScoreRecord[];
}

import { INITIAL_LEVELS, INITIAL_QUESTIONS } from "./src/data/units";

const INITIAL_SAMPLE_USERS: User[] = [
  {
    id: 'sample-1',
    nama: 'Dewi Anjani',
    username: 'dewianjani',
    email: 'dewi@smaneb.sch.id',
    password: 'password123',
    kelas: 'XI MIPA 2',
    created_at: '2026-09-18T10:00:00Z'
  },
  {
    id: 'sample-2',
    nama: 'Bima Pratama',
    username: 'bimapratama',
    email: 'bima@smaneb.sch.id',
    password: 'password123',
    kelas: 'XI IPS 1',
    created_at: '2026-09-19T08:30:00Z'
  },
  {
    id: 'sample-3',
    nama: 'Siti Rahmawati',
    username: 'sitirahma',
    email: 'siti@smaneb.sch.id',
    password: 'password123',
    kelas: 'XI MIPA 1',
    created_at: '2026-09-19T11:15:00Z'
  },
  {
    id: 'sample-4',
    nama: 'Farhan Maulana',
    username: 'farhanm',
    email: 'farhan@smaneb.sch.id',
    password: 'password123',
    kelas: 'XI IPS 2',
    created_at: '2026-09-20T09:00:00Z'
  }
];

const INITIAL_QUIZ_SCORES: QuizScoreRecord[] = [
  {
    id: 'qs-1',
    user_id: 'sample-1',
    level_id: 'level-1',
    quiz_type: 'multiple_choice',
    score: 100,
    total: 100,
    updated_at: '2026-09-20T10:00:00Z'
  },
  {
    id: 'qs-2',
    user_id: 'sample-1',
    level_id: 'level-1',
    quiz_type: 'matching',
    score: 100,
    total: 100,
    updated_at: '2026-09-20T10:05:00Z'
  },
  {
    id: 'qs-3',
    user_id: 'sample-1',
    level_id: 'level-1',
    quiz_type: 'fill_in_blank',
    score: 100,
    total: 100,
    updated_at: '2026-09-20T10:10:00Z'
  },
  {
    id: 'qs-4',
    user_id: 'sample-2',
    level_id: 'level-1',
    quiz_type: 'multiple_choice',
    score: 80,
    total: 100,
    updated_at: '2026-09-21T09:00:00Z'
  },
  {
    id: 'qs-5',
    user_id: 'sample-2',
    level_id: 'level-1',
    quiz_type: 'matching',
    score: 100,
    total: 100,
    updated_at: '2026-09-21T09:05:00Z'
  },
  {
    id: 'qs-6',
    user_id: 'sample-2',
    level_id: 'level-1',
    quiz_type: 'fill_in_blank',
    score: 75,
    total: 100,
    updated_at: '2026-09-21T09:10:00Z'
  },
  {
    id: 'qs-7',
    user_id: 'sample-3',
    level_id: 'level-1',
    quiz_type: 'multiple_choice',
    score: 100,
    total: 100,
    updated_at: '2026-09-21T11:00:00Z'
  },
  {
    id: 'qs-8',
    user_id: 'sample-3',
    level_id: 'level-1',
    quiz_type: 'matching',
    score: 80,
    total: 100,
    updated_at: '2026-09-21T11:05:00Z'
  },
  {
    id: 'qs-9',
    user_id: 'sample-3',
    level_id: 'level-1',
    quiz_type: 'fill_in_blank',
    score: 100,
    total: 100,
    updated_at: '2026-09-21T11:10:00Z'
  }
];

const INITIAL_GALLERY: GalleryArtwork[] = [
  {
    id: 'art-1',
    user_id: 'sample-1',
    user_name: 'Dewi Anjani',
    user_class: 'XI MIPA 2',
    title: 'Mimpi dalam Bayang Surealis',
    medium: 'Cat Akrilik di atas Kanvas (Mixed Texture)',
    description: 'Eksplorasi alam bawah sadar tentang kecemasan masa depan remaja yang bertransformasi menjadi sayap kupu-kupu mekanis.',
    image_url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
    likes: 18,
    liked_by: [],
    created_at: '2026-09-18T10:15:00Z',
    tags: ['Surealisme', 'Akrilik', 'Unit 1']
  },
  {
    id: 'art-2',
    user_id: 'sample-2',
    user_name: 'Bima Pratama',
    user_class: 'XI IPS 1',
    title: 'Harmoni Limbah Pesisir',
    medium: 'Kolase Cangkang Kerang, Serbuk Kayu & Akrilik',
    description: 'Karya seni media campuran yang mengangkat isu kebersihan pantai selatan dengan tekstur impasto pasir alami.',
    image_url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop&q=80',
    likes: 24,
    liked_by: [],
    created_at: '2026-09-19T14:20:00Z',
    tags: ['Mixed Media', 'Tekstur Nyata', 'Unit 2']
  },
  {
    id: 'art-3',
    user_id: 'sample-3',
    user_name: 'Siti Rahmawati',
    user_class: 'XI MIPA 1',
    title: 'Lampu Geometris Daur Ulang Kertas',
    medium: 'Paper Mache & Rangka Bambu Vernis',
    description: 'Karya seni terapan ramah lingkungan memanfaatkan tumpukan kertas ujian bekas menjadi lampu meja ergonomis dengan nuansa temaram etnis.',
    image_url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
    likes: 31,
    liked_by: [],
    created_at: '2026-09-20T08:45:00Z',
    tags: ['Seni Terapan', 'Upcycling', 'Unit 4']
  }
];

const INITIAL_THREADS: ForumThread[] = [
  {
    id: 'thread-1',
    user_id: 'sample-1',
    user_name: 'Dewi Anjani',
    user_class: 'XI MIPA 2',
    title: 'Tips mencampurkan gesso dengan pasir pantai agar tidak rontok saat kering?',
    content: 'Halo teman-teman seni rupa kelas XI! Pada penugasan Unit 2 Eksplorasi Media Campuran, saya mencoba mencampur gesso dengan pasir pantai halus. Tapi beberapa bagian ada yang sedikit retak saat mengering di kanvas. Ada yang punya saran rasio campuran lem kayu / akrilik yang ideal?',
    category: 'Eksplorasi Media & Bahan',
    created_at: '2026-09-20T11:00:00Z',
    comments_count: 2
  },
  {
    id: 'thread-2',
    user_id: 'sample-2',
    user_name: 'Bima Pratama',
    user_class: 'XI IPS 1',
    title: 'Perbedaan mendasar antara Analisis Formal dan Interpretasi pada Kritik Feldman',
    content: 'Bagi teman-teman yang sedang menyelesaikan LKPD Level 3, mari kita diskusikan batasan antara Analisis Formal dan Interpretasi. Menurut modul Feldman, Analisis Formal berfokus murni pada relasi unsur dan prinsip komposisi rupa (seperti keselarasan warna & focal point), sedangkan Interpretasi baru membahas emosi dan makna simboliknya. Apakah ada contoh karya lain yang bisa kita bedah bersama?',
    category: 'Apresiasi & Kritik Seni',
    created_at: '2026-09-21T09:30:00Z',
    comments_count: 1
  },
  {
    id: 'thread-3',
    user_id: 'sample-4',
    user_name: 'Farhan Maulana',
    user_class: 'XI IPS 2',
    title: 'Ide Kurasi dan Tema Pameran Seni Rupa Angkatan Kelas XI',
    content: 'Untuk persiapan Unit 5 Manajemen Pameran Sekolah, bagaimana jika angkatan kita mengangkat tema "Resonansi Rupa: Jejak Tradisi Menuju Masa Depan"? Setiap kelas bisa menyumbang karya 2D dan 3D dengan zonasi pencahayaan yang teratur!',
    category: 'Pameran Seni Sekolah',
    created_at: '2026-09-21T15:00:00Z',
    comments_count: 0
  }
];

const INITIAL_COMMENTS: ForumComment[] = [
  {
    id: 'comm-1',
    thread_id: 'thread-1',
    user_id: 'sample-2',
    user_name: 'Bima Pratama',
    user_class: 'XI IPS 1',
    content: 'Hai Dewi! Coba tambahkan lem putih PVA (lem kayu Fox) dengan perbandingan 2 bagian gesso, 1 bagian lem kayu, dan 1 bagian pasir. Lem kayu akan memberikan elastisitas sehingga lapisan tidak retak getas.',
    created_at: '2026-09-20T12:30:00Z'
  },
  {
    id: 'comm-2',
    thread_id: 'thread-1',
    user_id: 'sample-3',
    user_name: 'Siti Rahmawati',
    user_class: 'XI MIPA 1',
    content: 'Pastikan juga mengeringkannya di tempat teduh dengan sirkulasi udara baik, jangan langsung di bawah terik matahari ekstrem karena panas mendadak memicu susut dan retak!',
    created_at: '2026-09-20T13:45:00Z'
  },
  {
    id: 'comm-3',
    thread_id: 'thread-2',
    user_id: 'sample-1',
    user_name: 'Dewi Anjani',
    user_class: 'XI MIPA 2',
    content: 'Sangat setuju Bima! Pada lukisan Affandi misalnya, Analisis Formal membahas goresan meliuk tebal dan warna kuning-merah kontras, sedangkan Interpretasinya menafsirkan rasa syukur atas terbitnya matahari sebagai harapan hidup.',
    created_at: '2026-09-21T10:15:00Z'
  }
];

// Read and write helper functions
function readDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initialData: DatabaseSchema = {
        users: INITIAL_SAMPLE_USERS,
        lkpd_levels: INITIAL_LEVELS,
        lkpd_questions: INITIAL_QUESTIONS,
        lkpd_answers: [],
        user_progress: [],
        gallery_artworks: INITIAL_GALLERY,
        forum_threads: INITIAL_THREADS,
        forum_comments: INITIAL_COMMENTS,
        quiz_scores: INITIAL_QUIZ_SCORES
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf8');
      return initialData;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    const parsed = JSON.parse(raw) as DatabaseSchema;
    // Always keep current curriculum units & questions updated
    parsed.lkpd_levels = INITIAL_LEVELS;
    parsed.lkpd_questions = INITIAL_QUESTIONS;
    if (!parsed.gallery_artworks) parsed.gallery_artworks = INITIAL_GALLERY;
    if (!parsed.forum_threads) parsed.forum_threads = INITIAL_THREADS;
    if (!parsed.forum_comments) parsed.forum_comments = INITIAL_COMMENTS;
    if (!parsed.quiz_scores) parsed.quiz_scores = INITIAL_QUIZ_SCORES;
    if (!parsed.users) parsed.users = [];
    // Ensure sample users exist for realistic leaderboard comparison
    for (const su of INITIAL_SAMPLE_USERS) {
      if (!parsed.users.some(u => u.id === su.id)) {
        parsed.users.push(su);
      }
    }
    return parsed;
  } catch (err) {
    console.error('Error reading db:', err);
    return {
      users: INITIAL_SAMPLE_USERS,
      lkpd_levels: INITIAL_LEVELS,
      lkpd_questions: INITIAL_QUESTIONS,
      lkpd_answers: [],
      user_progress: [],
      gallery_artworks: INITIAL_GALLERY,
      forum_threads: INITIAL_THREADS,
      forum_comments: INITIAL_COMMENTS,
      quiz_scores: INITIAL_QUIZ_SCORES
    };
  }
}

function writeDb(data: DatabaseSchema): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing db:', err);
  }
}

// Authentication middleware helper
function authenticateUser(req: Request, res: Response): User | null {
  const authHeader = req.headers['authorization'] || req.headers['x-user-id'];
  if (!authHeader) {
    res.status(401).json({ error: 'Sesi tidak valid atau belum login. Silakan masuk akun terlebih dahulu.' });
    return null;
  }

  const userId = typeof authHeader === 'string' && authHeader.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : String(authHeader).trim();

  const db = readDb();
  const user = db.users.find(u => u.id === userId);
  if (!user) {
    res.status(401).json({ error: 'Pengguna tidak ditemukan dalam sistem.' });
    return null;
  }

  return user;
}

// Helper to ensure user progress records exist for all levels
function ensureUserProgress(userId: string, db: DatabaseSchema): UserProgress[] {
  let userProgressList = db.user_progress.filter(p => p.user_id === userId);

  // If user has no progress at all, initialize: Level 1 is 'unlocked', Levels 2-5 are 'locked'
  if (userProgressList.length === 0) {
    const levels = db.lkpd_levels.sort((a, b) => a.urutan - b.urutan);
    const newProgressList: UserProgress[] = levels.map((lvl, index) => ({
      id: `prog-${userId}-${lvl.id}`,
      user_id: userId,
      level_id: lvl.id,
      status: index === 0 ? 'unlocked' : 'locked',
      completed_at: null
    }));

    db.user_progress.push(...newProgressList);
    writeDb(db);
    return newProgressList;
  }

  return userProgressList;
}

// ---------------- API ROUTES ---------------- //

// 1. Register User
app.post('/api/auth/register', (req: Request, res: Response) => {
  const { nama, kelas, username, email, password, confirmPassword } = req.body;

  // Validation
  if (!nama || !kelas || !username || !email || !password) {
    return res.status(400).json({ error: 'Semua kolom formulir pendaftaran wajib diisi lengkap.' });
  }

  if (password.length < 4) {
    return res.status(400).json({ error: 'Kata sandi minimal terdiri dari 4 karakter.' });
  }

  if (confirmPassword && password !== confirmPassword) {
    return res.status(400).json({ error: 'Konfirmasi kata sandi tidak cocok dengan kata sandi.' });
  }

  const db = readDb();
  const normalizedUsername = username.trim().toLowerCase();
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = db.users.find(
    u => u.username.toLowerCase() === normalizedUsername || u.email.toLowerCase() === normalizedEmail
  );

  if (existingUser) {
    return res.status(400).json({ error: 'Username atau Email sudah terdaftar. Silakan gunakan username/email lain atau masuk ke akun.' });
  }

  const newUser: User = {
    id: `usr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    nama: nama.trim(),
    username: username.trim(),
    email: email.trim(),
    password: password.trim(),
    kelas: kelas.trim(),
    created_at: new Date().toISOString()
  };

  db.users.push(newUser);

  // Initialize progress: Level 1 Unlocked, Level 2-5 Locked
  const levels = db.lkpd_levels.sort((a, b) => a.urutan - b.urutan);
  levels.forEach((lvl, index) => {
    db.user_progress.push({
      id: `prog-${newUser.id}-${lvl.id}`,
      user_id: newUser.id,
      level_id: lvl.id,
      status: index === 0 ? 'unlocked' : 'locked',
      completed_at: null
    });
  });

  writeDb(db);

  const { password: _, ...userSafe } = newUser;
  return res.status(201).json({
    message: 'Pendaftaran akun berhasil! Selamat datang di Portal Seni Rupa Kelas XI.',
    user: userSafe,
    token: newUser.id
  });
});

// 2. Login User
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Harap masukkan Username/Email dan Kata Sandi.' });
  }

  const db = readDb();
  const term = username.trim().toLowerCase();
  const user = db.users.find(
    u => (u.username.toLowerCase() === term || u.email.toLowerCase() === term) && u.password === password.trim()
  );

  if (!user) {
    return res.status(401).json({ error: 'Username/Email atau Kata Sandi salah. Silakan periksa kembali.' });
  }

  // Ensure progress initialized
  ensureUserProgress(user.id, db);

  const { password: _, ...userSafe } = user;
  return res.json({
    message: 'Login berhasil!',
    user: userSafe,
    token: user.id
  });
});

// 3. Get Current User Info
app.get('/api/auth/me', (req: Request, res: Response) => {
  const user = authenticateUser(req, res);
  if (!user) return;

  const { password: _, ...userSafe } = user;
  return res.json({ user: userSafe });
});

// 4. Get All Levels with User's Progress
app.get('/api/levels', (req: Request, res: Response) => {
  const user = authenticateUser(req, res);
  if (!user) return;

  const db = readDb();
  const progressList = ensureUserProgress(user.id, db);

  const levelsWithStatus = db.lkpd_levels
    .sort((a, b) => a.urutan - b.urutan)
    .map(lvl => {
      const prog = progressList.find(p => p.level_id === lvl.id);
      const isCompleted = prog ? prog.status === 'completed' : false;
      const isLocked = prog ? prog.status === 'locked' : (lvl.level !== 1);
      const status = isCompleted ? 'completed' : (isLocked ? 'locked' : 'unlocked');

      // Calculate questions and answers progress
      const levelQuestions = db.lkpd_questions.filter(q => q.level_id === lvl.id);
      const userAnswersForLevel = db.lkpd_answers.filter(
        a => a.user_id === user.id && a.level_id === lvl.id && a.jawaban && a.jawaban.trim() !== ''
      );
      const answeredCount = userAnswersForLevel.length;
      const totalQuestionsCount = levelQuestions.length;
      const lkpdPercent = totalQuestionsCount > 0 ? Math.round((answeredCount / totalQuestionsCount) * 100) : 0;

      // Unit 1, Unit 2, Unit 4, Unit 5 sub-stages (LKPD 1, LKPD 2, LKPD 3)
      let lkpdBreakdown = undefined;
      if (lvl.level === 1) {
        const lkpd1Ans = userAnswersForLevel.some(a => ['q-1-1','q-1-2','q-1-3','q-1-4','q-1-5','q-1-6','q-1-7','q-1-8'].includes(a.question_id));
        const lkpd2Ans = userAnswersForLevel.some(a => ['q-1-9','q-1-10','q-1-11'].includes(a.question_id));
        const lkpd3Ans = userAnswersForLevel.some(a => ['q-1-12','q-1-13','q-1-14'].includes(a.question_id));
        const completedSub = isCompleted ? 3 : [lkpd1Ans, lkpd2Ans, lkpd3Ans].filter(Boolean).length;
        lkpdBreakdown = {
          subStages: [
            { id: 'lkpd1', name: 'LKPD 1: Ide & Desain', completed: isCompleted || lkpd1Ans },
            { id: 'lkpd2', name: 'LKPD 2: Produksi & Logbook', completed: isCompleted || lkpd2Ans },
            { id: 'lkpd3', name: 'LKPD 3: Pameran & Asesmen', completed: isCompleted || lkpd3Ans }
          ],
          completedCount: completedSub,
          totalCount: 3
        };
      } else if (lvl.level === 2) {
        const lkpd1Ans = userAnswersForLevel.some(a => ['q-2-1','q-2-2','q-2-3','q-2-4'].includes(a.question_id));
        const lkpd2Ans = userAnswersForLevel.some(a => ['q-2-5','q-2-6','q-2-7'].includes(a.question_id));
        const lkpd3Ans = userAnswersForLevel.some(a => ['q-2-8','q-2-9','q-2-10'].includes(a.question_id));
        const completedSub = isCompleted ? 3 : [lkpd1Ans, lkpd2Ans, lkpd3Ans].filter(Boolean).length;
        lkpdBreakdown = {
          subStages: [
            { id: 'lkpd1', name: 'LKPD 1: 4 Tahap Kritik', completed: isCompleted || lkpd1Ans },
            { id: 'lkpd2', name: 'LKPD 2: Pendekatan & Kontekstual', completed: isCompleted || lkpd2Ans },
            { id: 'lkpd3', name: 'LKPD 3: Jenis Kritik & Peer Review', completed: isCompleted || lkpd3Ans }
          ],
          completedCount: completedSub,
          totalCount: 3
        };
      } else if (lvl.level === 3) {
        const lkpd1Ans = userAnswersForLevel.some(a => ['q-3-1','q-3-2','q-3-3'].includes(a.question_id));
        const lkpd2Ans = userAnswersForLevel.some(a => ['q-3-4','q-3-5','q-3-6'].includes(a.question_id));
        const lkpd3Ans = userAnswersForLevel.some(a => ['q-3-7','q-3-8','q-3-9'].includes(a.question_id));
        const completedSub = isCompleted ? 3 : [lkpd1Ans, lkpd2Ans, lkpd3Ans].filter(Boolean).length;
        lkpdBreakdown = {
          subStages: [
            { id: 'lkpd1', name: 'LKPD 1: Konsep & Siklus Daur Ulang', completed: isCompleted || lkpd1Ans },
            { id: 'lkpd2', name: 'LKPD 2: Konstruksi & Logbook 3D', completed: isCompleted || lkpd2Ans },
            { id: 'lkpd3', name: 'LKPD 3: Finishing & Pameran 360°', completed: isCompleted || lkpd3Ans }
          ],
          completedCount: completedSub,
          totalCount: 3
        };
      } else if (lvl.level === 4) {
        const lkpd1Ans = userAnswersForLevel.some(a => ['q-4-1','q-4-2','q-4-3'].includes(a.question_id));
        const lkpd2Ans = userAnswersForLevel.some(a => ['q-4-4','q-4-5','q-4-6'].includes(a.question_id));
        const lkpd3Ans = userAnswersForLevel.some(a => ['q-4-7','q-4-8','q-4-9'].includes(a.question_id));
        const completedSub = isCompleted ? 3 : [lkpd1Ans, lkpd2Ans, lkpd3Ans].filter(Boolean).length;
        lkpdBreakdown = {
          subStages: [
            { id: 'lkpd1', name: 'LKPD 1: Ide Batin & Aliran', completed: isCompleted || lkpd1Ans },
            { id: 'lkpd2', name: 'LKPD 2: Media, Katarsis & Maestro', completed: isCompleted || lkpd2Ans },
            { id: 'lkpd3', name: 'LKPD 3: Artist Statement & Refleksi', completed: isCompleted || lkpd3Ans }
          ],
          completedCount: completedSub,
          totalCount: 3
        };
      } else if (lvl.level === 5) {
        const lkpd1Ans = userAnswersForLevel.some(a => ['q-5-1','q-5-2','q-5-3'].includes(a.question_id));
        const lkpd2Ans = userAnswersForLevel.some(a => ['q-5-4','q-5-5','q-5-6'].includes(a.question_id));
        const lkpd3Ans = userAnswersForLevel.some(a => ['q-5-7','q-5-8','q-5-9'].includes(a.question_id));
        const completedSub = isCompleted ? 3 : [lkpd1Ans, lkpd2Ans, lkpd3Ans].filter(Boolean).length;
        lkpdBreakdown = {
          subStages: [
            { id: 'lkpd1', name: 'LKPD 1: Analisis Narasi & Karakter', completed: isCompleted || lkpd1Ans },
            { id: 'lkpd2', name: 'LKPD 2: Model Sheet & Sudut Pandang', completed: isCompleted || lkpd2Ans },
            { id: 'lkpd3', name: 'LKPD 3: Layout Tipografi & Dummy', completed: isCompleted || lkpd3Ans }
          ],
          completedCount: completedSub,
          totalCount: 3
        };
      }

      // Overall percentage calculation
      let overallPercentage = 0;
      if (isCompleted) {
        overallPercentage = 100;
      } else if (!isLocked) {
        if ([1, 2, 3, 4, 5].includes(lvl.level) && lkpdBreakdown) {
          // Weighted by LKPD completion
          overallPercentage = Math.round((lkpdBreakdown.completedCount / 3) * 100);
          if (overallPercentage === 0 && answeredCount > 0) overallPercentage = 15;
          if (overallPercentage === 0) overallPercentage = 10; // active started
        } else {
          overallPercentage = lkpdPercent > 0 ? Math.min(95, Math.max(20, lkpdPercent)) : 15;
        }
      }

      return {
        id: lvl.id,
        level: lvl.level,
        judul: lvl.judul,
        deskripsi: lvl.deskripsi,
        urutan: lvl.urutan,
        tema: lvl.tema,
        status,
        completed_at: prog ? prog.completed_at : null,
        progress: {
          totalQuestions: totalQuestionsCount,
          answeredQuestions: answeredCount,
          lkpdPercentage: isCompleted ? 100 : lkpdPercent,
          overallPercentage,
          completedTasks: isCompleted ? totalQuestionsCount : answeredCount,
          totalTasks: totalQuestionsCount,
          lkpdBreakdown
        }
      };
    });

  return res.json({ levels: levelsWithStatus });
});

// 5. Get User Progress Summary
app.get('/api/user/progress', (req: Request, res: Response) => {
  const user = authenticateUser(req, res);
  if (!user) return;

  const db = readDb();
  const progressList = ensureUserProgress(user.id, db);

  const completedCount = progressList.filter(p => p.status === 'completed').length;
  const totalLevels = db.lkpd_levels.length;
  const percentage = totalLevels > 0 ? Math.round((completedCount / totalLevels) * 100) : 0;

  return res.json({
    user_id: user.id,
    completedCount,
    totalLevels,
    percentage,
    progress: progressList
  });
});

// 6. Get Single Level Details (CRITICAL: BACKEND ACCESS VALIDATION)
app.get('/api/levels/:level_id', (req: Request, res: Response) => {
  const user = authenticateUser(req, res);
  if (!user) return;

  const { level_id } = req.params;
  const db = readDb();

  const level = db.lkpd_levels.find(l => l.id === level_id);
  if (!level) {
    return res.status(404).json({ error: 'Modul / Level LKPD tidak ditemukan.' });
  }

  // Check user progress on this level
  const progressList = ensureUserProgress(user.id, db);
  const currentProg = progressList.find(p => p.level_id === level_id);
  const status = currentProg ? currentProg.status : (level.level === 1 ? 'unlocked' : 'locked');

  // Strict backend rule: Cannot access locked levels!
  if (status === 'locked') {
    return res.status(403).json({
      error: `Akses Ditolak: Level ${level.level} masih TERKUNCI. Sesuai aturan pembelajaran berurutan, Anda wajib menyelesaikan Level ${level.level - 1} terlebih dahulu.`
    });
  }

  // Retrieve questions for this level
  const questions = db.lkpd_questions
    .filter(q => q.level_id === level_id)
    .sort((a, b) => a.urutan - b.urutan);

  // Retrieve existing answers from this user for this level
  const existingAnswers = db.lkpd_answers.filter(
    a => a.user_id === user.id && a.level_id === level_id
  );

  return res.json({
    level,
    status,
    questions,
    existingAnswers,
    completed_at: currentProg?.completed_at || null
  });
});

// 7. Submit LKPD Form & Update Progress (CRITICAL: WORKFLOW VALIDATION & SEQUENTIAL UNLOCK)
app.post('/api/levels/:level_id/submit', (req: Request, res: Response) => {
  const user = authenticateUser(req, res);
  if (!user) return;

  const { level_id } = req.params;
  const { answers } = req.body; // Record of question_id -> string

  if (!answers || typeof answers !== 'object') {
    return res.status(400).json({ error: 'Data jawaban tidak valid atau kosong.' });
  }

  const db = readDb();
  const level = db.lkpd_levels.find(l => l.id === level_id);
  if (!level) {
    return res.status(404).json({ error: 'Level LKPD tidak ditemukan.' });
  }

  // Verify that the level is NOT locked for this user
  const progressList = ensureUserProgress(user.id, db);
  const currentProg = progressList.find(p => p.level_id === level_id);
  if (!currentProg || currentProg.status === 'locked') {
    return res.status(403).json({
      error: `Level ${level.level} masih berstatus Terkunci. Tidak diizinkan menyimpan data.`
    });
  }

  // Get required questions
  const questions = db.lkpd_questions.filter(q => q.level_id === level_id);

  // Validate that all questions are answered and meet minimal length
  const missingQuestions: string[] = [];
  questions.forEach(q => {
    const val = (answers[q.id] || '').trim();
    if (!val || val.length < 5) {
      missingQuestions.push(`Pertanyaan ${q.urutan}`);
    }
  });

  if (missingQuestions.length > 0) {
    return res.status(400).json({
      error: `Validasi gagal: Harap lengkapi jawaban pada ${missingQuestions.join(', ')} dengan penjelasan yang memadai (minimal 5 karakter).`
    });
  }

  const now = new Date().toISOString();

  // Save or update answers in lkpd_answers
  questions.forEach(q => {
    // Only update if answer for this question is provided in payload
    if (answers[q.id] === undefined) return;
    const val = (answers[q.id] || '').trim();
    const existingIndex = db.lkpd_answers.findIndex(
      a => a.user_id === user.id && a.level_id === level_id && a.question_id === q.id
    );

    if (existingIndex >= 0) {
      db.lkpd_answers[existingIndex].jawaban = val;
      db.lkpd_answers[existingIndex].updated_at = now;
    } else {
      db.lkpd_answers.push({
        id: `ans-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        user_id: user.id,
        level_id,
        question_id: q.id,
        jawaban: val,
        updated_at: now
      });
    }
  });

  // Update this level status to 'completed'
  if (currentProg) {
    currentProg.status = 'completed';
    currentProg.completed_at = now;
  }

  // Unlock NEXT level sequentially
  const allLevelsSorted = db.lkpd_levels.sort((a, b) => a.urutan - b.urutan);
  const currentLevelIndex = allLevelsSorted.findIndex(l => l.id === level_id);
  let nextLevelUnlocked: LkpdLevel | null = null;

  if (currentLevelIndex >= 0 && currentLevelIndex < allLevelsSorted.length - 1) {
    const nextLevel = allLevelsSorted[currentLevelIndex + 1];
    const nextProg = db.user_progress.find(
      p => p.user_id === user.id && p.level_id === nextLevel.id
    );

    if (nextProg && nextProg.status === 'locked') {
      nextProg.status = 'unlocked';
      nextLevelUnlocked = nextLevel;
    }
  }

  writeDb(db);

  return res.json({
    success: true,
    message: `Data LKPD Level ${level.level} berhasil divalidasi dan disimpan ke database!`,
    level_id,
    level_number: level.level,
    status: 'completed',
    next_level: nextLevelUnlocked ? { id: nextLevelUnlocked.id, level: nextLevelUnlocked.level, judul: nextLevelUnlocked.judul } : null
  });
});

// 8. Get Full Rekap / Hasil LKPD for Current User (For Rekap and Print Page)
app.get('/api/user/rekap', (req: Request, res: Response) => {
  const user = authenticateUser(req, res);
  if (!user) return;

  const db = readDb();
  const progressList = ensureUserProgress(user.id, db);
  const userAnswers = db.lkpd_answers.filter(a => a.user_id === user.id);

  const levelsSummary = db.lkpd_levels
    .sort((a, b) => a.urutan - b.urutan)
    .map(lvl => {
      const prog = progressList.find(p => p.level_id === lvl.id);
      const lvlQuestions = db.lkpd_questions
        .filter(q => q.level_id === lvl.id)
        .sort((a, b) => a.urutan - b.urutan);

      const qaList = lvlQuestions.map(q => {
        const foundAns = userAnswers.find(a => a.question_id === q.id);
        return {
          question_id: q.id,
          urutan: q.urutan,
          pertanyaan: q.pertanyaan,
          panduan: q.panduan,
          jawaban: foundAns ? foundAns.jawaban : null,
          updated_at: foundAns ? foundAns.updated_at : null
        };
      });

      return {
        level_id: lvl.id,
        level_number: lvl.level,
        judul: lvl.judul,
        tema: lvl.tema,
        status: prog ? prog.status : (lvl.level === 1 ? 'unlocked' : 'locked'),
        completed_at: prog ? prog.completed_at : null,
        questions_answers: qaList
      };
    });

  const completedCount = levelsSummary.filter(l => l.status === 'completed').length;
  const totalLevels = levelsSummary.length;

  return res.json({
    user: {
      id: user.id,
      nama: user.nama,
      kelas: user.kelas,
      username: user.username,
      email: user.email,
      registered_at: user.created_at
    },
    statistics: {
      completedCount,
      totalLevels,
      completionPercentage: Math.round((completedCount / totalLevels) * 100)
    },
    levels: levelsSummary
  });
});

// 9. Gallery: Get Artworks
app.get('/api/gallery', (req: Request, res: Response) => {
  const db = readDb();
  const tag = req.query.tag as string;
  const search = (req.query.search as string || '').toLowerCase();

  let artworks = [...db.gallery_artworks];

  if (tag && tag !== 'all') {
    artworks = artworks.filter(a => a.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
  }

  if (search) {
    artworks = artworks.filter(a =>
      a.title.toLowerCase().includes(search) ||
      a.user_name.toLowerCase().includes(search) ||
      a.medium.toLowerCase().includes(search) ||
      a.description.toLowerCase().includes(search)
    );
  }

  // Sort by newest
  artworks.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return res.json({ artworks });
});

// 10. Gallery: Upload New Student Artwork
app.post('/api/gallery', (req: Request, res: Response) => {
  const user = authenticateUser(req, res);
  if (!user) return;

  const { title, medium, description, image_url, tags } = req.body;

  if (!title || !medium || !description) {
    return res.status(400).json({ error: 'Judul karya, medium/teknik, dan deskripsi apresiasi wajib diisi.' });
  }

  const db = readDb();
  const defaultArtImages = [
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&auto=format&fit=crop&q=80'
  ];

  const selectedImage = (image_url && image_url.trim()) ? image_url.trim() : defaultArtImages[Math.floor(Math.random() * defaultArtImages.length)];

  const newArtwork: GalleryArtwork = {
    id: `art-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    user_id: user.id,
    user_name: user.nama,
    user_class: user.kelas,
    title: title.trim(),
    medium: medium.trim(),
    description: description.trim(),
    image_url: selectedImage,
    likes: 1,
    liked_by: [user.id],
    created_at: new Date().toISOString(),
    tags: Array.isArray(tags) && tags.length > 0 ? tags : ['Seni Siswa', 'Kelas XI']
  };

  db.gallery_artworks.unshift(newArtwork);
  writeDb(db);

  return res.status(201).json({
    message: 'Karya seni berhasil diunggah ke Galeri Siswa ArtVerse XI!',
    artwork: newArtwork
  });
});

// 11. Gallery: Toggle Like
app.post('/api/gallery/:id/like', (req: Request, res: Response) => {
  const user = authenticateUser(req, res);
  if (!user) return;

  const { id } = req.params;
  const db = readDb();
  const art = db.gallery_artworks.find(a => a.id === id);

  if (!art) {
    return res.status(404).json({ error: 'Karya tidak ditemukan.' });
  }

  if (!art.liked_by) art.liked_by = [];

  const alreadyLiked = art.liked_by.includes(user.id);
  if (alreadyLiked) {
    art.liked_by = art.liked_by.filter(uid => uid !== user.id);
    art.likes = Math.max(0, art.likes - 1);
  } else {
    art.liked_by.push(user.id);
    art.likes += 1;
  }

  writeDb(db);
  return res.json({ likes: art.likes, liked: !alreadyLiked });
});

// 12. Forum: Get Threads
app.get('/api/forum', (req: Request, res: Response) => {
  const db = readDb();
  const category = req.query.category as string;
  const search = (req.query.search as string || '').toLowerCase();

  let threads = [...db.forum_threads];

  if (category && category !== 'all') {
    threads = threads.filter(t => t.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    threads = threads.filter(t =>
      t.title.toLowerCase().includes(search) ||
      t.content.toLowerCase().includes(search) ||
      t.user_name.toLowerCase().includes(search)
    );
  }

  threads.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  return res.json({ threads });
});

// 13. Forum: Create Thread
app.post('/api/forum', (req: Request, res: Response) => {
  const user = authenticateUser(req, res);
  if (!user) return;

  const { title, content, category } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Judul topik dan isi bahasan diskusi wajib diisi.' });
  }

  const db = readDb();
  const newThread: ForumThread = {
    id: `thread-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    user_id: user.id,
    user_name: user.nama,
    user_class: user.kelas,
    title: title.trim(),
    content: content.trim(),
    category: category || 'Umum & Apresiasi Seni',
    created_at: new Date().toISOString(),
    comments_count: 0
  };

  db.forum_threads.unshift(newThread);
  writeDb(db);

  return res.status(201).json({
    message: 'Topik diskusi berhasil diterbitkan!',
    thread: newThread
  });
});

// 14. Forum: Get Single Thread & Comments
app.get('/api/forum/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  const thread = db.forum_threads.find(t => t.id === id);

  if (!thread) {
    return res.status(404).json({ error: 'Topik diskusi tidak ditemukan.' });
  }

  const comments = db.forum_comments
    .filter(c => c.thread_id === id)
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  return res.json({ thread, comments });
});

// 15. Forum: Add Comment
app.post('/api/forum/:id/comments', (req: Request, res: Response) => {
  const user = authenticateUser(req, res);
  if (!user) return;

  const { id } = req.params;
  const { content } = req.body;

  if (!content || !content.trim()) {
    return res.status(400).json({ error: 'Isi komentar tidak boleh kosong.' });
  }

  const db = readDb();
  const thread = db.forum_threads.find(t => t.id === id);
  if (!thread) {
    return res.status(404).json({ error: 'Topik diskusi tidak ditemukan.' });
  }

  const newComment: ForumComment = {
    id: `comm-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    thread_id: id,
    user_id: user.id,
    user_name: user.nama,
    user_class: user.kelas,
    content: content.trim(),
    created_at: new Date().toISOString()
  };

  db.forum_comments.push(newComment);
  thread.comments_count = (thread.comments_count || 0) + 1;
  writeDb(db);

  return res.status(201).json({
    message: 'Komentar apresiasi berhasil diposkan!',
    comment: newComment
  });
});

// 16. Quiz: Submit & Save Quiz Score (Multiple Choice, Matching, Fill in Blank)
app.post('/api/quiz/score', (req: Request, res: Response) => {
  const user = authenticateUser(req, res);
  if (!user) return;

  const { level_id, quiz_type, score, total } = req.body;
  if (!level_id || !quiz_type || score === undefined || total === undefined) {
    return res.status(400).json({ error: 'Data skor kuis tidak lengkap.' });
  }

  const db = readDb();
  if (!db.quiz_scores) db.quiz_scores = [];

  const existingIndex = db.quiz_scores.findIndex(
    q => q.user_id === user.id && q.level_id === level_id && q.quiz_type === quiz_type
  );

  const newRecord: QuizScoreRecord = {
    id: existingIndex >= 0 ? db.quiz_scores[existingIndex].id : `qs-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    user_id: user.id,
    level_id,
    quiz_type,
    score: Math.max(0, Math.min(Number(score), Number(total))),
    total: Number(total),
    updated_at: new Date().toISOString()
  };

  if (existingIndex >= 0) {
    if (newRecord.score >= db.quiz_scores[existingIndex].score) {
      db.quiz_scores[existingIndex] = newRecord;
    }
  } else {
    db.quiz_scores.push(newRecord);
  }

  writeDb(db);
  return res.json({ message: 'Skor kuis berhasil disimpan ke papan prestasi!', record: newRecord });
});

// 17. Quiz: Get Recorded Scores for Level
app.get('/api/quiz/scores/:level_id', (req: Request, res: Response) => {
  const user = authenticateUser(req, res);
  if (!user) return;

  const { level_id } = req.params;
  const db = readDb();
  const userScores = (db.quiz_scores || []).filter(
    q => q.user_id === user.id && q.level_id === level_id
  );

  const result: Record<string, { score: number; total: number; updated_at: string }> = {};
  for (const s of userScores) {
    result[s.quiz_type] = {
      score: s.score,
      total: s.total,
      updated_at: s.updated_at
    };
  }

  return res.json({ scores: result });
});

// 18. Leaderboard (Papan Peringkat Prestasi Siswa)
app.get('/api/leaderboard', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  let currentUserId: string | null = null;
  if (authHeader) {
    currentUserId = typeof authHeader === 'string' && authHeader.startsWith('Bearer ')
      ? authHeader.slice(7).trim()
      : String(authHeader).trim();
  }

  const db = readDb();
  const kelasFilter = req.query.kelas as string;

  let candidateUsers = [...db.users];
  if (kelasFilter && kelasFilter !== 'all') {
    candidateUsers = candidateUsers.filter(u => u.kelas.toLowerCase() === kelasFilter.toLowerCase());
  }

  const entries = candidateUsers.map(u => {
    // 1. LKPD answers score: 15 pts per answered question
    const answersCount = (db.lkpd_answers || []).filter(a => a.user_id === u.id).length;
    const lkpd_score = answersCount * 15;

    // 2. Completed units: 60 pts bonus per completed unit
    const completedUnits = (db.user_progress || []).filter(p => p.user_id === u.id && p.status === 'completed').length;
    const completionBonus = completedUnits * 60;

    // 3. Quiz scores:
    const userQuizRecords = (db.quiz_scores || []).filter(q => q.user_id === u.id);
    let multiple_choice_score = 0;
    let matching_score = 0;
    let fill_blank_score = 0;

    for (const r of userQuizRecords) {
      if (r.quiz_type === 'multiple_choice') multiple_choice_score += r.score;
      else if (r.quiz_type === 'matching') matching_score += r.score;
      else if (r.quiz_type === 'fill_in_blank') fill_blank_score += r.score;
    }

    // 4. Bonus: Artworks uploaded (30 pts each) + Forum threads/comments (15 & 10 pts)
    const artCount = (db.gallery_artworks || []).filter(a => a.user_id === u.id).length;
    const threadCount = (db.forum_threads || []).filter(t => t.user_id === u.id).length;
    const commCount = (db.forum_comments || []).filter(c => c.user_id === u.id).length;
    const bonus_score = (artCount * 30) + (threadCount * 15) + (commCount * 10);

    const game_score = completedUnits * 40;

    const total_score = lkpd_score + completionBonus + multiple_choice_score + matching_score + fill_blank_score + game_score + bonus_score;

    return {
      user_id: u.id,
      nama: u.nama,
      kelas: u.kelas,
      username: u.username,
      total_score,
      lkpd_score: lkpd_score + completionBonus,
      quiz_score: multiple_choice_score,
      matching_score,
      fill_blank_score,
      game_score,
      bonus_score,
      completed_units_count: completedUnits,
      badge: '',
      is_current_user: currentUserId ? u.id === currentUserId : false
    };
  });

  // Sort by total_score descending
  entries.sort((a, b) => b.total_score - a.total_score);

  // Assign ranks & badges
  const ranked = entries.map((entry, idx) => {
    const rank = idx + 1;
    let badge = '✨ Penjelajah Seni';
    if (rank === 1) badge = '🥇 Juara 1 Adirupa';
    else if (rank === 2) badge = '🥈 Juara 2 Kreatif';
    else if (rank === 3) badge = '🥉 Juara 3 Apresiator';
    else if (entry.total_score >= 500) badge = '🌟 Maestro Seni';
    else if (entry.total_score >= 300) badge = '🎨 Seniman Aktif';
    else if (entry.total_score >= 150) badge = '🌱 Pelajar Berkarya';

    return {
      ...entry,
      rank,
      badge
    };
  });

  const currentUserEntry = currentUserId ? ranked.find(r => r.user_id === currentUserId) : null;

  return res.json({
    leaderboard: ranked,
    total_participants: ranked.length,
    current_user_rank: currentUserEntry ? currentUserEntry.rank : null,
    current_user: currentUserEntry || null
  });
});

// Serve frontend in dev (via Vite middlewares) or in production (via dist)
async function startServer() {
  if (process.env.NODE_ENV === 'production' && fs.existsSync(path.resolve(__dirname, 'dist'))) {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ArtVerse XI Server is actively running on port ${PORT}`);
  });
}

startServer();
