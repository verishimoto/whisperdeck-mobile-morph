import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChainTemplates, ChainTemplate } from '@/contexts/ChainTemplatesContext';
import { useAuth } from '@/contexts/AuthContext';
import { useArchitect } from '@/contexts/ArchitectContext';
import { Header } from '@/components/Header';
import { hackPrompts } from '@/data/prompts';
import { ArrowLeft, FolderOpen, Users, User, Play, Trash2, Loader2, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function Templates() {
  const navigate = useNavigate();
  const { publicTemplates, myTemplates, isLoading, deleteTemplate, incrementUseCount, getPromptsByIds } = useChainTemplates();
  const { user } = useAuth();
  const { isArchitect } = useArchitect();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'public' | 'mine'>('public');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLoadTemplate = async (template: ChainTemplate) => {
    const prompts = getPromptsByIds(template.prompt_ids);
    if (prompts.length === 0) {
      toast({ title: 'Template Error', description: 'Could not find prompts for this template.', variant: 'destructive' });
      return;
    }
    await incrementUseCount(template.id);
    // Store loaded template in sessionStorage for ChainBuilder to pick up
    sessionStorage.setItem('loadedTemplatePrompts', JSON.stringify(prompts));
    toast({ title: 'Template Loaded', description: `"${template.name}" with ${prompts.length} prompts. Returning to deck.` });
    navigate('/');
  };

  const handleDeleteTemplate = async (id: string) => {
    setDeletingId(id);
    const { error } = await deleteTemplate(id);
    setDeletingId(null);
    if (error) {
      toast({ title: 'Delete Failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Template Deleted', description: 'Your template has been removed.' });
    }
  };

  const templates = activeTab === 'public' ? publicTemplates : myTemplates;
  const filtered = searchQuery.trim()
    ? templates.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.description?.toLowerCase().includes(searchQuery.toLowerCase()))
    : templates;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header searchQuery="" onSearchChange={() => {}} totalPrompts={hackPrompts.length} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Back + Title */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-xl liquid-glass-button text-foreground/70 hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3">
            <FolderOpen className="h-6 w-6 text-foreground/70" />
            <h1 className="text-2xl font-display font-semibold">Chain Templates</h1>
          </div>
        </div>

        {/* Tabs + Search */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('public')}
              className={`px-5 py-2 rounded-full text-sm font-sans border transition-all flex items-center gap-2 ${
                activeTab === 'public'
                  ? 'bg-primary/15 border-primary/50 text-primary'
                  : 'border-foreground/15 text-foreground/50 hover:text-foreground hover:border-foreground/30'
              }`}
            >
              <Users className="h-4 w-4" />
              Community ({publicTemplates.length})
            </button>
            <button
              onClick={() => setActiveTab('mine')}
              className={`px-5 py-2 rounded-full text-sm font-sans border transition-all flex items-center gap-2 ${
                activeTab === 'mine'
                  ? 'bg-primary/15 border-primary/50 text-primary'
                  : 'border-foreground/15 text-foreground/50 hover:text-foreground hover:border-foreground/30'
              }`}
            >
              <User className="h-4 w-4" />
              My Templates ({myTemplates.length})
            </button>
          </div>
          <div className="relative flex-1 sm:max-w-xs">
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 px-4 pr-10 rounded-full border border-foreground/20 bg-transparent text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-sans"
            />
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40 pointer-events-none" />
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 text-foreground/30 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <FolderOpen className="h-12 w-12 text-foreground/20 mx-auto mb-4" />
            <p className="text-foreground/50 font-sans">
              {searchQuery ? 'No templates match your search.' : activeTab === 'mine' ? (user ? "You haven't created any templates yet." : 'Sign in to save your own templates.') : 'No community templates available.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map(template => (
              <div
                key={template.id}
                className="liquid-glass-card p-5 group hover:scale-[1.01] transition-transform"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-display font-medium text-foreground truncate flex-1">{template.name}</h3>
                  {template.category && (
                    <Badge className="bg-primary/15 border-primary/25 text-primary text-xs px-2 py-0.5 rounded-full shrink-0">
                      {template.category}
                    </Badge>
                  )}
                </div>
                {template.description && (
                  <p className="text-sm text-foreground/60 leading-relaxed mb-4 line-clamp-2 font-body">{template.description}</p>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-foreground/40 font-sans">
                    <span>{template.prompt_ids.length} prompts</span>
                    <span>•</span>
                    <span>{template.use_count} uses</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      onClick={() => handleLoadTemplate(template)}
                      className="bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30 text-xs h-8"
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Load
                    </Button>
                    {(template.created_by === user?.id || isArchitect) && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteTemplate(template.id)}
                        disabled={deletingId === template.id}
                        className="bg-destructive/10 border-destructive/30 text-destructive hover:bg-destructive/20 text-xs h-8"
                      >
                        {deletingId === template.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3" />}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
