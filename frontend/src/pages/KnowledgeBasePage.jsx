import { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { motion } from 'framer-motion';

function KnowledgeBasePage() {
  const { kbArticles } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredArticles = kbArticles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedArticles = filteredArticles.reduce((acc, article) => {
    if (!acc[article.category]) acc[article.category] = [];
    acc[article.category].push(article);
    return acc;
  }, {});

  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem'}}>
        <h1>Internal Policy</h1> {/* Renamed */}
        <input 
          type="text" 
          placeholder="Search policies..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{marginBottom:0, width:'300px'}}
        />
      </div>

      {Object.keys(groupedArticles).length === 0 && (
        <div className="glass-card">
           <p style={{color:'var(--text-muted)'}}>No policies found matching your search.</p>
        </div>
      )}

      {Object.entries(groupedArticles).map(([category, articles]) => (
        <section key={category} className="kb-category">
          <h2>{category}</h2>
          {articles.map(article => (
            <div key={article.id} className="kb-item">
              <div className="kb-header" onClick={() => toggleExpand(article.id)}>
                <span>{article.title}</span>
                <span style={{color:'var(--primary)'}}>{expandedId === article.id ? '−' : '+'}</span>
              </div>
              {expandedId === article.id && (
                <div className="kb-content">
                  {article.content}
                </div>
              )}
            </div>
          ))}
        </section>
      ))}

    </motion.div>
  );
}

export default KnowledgeBasePage;