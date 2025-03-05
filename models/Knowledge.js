import mongoose from 'mongoose';

const knowledgeSchema = new mongoose.Schema({
  chapter: String,
  section: String,
  content: String,
  keywords: [String]
});

export const KnowledgeBase = mongoose.model('KnowledgeBase', knowledgeSchema);
