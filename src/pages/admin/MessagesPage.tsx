
import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Search, Mail, Eye, Trash2, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Type definition for contact messages
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  department?: string;
  created_at: string;
  read: boolean;
}

const MessagesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('contact');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Fetch contact messages
  const { data: contactMessages = [], isLoading: isContactMessagesLoading } = useQuery({
    queryKey: ['contactMessages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data as ContactMessage[];
    }
  });
  
  // Mark message as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: async (messageId: string) => {
      const { error } = await supabase
        .from('contact_messages')
        .update({ read: true })
        .eq('id', messageId);
        
      if (error) throw error;
      return messageId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactMessages'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to mark message as read: ${error.message}`,
        variant: "destructive",
      });
    }
  });
  
  // Delete message mutation
  const deleteMessageMutation = useMutation({
    mutationFn: async (messageId: string) => {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', messageId);
        
      if (error) throw error;
      return messageId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactMessages'] });
      toast({
        title: "Message deleted",
        description: "The message has been permanently removed.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete message: ${error.message}`,
        variant: "destructive",
      });
    }
  });
  
  // View message handler
  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setIsViewDialogOpen(true);
    
    // Mark as read if not already read
    if (!message.read) {
      markAsReadMutation.mutate(message.id);
    }
  };
  
  // Delete message handler
  const handleDeleteMessage = (messageId: string) => {
    if (window.confirm('Are you sure you want to delete this message? This action cannot be undone.')) {
      deleteMessageMutation.mutate(messageId);
    }
  };
  
  // Filter messages based on search query
  const filteredContactMessages = contactMessages.filter(message => {
    const searchRegex = new RegExp(searchQuery, 'i');
    return searchRegex.test(message.name) || 
      searchRegex.test(message.email) || 
      searchRegex.test(message.subject) ||
      searchRegex.test(message.message);
  });
  
  // Count unread messages
  const unreadCount = contactMessages.filter(message => !message.read).length;
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };
  
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-orbitron text-2xl font-bold">Messages</h1>
          <p className="text-muted-foreground">
            Manage messages from your visitors
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full border-b border-cyber-border rounded-none p-0">
            <TabsTrigger value="contact" className="relative py-4">
              Contact Form Messages
              {unreadCount > 0 && (
                <Badge className="absolute top-2 right-2 bg-neon-blue text-xs h-5 min-w-5 flex items-center justify-center">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="connect" className="py-4">
              Connect Form Messages
            </TabsTrigger>
          </TabsList>
          
          <div className="cyber-panel p-4 mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search messages..."
                className="pl-9 bg-cyber-light border-cyber-border"
              />
            </div>
          </div>
          
          <TabsContent value="contact" className="mt-4">
            <div className="cyber-panel">
              {isContactMessagesLoading ? (
                <div className="flex items-center justify-center p-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-neon-blue"></div>
                </div>
              ) : filteredContactMessages.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-cyber-light/50">
                      <tr>
                        <th className="text-left py-3 px-4 text-xs font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-xs font-medium">From</th>
                        <th className="text-left py-3 px-4 text-xs font-medium">Subject</th>
                        <th className="text-left py-3 px-4 text-xs font-medium">Department</th>
                        <th className="text-left py-3 px-4 text-xs font-medium">Received</th>
                        <th className="text-right py-3 px-4 text-xs font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cyber-border">
                      {filteredContactMessages.map((message) => (
                        <tr 
                          key={message.id} 
                          className={message.read ? '' : 'bg-cyber-light/10'}
                        >
                          <td className="py-3 px-4">
                            <span className={`inline-block w-2 h-2 rounded-full ${
                              message.read ? 'bg-muted-foreground' : 'bg-neon-blue'
                            }`}></span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium">{message.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {message.email}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium">{message.subject}</div>
                            <div className="text-xs text-muted-foreground truncate max-w-xs">
                              {message.message.substring(0, 60)}
                              {message.message.length > 60 ? '...' : ''}
                            </div>
                          </td>
                          <td className="py-3 px-4 capitalize">
                            {message.department || 'General'}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {formatDate(message.created_at)}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 w-8 p-0 border-cyber-border hover:border-neon-blue"
                                onClick={() => handleViewMessage(message)}
                              >
                                <span className="sr-only">View</span>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 w-8 p-0 border-cyber-border hover:border-neon-red text-neon-red hover:text-white"
                                onClick={() => handleDeleteMessage(message.id)}
                              >
                                <span className="sr-only">Delete</span>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    {searchQuery 
                      ? `No messages found matching "${searchQuery}".` 
                      : 'No contact form messages yet.'}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="connect" className="mt-4">
            <div className="cyber-panel p-8 text-center">
              <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Messages from the Connect page form will appear here.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Message Details</DialogTitle>
            </DialogHeader>
            
            {selectedMessage && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-1">From</p>
                    <p>{selectedMessage.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Email</p>
                    <p className="break-all">{selectedMessage.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Subject</p>
                    <p>{selectedMessage.subject}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Received</p>
                    <p>{formatDate(selectedMessage.created_at)}</p>
                  </div>
                </div>
                
                {selectedMessage.department && (
                  <div>
                    <p className="text-sm font-medium mb-1">Department</p>
                    <p className="capitalize">{selectedMessage.department}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-sm font-medium mb-1">Message</p>
                  <div className="cyber-panel bg-cyber-light/10 p-4 rounded whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`;
                    }}
                  >
                    Reply by Email
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => {
                      handleDeleteMessage(selectedMessage.id);
                      setIsViewDialogOpen(false);
                    }}
                  >
                    Delete Message
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default MessagesPage;
