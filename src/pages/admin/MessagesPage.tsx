
import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow, TableHeader, TableHead, TableBody, Table } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Trash2, Mail, Search, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  getContactMessages, 
  markMessageAsRead, 
  deleteMessage, 
  ContactMessage 
} from '@/services/contact';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const MessagesPage = () => {
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['contact-messages'],
    queryFn: getContactMessages
  });

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => markMessageAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
      toast({
        title: "Message marked as read",
        description: "The message has been marked as read."
      });
    }
  });

  const deleteMessageMutation = useMutation({
    mutationFn: (id: string) => deleteMessage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
      toast({
        title: "Message Deleted",
        description: "The message has been deleted successfully."
      });
      if (isViewDialogOpen) {
        setIsViewDialogOpen(false);
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      });
    }
  });

  const handleViewMessage = async (message: ContactMessage) => {
    setSelectedMessage(message);
    setIsViewDialogOpen(true);
    
    // Mark as read if it wasn't read before
    if (!message.read && message.id) {
      markAsReadMutation.mutate(message.id);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      deleteMessageMutation.mutate(id);
    }
  };

  const filteredMessages = messages.filter((message) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      message.name.toLowerCase().includes(searchLower) ||
      message.email.toLowerCase().includes(searchLower) ||
      message.subject.toLowerCase().includes(searchLower) ||
      message.message.toLowerCase().includes(searchLower) ||
      (message.department && message.department.toLowerCase().includes(searchLower))
    );
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground">
            Manage contact messages from users.
          </p>
        </div>

        <div className="cyber-panel p-4">
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

        <div className="cyber-panel">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-neon-blue border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-4">Loading messages...</p>
              </div>
            </div>
          ) : filteredMessages.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-cyber-border hover:bg-transparent">
                    <TableHead>From</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMessages.map((message) => (
                    <TableRow key={message.id} className="border-cyber-border">
                      <TableCell>
                        <div className="font-medium">{message.name}</div>
                        <div className="text-sm text-muted-foreground">{message.email}</div>
                      </TableCell>
                      <TableCell>{message.department || "General"}</TableCell>
                      <TableCell>{message.subject}</TableCell>
                      <TableCell>{message.created_at && formatDate(message.created_at)}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={message.read 
                            ? 'bg-gray-500/20 text-gray-400 border-gray-800' 
                            : 'bg-green-500/20 text-green-400 border-green-800'}
                        >
                          {message.read ? 'Read' : 'New'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 text-muted-foreground"
                          onClick={() => handleViewMessage(message)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 text-muted-foreground hover:text-red-500"
                          onClick={() => message.id && handleDeleteMessage(message.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No messages found.</p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject}</DialogTitle>
            <DialogDescription>
              From: {selectedMessage?.name} &lt;{selectedMessage?.email}&gt;
              {selectedMessage?.department && <div>Department: {selectedMessage.department}</div>}
              <div>Received: {selectedMessage?.created_at && formatDate(selectedMessage.created_at)}</div>
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 p-4 bg-cyber-light/30 rounded-md whitespace-pre-wrap max-h-[300px] overflow-auto">
            {selectedMessage?.message}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsViewDialogOpen(false)}
            >
              Close
            </Button>
            <Button 
              variant="destructive"
              onClick={() => selectedMessage?.id && handleDeleteMessage(selectedMessage.id)}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default MessagesPage;
