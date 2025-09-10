import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, Eye, Calendar, Tag, User, ArrowLeft, Upload, Image as ImageIcon } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  published: boolean;
  tags: string[];
}

interface BlogAdminProps {
  onBack: () => void;
}

const BlogAdmin: React.FC<BlogAdminProps> = ({ onBack }) => {
  const [articles, setArticles] = useState<Article[]>([
    {
      id: '1',
      title: "L'Intelligence Artificielle en 2025 : Révolution ou Évolution ?",
      excerpt: "Analyse des dernières avancées en IA et leur impact sur le développement web moderne. Comment intégrer l'IA dans vos projets...",
      content: "# L'Intelligence Artificielle en 2025\n\nL'intelligence artificielle continue de transformer notre façon de développer des applications web...",
      category: "Intelligence Artificielle",
      date: "15 Janvier 2025",
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
      published: true,
      tags: ["IA", "Développement", "2025"]
    },
    {
      id: '2',
      title: "React 19 : Les Nouvelles Fonctionnalités à Connaître",
      excerpt: "Tour d'horizon des nouveautés React 19 avec des exemples pratiques. Server Components, Concurrent Features et plus encore...",
      content: "# React 19 : Les Nouveautés\n\nReact 19 apporte de nombreuses améliorations...",
      category: "Développement Web",
      date: "10 Janvier 2025",
      readTime: "12 min",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      published: true,
      tags: ["React", "JavaScript", "Frontend"]
    }
  ]);

  const [currentView, setCurrentView] = useState<'list' | 'edit' | 'create'>('list');
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState<Partial<Article>>({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    image: '',
    published: false,
    tags: []
  });

  const categories = [
    'Intelligence Artificielle',
    'Développement Web',
    'Performance',
    'Sécurité',
    'Mobile',
    'Machine Learning',
    'DevOps',
    'UI/UX'
  ];

  const handleCreateNew = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      image: '',
      published: false,
      tags: []
    });
    setEditingArticle(null);
    setCurrentView('create');
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData(article);
    setCurrentView('edit');
  };

  const handleSave = () => {
    const now = new Date();
    const articleData: Article = {
      id: editingArticle?.id || Date.now().toString(),
      title: formData.title || '',
      excerpt: formData.excerpt || '',
      content: formData.content || '',
      category: formData.category || '',
      date: editingArticle?.date || now.toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }),
      readTime: `${Math.ceil((formData.content?.length || 0) / 200)} min`,
      image: formData.image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop',
      published: formData.published || false,
      tags: formData.tags || []
    };

    if (editingArticle) {
      setArticles(prev => prev.map(a => a.id === editingArticle.id ? articleData : a));
    } else {
      setArticles(prev => [articleData, ...prev]);
    }

    setCurrentView('list');
    setEditingArticle(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      setArticles(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleTagAdd = (tag: string) => {
    if (tag && !formData.tags?.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tag]
      }));
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  if (currentView === 'list') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
                Retour au site
              </button>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Gestion du Blog
              </h1>
            </div>
            <button
              onClick={handleCreateNew}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Plus size={20} />
              Nouvel Article
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div key={article.id} className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      article.published 
                        ? 'bg-green-500/20 text-green-300' 
                        : 'bg-yellow-500/20 text-yellow-300'
                    }`}>
                      {article.published ? 'Publié' : 'Brouillon'}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2 text-sm text-gray-400">
                    <Calendar size={14} />
                    {article.date}
                    <span>•</span>
                    {article.readTime}
                  </div>
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <Tag size={14} className="text-blue-400" />
                    <span className="text-sm text-blue-400">{article.category}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      {article.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(article)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentView('list')}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
              Retour à la liste
            </button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {currentView === 'edit' ? 'Modifier l\'Article' : 'Nouvel Article'}
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setFormData(prev => ({ ...prev, published: false }))}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
            >
              <Save size={20} />
              Brouillon
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Eye size={20} />
              {formData.published ? 'Mettre à jour' : 'Publier'}
            </button>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Titre de l'article</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-400 transition-colors text-white placeholder-gray-400"
                  placeholder="Entrez le titre de votre article..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Extrait</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-400 transition-colors text-white placeholder-gray-400 resize-none"
                  placeholder="Résumé de votre article..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Contenu (Markdown)</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  rows={20}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-400 transition-colors text-white placeholder-gray-400 font-mono text-sm resize-none"
                  placeholder="# Votre titre

Écrivez votre contenu en Markdown...

## Sous-titre

Votre texte ici..."
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Image de couverture</label>
                <div className="space-y-3">
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-400 transition-colors text-white placeholder-gray-400"
                    placeholder="URL de l'image..."
                  />
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Aperçu"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Catégorie</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-400 transition-colors text-white"
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-slate-800">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Ajouter un tag..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-400 transition-colors text-white placeholder-gray-400"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleTagAdd(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <div className="flex flex-wrap gap-2">
                    {formData.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                      >
                        {tag}
                        <button
                          onClick={() => handleTagRemove(tag)}
                          className="hover:text-red-400 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                    className="w-5 h-5 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium">Publier immédiatement</span>
                </label>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="font-medium mb-2">Statistiques</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <div>Mots: {formData.content?.split(' ').length || 0}</div>
                  <div>Caractères: {formData.content?.length || 0}</div>
                  <div>Temps de lecture: {Math.ceil((formData.content?.length || 0) / 200)} min</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogAdmin;