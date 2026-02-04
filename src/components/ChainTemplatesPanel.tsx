import { useState } from 'react';
import { useChainTemplates, ChainTemplate } from '@/contexts/ChainTemplatesContext';
import { useAuth } from '@/contexts/AuthContext';
import { useArchitect } from '@/contexts/ArchitectContext';
import { X, FolderOpen, Users, User, Play, Trash2, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { HackPrompt } from '@/types';

interface ChainTemplatesPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadTemplate: (prompts: HackPrompt[]) => void;
}

export function ChainTemplatesPanel({ isOpen, onClose, onLoadTemplate }: ChainTemplatesPanelProps) {
  const { publicTemplates, myTemplates, isLoading, deleteTemplate, incrementUseCount, getPromptsByIds } = useChainTemplates();
  const { user } = useAuth();
  const { isArchitect } = useArchitect();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'public' | 'mine'>('public');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLoadTemplate = async (template: ChainTemplate) => {
    const prompts = getPromptsByIds(template.prompt_ids);
    if (prompts.length === 0) {
      toast({
        title: 'Template Error',
        description: 'Could not find prompts for this template.',
        variant: 'destructive',
      });
      return;
    }
    
    await incrementUseCount(template.id);
    onLoadTemplate(prompts);
    onClose();
    
    toast({
      title: 'Template Loaded',
      description: `"${template.name}" with ${prompts.length} prompts.`,
    });
  };

  const handleDeleteTemplate = async (id: string) => {
    setDeletingId(id);
    const { error } = await deleteTemplate(id);
    setDeletingId(null);
    
    if (error) {
      toast({
        title: 'Delete Failed',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Template Deleted',
        description: 'Your template has been removed.',
      });
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Coding': 'bg-blue-500/20 border-blue-500/40 text-blue-300',
      'Analysis': 'bg-amber-500/20 border-amber-500/40 text-amber-300',
      'Creative': 'bg-pink-500/20 border-pink-500/40 text-pink-300',
      'Learning': 'bg-purple-500/20 border-purple-500/40 text-purple-300',
      'Strategy': 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300',
    };
    return colors[category] || 'bg-white/10 border-white/20 text-white/70';
  };

  const templates = activeTab === 'public' ? publicTemplates : myTemplates;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative z-10 w-full max-w-2xl mx-4 max-h-[80vh] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <FolderOpen className="h-5 w-5 text-white/70" />
            <h2 className="text-xl font-semibold text-white">Chain Templates</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
          >
            <X className="h-4 w-4 text-white/70" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setActiveTab('public')}
            className={`flex-1 px-6 py-3 flex items-center justify-center gap-2 transition-all ${
              activeTab === 'public'
                ? 'text-white border-b-2 border-purple-500'
                : 'text-white/50 hover:text-white/70'
            }`}
          >
            <Users className="h-4 w-4" />
            Community ({publicTemplates.length})
          </button>
          <button
            onClick={() => setActiveTab('mine')}
            className={`flex-1 px-6 py-3 flex items-center justify-center gap-2 transition-all ${
              activeTab === 'mine'
                ? 'text-white border-b-2 border-purple-500'
                : 'text-white/50 hover:text-white/70'
            }`}
          >
            <User className="h-4 w-4" />
            My Templates ({myTemplates.length})
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 text-white/50 animate-spin" />
            </div>
          ) : templates.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/50">
                {activeTab === 'mine' 
                  ? user 
                    ? 'You haven\'t created any templates yet.'
                    : 'Sign in to save your own templates.'
                  : 'No community templates available.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {templates.map(template => (
                <div
                  key={template.id}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-white font-medium truncate">{template.name}</h3>
                        <Badge className={getCategoryColor(template.category)}>
                          {template.category}
                        </Badge>
                      </div>
                      {template.description && (
                        <p className="text-white/50 text-sm mb-3 line-clamp-2">
                          {template.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3 text-xs text-white/40">
                        <span>{template.prompt_ids.length} prompts</span>
                        <span>•</span>
                        <span>{template.use_count} uses</span>
                        <span>•</span>
                        <span>IDs: {template.prompt_ids.slice(0, 4).join(', ')}{template.prompt_ids.length > 4 ? '...' : ''}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        onClick={() => handleLoadTemplate(template)}
                        className="bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:bg-purple-500/30"
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
                          className="bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
                        >
                          {deletingId === template.id ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Trash2 className="h-3 w-3" />
                          )}
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
    </div>
  );
}
