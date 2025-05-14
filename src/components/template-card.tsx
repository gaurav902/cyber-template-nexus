
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Eye, Star, ArrowRight } from 'lucide-react';
import { Template } from '@/types/templates';

interface TemplateCardProps {
  template: Template;
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Link to={`/templates/${template.id}`}>
      <div className="cyber-card group h-full flex flex-col">
        <div className="relative">
          <div className="aspect-video rounded-t-lg overflow-hidden">
            <img 
              src={template.thumbnail} 
              alt={template.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <Badge variant="secondary" className="bg-cyber-dark/80 backdrop-blur-sm text-neon-purple flex gap-1 items-center">
              <Eye size={12} /> {template.views}
            </Badge>
            <Badge variant="secondary" className="bg-cyber-dark/80 backdrop-blur-sm text-neon-green flex gap-1 items-center">
              <Star size={12} /> {template.rating}
            </Badge>
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <span className="text-xs text-muted-foreground">
            {template.category_name || 'Uncategorized'}
          </span>
          <h3 className="font-orbitron font-medium mt-1 group-hover:text-neon-blue transition-colors">
            {template.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {template.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {template.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs px-1.5 py-0 border-cyber-border">
                {tag}
              </Badge>
            ))}
            {template.tags.length > 3 && (
              <Badge variant="outline" className="text-xs px-1.5 py-0 border-cyber-border">
                +{template.tags.length - 3}
              </Badge>
            )}
          </div>
          <div className="mt-auto pt-4 flex items-center text-xs text-muted-foreground justify-between">
            <span>
              {new Date(template.created_at).toLocaleDateString()}
            </span>
            <span className="text-neon-blue flex items-center group-hover:translate-x-0.5 transition-transform">
              View <ArrowRight size={12} className="ml-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
