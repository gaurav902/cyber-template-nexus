
import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Mail, Eye, Trash, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  department: string | null;
  created_at: string;
  read: boolean;
}

const MessagesPage = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch messages
  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: 'Error',
        description: 'Failed to load messages.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Mark message as read
  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ read: true })
        .eq('id', id);

      if (error) throw error;

      // Update messages in state
      setMessages((prev) =>
        prev.map((message) =>
          message.id === id ? { ...message, read: true } : message
        )
      );
    } catch (error) {
      console.error('Error marking message as read:', error);
      toast({
        title: 'Error',
        description: 'Failed to update message status.',
        variant: 'destructive',
      });
    }
  };

  // Delete message
  const deleteMessage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Remove message from state
      setMessages((prev) => prev.filter((message) => message.id !== id));
      
      toast({
        title: 'Success',
        description: 'Message deleted successfully.',
      });
    } catch (error) {
      console.error('Error deleting message:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete message.',
        variant: 'destructive',
      });
    }
  };

  // View message
  const viewMessage = async (message: Message) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);
    
    // Mark as read if not already
    if (!message.read) {
      await markAsRead(message.id);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-orbitron font-bold mb-2">Contact Messages</h1>
            <p className="text-muted-foreground">
              View and manage messages from the contact forms.
            </p>
          </div>
          <Button 
            className="flex items-center gap-2" 
            onClick={fetchMessages}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        
        <div className="cyber-card p-6">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="h-16 w-16 mx-auto text-muted-foreground opacity-30 mb-4" />
              <h3 className="text-xl font-medium mb-2">No messages yet</h3>
              <p className="text-muted-foreground">
                {isLoading 
                  ? 'Loading messages...' 
                  : 'When users submit the contact form, their messages will appear here.'}
              </p>
            </div>
          ) : (
            <Table>
              <TableCaption>A list of all contact messages.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow key={message.id} className={message.read ? '' : 'bg-muted/20'}>
                    <TableCell>
                      <Badge variant={message.read ? 'outline' : 'default'}>
                        {message.read ? 'Read' : 'New'}
                      </Badge>
                    </TableCell>
                    <TableCell>{message.name}</TableCell>
                    <TableCell>{message.email}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{message.subject}</TableCell>
                    <TableCell>
                      {message.department ? (
                        <Badge variant="secondary">
                          {message.department.charAt(0).toUpperCase() + message.department.slice(1)}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">Not specified</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {message.created_at 
                        ? format(new Date(message.created_at), 'MMM d, yyyy h:mm a')
                        : 'Unknown date'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => viewMessage(message)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => deleteMessage(message.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      {/* Message Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject}</DialogTitle>
            <DialogDescription className="flex gap-2 items-center">
              From: {selectedMessage?.name} 
              <span className="text-muted-foreground">({selectedMessage?.email})</span>
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="mb-4 flex gap-2">
              <Badge variant="outline">
                {selectedMessage?.created_at
                  ? format(new Date(selectedMessage.created_at), 'PPpp')
                  : 'Unknown date'}
              </Badge>
              {selectedMessage?.department && (
                <Badge variant="secondary">
                  {selectedMessage.department.charAt(0).toUpperCase() + selectedMessage.department.slice(1)}
                </Badge>
              )}
            </div>
            <div className="cyber-panel p-4 bg-cyber-light/30 min-h-[100px] whitespace-pre-wrap">
              {selectedMessage?.message}
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="destructive" 
              onClick={() => {
                if (selectedMessage) {
                  deleteMessage(selectedMessage.id);
                  setIsDialogOpen(false);
                }
              }}
            >
              Delete Message
            </Button>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default MessagesPage;
