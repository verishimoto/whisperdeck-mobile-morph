import { useState } from 'react';
import { useChainTemplates } from '@/contexts/ChainTemplatesContext';
import { useAuth } from '@/contexts/AuthContext';
import { X, Save, Loader2, Lock, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SaveTemplateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  promptIds: number[];
}

export function SaveTemplateDialog({ isOpen, onClose, promptIds }: SaveTemplateDialogProps) {
  const { createTemplate } = useChainTemplates();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('General');
  const [isPublic, setIsPublic] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: 'Name Required',
        description: 'Please enter a name for your template.',
        variant: 'destructive',
      });
      return;
    }

    if (!user) {
      toast({
        title: 'Sign In Required',
        description: 'Please sign in to save templates.',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    
    const { error } = await createTemplate({
      name: name.trim(),
      description: description.trim() || undefined,
      prompt_ids: promptIds,
      category,
      is_public: isPublic,
    });

    setIsSaving(false);

    if (error) {
      toast({
        title: 'Save Failed',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Template Saved!',
        description: `"${name}" has been saved${isPublic ? ' and shared with the community' : ''}.`,
      });
      onClose();
      setName('');
      setDescription('');
      setCategory('General');
      setIsPublic(false);
    }
  };

  const categories = ['General', 'Coding', 'Analysis', 'Creative', 'Learning', 'Strategy'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative z-10 w-full max-w-md mx-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Save className="h-5 w-5 text-white/70" />
            <h2 className="text-xl font-semibold text-white">Save Template</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
          >
            <X className="h-4 w-4 text-white/70" />
          </button>
        </div>

        {!user ? (
          <div className="text-center py-8">
            <Lock className="h-12 w-12 text-white/30 mx-auto mb-4" />
            <p className="text-white/50 mb-4">Sign in to save templates</p>
            <Button
              onClick={() => window.location.href = '/auth'}
              className="bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:bg-purple-500/30"
            >
              Sign In
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-white/70 mb-2">Template Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My Awesome Chain"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-all"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-2">Description (optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What does this chain help with?"
                rows={2}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:border-white/40 transition-all"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-gray-900">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                {isPublic ? (
                  <Globe className="h-5 w-5 text-green-400" />
                ) : (
                  <Lock className="h-5 w-5 text-white/50" />
                )}
                <div>
                  <p className="text-white text-sm font-medium">
                    {isPublic ? 'Public' : 'Private'}
                  </p>
                  <p className="text-white/50 text-xs">
                    {isPublic ? 'Share with community' : 'Only you can see this'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsPublic(!isPublic)}
                className={`w-12 h-6 rounded-full transition-all ${
                  isPublic ? 'bg-green-500' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    isPublic ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="pt-2">
              <p className="text-white/40 text-xs mb-4">
                Saving {promptIds.length} prompts: #{promptIds.join(', #')}
              </p>
              
              <Button
                type="submit"
                disabled={isSaving || !name.trim()}
                className="w-full bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:bg-purple-500/30 disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Template
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
