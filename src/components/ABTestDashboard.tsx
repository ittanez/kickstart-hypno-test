import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, Users, Target } from 'lucide-react';

// Composant pour afficher les résultats A/B en dev mode
const ABTestDashboard = () => {
  const [abResults, setABResults] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Afficher uniquement en mode développement
    if (import.meta.env.DEV) {
      // Simuler des données A/B pour demo
      const mockResults = [
        {
          testName: 'hero_title',
          variantA: {
            name: 'Suis-je hypnotisable ?',
            impressions: 1250,
            clicks: 156,
            conversions: 23,
            conversionRate: 14.7
          },
          variantB: {
            name: 'Découvrez votre potentiel hypnotique',
            impressions: 1180,
            clicks: 189,
            conversions: 31,
            conversionRate: 16.4
          },
          winner: 'B',
          confidence: 87
        },
        {
          testName: 'cta_text',
          variantA: {
            name: 'Test Gratuit',
            impressions: 1190,
            clicks: 142,
            conversions: 19,
            conversionRate: 13.4
          },
          variantB: {
            name: 'Commencer le Test',
            impressions: 1240,
            clicks: 203,
            conversions: 35,
            conversionRate: 17.2
          },
          winner: 'B',
          confidence: 92
        }
      ];
      
      setABResults(mockResults);
    }
  }, []);

  if (!import.meta.env.DEV || !isVisible) {
    return (
      <div className="fixed bottom-20 right-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          variant="outline"
          size="sm"
          className="bg-white/90 backdrop-blur-sm"
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          A/B Tests
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 right-4 z-50 w-96 max-h-96 overflow-y-auto">
      <Card className="bg-white/95 backdrop-blur-sm border-2 border-blue-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg">A/B Tests Live</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="h-6 w-6 p-0"
            >
              ×
            </Button>
          </div>
          <CardDescription>
            🧪 Tests actifs - Optimisation conversions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {abResults.map((test, index) => (
            <div key={index} className="border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm">{test.testName}</h4>
                <Badge variant={test.winner === 'B' ? 'default' : 'secondary'}>
                  {test.winner === 'B' ? 'B Gagne' : 'A Gagne'}
                </Badge>
              </div>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Version A:</span>
                  <div className="flex items-center gap-2">
                    <span>{test.variantA.conversionRate}%</span>
                    <span className="text-gray-500">({test.variantA.conversions}/{test.variantA.clicks})</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Version B:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{test.variantB.conversionRate}%</span>
                    <span className="text-gray-500">({test.variantB.conversions}/{test.variantB.clicks})</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-1 border-t">
                  <span className="text-blue-600">Confiance:</span>
                  <span className="font-semibold">{test.confidence}%</span>
                </div>
              </div>
            </div>
          ))}
          
          <div className="pt-2 border-t text-xs text-gray-500">
            💡 Dashboard visible uniquement en développement
            <br />📊 En production, données dans Google Analytics
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ABTestDashboard;