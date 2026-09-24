import React, { useEffect, useState } from 'react';
import { 
  MessageSquare, 
  Plus, 
  Send, 
  Search, 
  Filter, 
  User, 
  Clock, 
  ChevronRight, 
  Sparkles, 
  X, 
  MessageCircle,
  ArrowLeft
} from 'lucide-react';
import { api } from '../api';
import { ForumThread, ForumComment, User as UserType } from '../types';

interface ForumViewProps {
  user: UserType;
}

export const ForumView: React.FC<ForumViewProps> = ({ user }) => {
  const [threads, setThreads] = useState<ForumThread[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);

  // Active Thread Details & Comments
  const [activeThread, setActiveThread] = useState<ForumThread | null>(null);
  const [comments, setComments] = useState<ForumComment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  // Create Thread Modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadContent, setNewThreadContent] = useState('');
  const [newThreadCategory, setNewThreadCategory] = useState('Unit 1: Seni Berdampak Lingkungan');
  const [submittingThread, setSubmittingThread] = useState(false);

  const categories = [
    'all',
    'Unit 1: Seni Berdampak Lingkungan',
    'Unit 2: Apresiasi Seni Rupa',
    'Unit 3: Berkarya Seni Rupa 3 Dimensi',
    'Unit 4: Membuat dan Mempresentasikan Karya Seni Rupa',
    'Unit 5: Ilustrasi Deskriptif'
  ];

  const fetchThreads = async () => {
    try {
      setLoading(true);
      const res = await api.getForumThreads(selectedCategory, searchQuery);
      setThreads(res.threads);
    } catch (err) {
      console.error('Failed to load threads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, [selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchThreads();
  };

  // Open thread detail
  const handleOpenThread = async (tId: string) => {
    setActiveThreadId(tId);
    try {
      setCommentsLoading(true);
      const res = await api.getThreadDetails(tId);
      setActiveThread(res.thread);
      setComments(res.comments);
    } catch (err) {
      console.error('Failed to load thread details:', err);
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeThreadId || !newCommentText.trim()) return;

    try {
      setSubmittingComment(true);
      const res = await api.addComment(activeThreadId, newCommentText.trim());
      setComments(prev => [...prev, res.comment]);
      setNewCommentText('');
      // Update thread comments count
      setThreads(prev =>
        prev.map(t => (t.id === activeThreadId ? { ...t, comments_count: t.comments_count + 1 } : t))
      );
    } catch (err) {
      console.error('Failed to add comment:', err);
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleCreateThread = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThreadTitle.trim() || !newThreadContent.trim()) return;

    try {
      setSubmittingThread(true);
      const res = await api.createForumThread({
        title: newThreadTitle.trim(),
        content: newThreadContent.trim(),
        category: newThreadCategory
      });
      setShowCreateModal(false);
      setNewThreadTitle('');
      setNewThreadContent('');
      fetchThreads();
      handleOpenThread(res.thread.id);
    } catch (err) {
      console.error('Failed to create thread:', err);
    } finally {
      setSubmittingThread(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold mb-2">
            <MessageSquare className="w-3.5 h-3.5" /> Ruang Diskusi Apresiasi Seni Rupa
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
            Forum Kolaborasi & Tanya Jawab
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Berbagi gagasan karya, berdiskusi mengenai teknik media campuran, dan bertukar kritik seni yang santun antar siswa kelas XI.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-200 transition-all hover:scale-105 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Topik Baru</span>
        </button>
      </div>

      {/* Main Forum Split / List View */}
      {activeThreadId && activeThread ? (
        /* THREAD DETAILS & COMMENTS VIEW */
        <div className="space-y-6">
          <button
            onClick={() => {
              setActiveThreadId(null);
              setActiveThread(null);
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Diskusi
          </button>

          {/* Thread Header Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-bold">
                {activeThread.category}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500">
                {new Date(activeThread.created_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
              {activeThread.title}
            </h2>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm leading-relaxed whitespace-pre-wrap">
              {activeThread.content}
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-600">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center text-xs">
                {activeThread.user_name.charAt(0)}
              </div>
              <div>
                <span className="font-bold text-slate-900">{activeThread.user_name}</span>
                <span className="text-slate-400 ml-1.5 font-medium">({activeThread.user_class})</span>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-indigo-600" />
              Tanggapan & Diskusi ({comments.length})
            </h3>

            {commentsLoading ? (
              <p className="text-xs text-slate-400 py-4 text-center">Memuat balasan...</p>
            ) : comments.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-4">
                Belum ada tanggapan untuk topik ini. Jadilah yang pertama memberikan masukan apresiatif!
              </p>
            ) : (
              <div className="space-y-3">
                {comments.map((comm) => (
                  <div key={comm.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-purple-500 text-white font-bold flex items-center justify-center text-[10px]">
                          {comm.user_name.charAt(0)}
                        </div>
                        <span className="font-bold text-slate-900">{comm.user_name}</span>
                        <span className="text-slate-400 text-[11px]">({comm.user_class})</span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {new Date(comm.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed pl-8 whitespace-pre-wrap">
                      {comm.content}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-1">
                  {user.nama.charAt(0)}
                </div>
                <div className="flex-1 space-y-2">
                  <textarea
                    rows={2}
                    required
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Tulis tanggapan atau masukan apresiasi karya seni..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={submittingComment || !newCommentText.trim()}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{submittingComment ? 'Mengirim...' : 'Kirim Balasan'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* THREADS LIST VIEW */
        <div className="space-y-6">
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
              <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1 mr-1" />
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cat === 'all' ? 'Semua Topik' : cat}
                </button>
              ))}
            </div>

            <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari topik diskusi..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 bg-white"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </form>
          </div>

          {/* Threads List */}
          {loading ? (
            <div className="py-20 text-center text-slate-400">
              <div className="inline-block w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-sm font-medium">Memuat diskusi seni...</p>
            </div>
          ) : threads.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8">
              <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-base font-bold text-slate-700">Belum ada diskusi di kategori ini</p>
              <p className="text-xs text-slate-400 mt-1">Mulai diskusi pertama Anda mengenai tugas LKPD atau materi kelas!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {threads.map((th) => (
                <div
                  key={th.id}
                  onClick={() => handleOpenThread(th.id)}
                  className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer flex items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-bold">
                        {th.category}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Oleh <strong>{th.user_name}</strong> ({th.user_class})
                      </span>
                    </div>

                    <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {th.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {th.content}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600">
                      <MessageCircle className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{th.comments_count}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* CREATE THREAD MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-lg text-slate-900 font-serif">Buat Topik Diskusi Seni</h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateThread} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Kategori Diskusi *
                </label>
                <select
                  value={newThreadCategory}
                  onChange={(e) => setNewThreadCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Unsur & Prinsip Rupa">Unsur & Prinsip Rupa (Unit 1)</option>
                  <option value="Eksplorasi Media & Bahan">Eksplorasi Media & Bahan (Unit 2)</option>
                  <option value="Apresiasi & Kritik Seni">Apresiasi & Kritik Seni (Unit 3)</option>
                  <option value="Seni Terapan & Upcycle">Seni Terapan & Upcycle (Unit 4)</option>
                  <option value="Pameran Seni Sekolah">Pameran Seni Sekolah (Unit 5)</option>
                  <option value="Tanya Jawab LKPD">Tanya Jawab LKPD Umum</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Judul Topik Diskusi *
                </label>
                <input
                  type="text"
                  required
                  value={newThreadTitle}
                  onChange={(e) => setNewThreadTitle(e.target.value)}
                  placeholder="Contoh: Diskusi Pemilihan Palet Warna Komplementer pada LKPD Level 2"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Isi Pertanyaan / Pandangan Apresiasi *
                </label>
                <textarea
                  required
                  rows={4}
                  value={newThreadContent}
                  onChange={(e) => setNewThreadContent(e.target.value)}
                  placeholder="Jelaskan hal yang ingin Anda diskusikan secara santun dan membangun..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submittingThread}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-200 transition-all cursor-pointer"
                >
                  {submittingThread ? 'Menerbitkan...' : 'Terbitkan Topik'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
