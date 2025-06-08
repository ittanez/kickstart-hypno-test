import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCcw, X } from 'lucide-react';

type RestoreProgressProps = {
  onRestore: () => void;
  onDismiss: () => void;
  savedAnswersCount: number;
};

const RestoreProgress = ({ onRestore, onDismiss, savedAnswersCount }: RestoreProgressProps) => {
  return (
    <Card className="mx-auto max-w-md mb-6 border-hypno-accent/20 bg-hypno-accent/5">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RotateCcw className="h-5 w-5 text-hypno-accent" />
            <CardTitle className="text-lg">Reprendre le test</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          Nous avons trouvé une session précédente avec {savedAnswersCount} réponse{savedAnswersCount > 1 ? 's' : ''} sauvegardée{savedAnswersCount > 1 ? 's' : ''}.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex gap-2">
          <Button 
            onClick={onRestore} 
            className="flex-1 bg-hypno-accent hover:bg-hypno-primary"
          >
            Reprendre
          </Button>
          <Button 
            variant="outline" 
            onClick={onDismiss}
            className="flex-1"
          >
            Recommencer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RestoreProgress;