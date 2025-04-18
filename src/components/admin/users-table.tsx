import { useState, useEffect } from "react";
import { Eye, Lock, Unlock } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "customer" | "manager";
  status: "active" | "inactive";
  lastLogin: string;
  avatar: string;
};

export function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call
    const fetchUsers = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setUsers([
            {
              id: 1,
              name: "John Doe",
              email: "john.doe@example.com",
              role: "admin",
              status: "active",
              lastLogin: "2023-04-14 09:23",
              avatar: "/placeholder.svg",
            },
            {
              id: 2,
              name: "Jane Smith",
              email: "jane.smith@example.com",
              role: "customer",
              status: "active",
              lastLogin: "2023-04-13 15:45",
              avatar: "/placeholder.svg",
            },
            {
              id: 3,
              name: "Robert Johnson",
              email: "robert.j@example.com",
              role: "manager",
              status: "active",
              lastLogin: "2023-04-12 11:30",
              avatar: "/placeholder.svg",
            },
            {
              id: 4,
              name: "Emily Davis",
              email: "emily.d@example.com",
              role: "customer",
              status: "inactive",
              lastLogin: "2023-04-10 08:15",
              avatar: "/placeholder.svg",
            },
            {
              id: 5,
              name: "Michael Wilson",
              email: "michael.w@example.com",
              role: "customer",
              status: "active",
              lastLogin: "2023-04-14 14:20",
              avatar: "/placeholder.svg",
            },
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setViewDialogOpen(true);
  };

  const handleToggleStatus = (user: User) => {
    setSelectedUser(user);
    setStatusDialogOpen(true);
  };

  const handleConfirmStatusChange = async () => {
    if (!selectedUser) return;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, this would be an API call to update the user status
      const newStatus =
        selectedUser.status === "active" ? "inactive" : "active";
      setUsers(
        users.map((u) => {
          if (u.id === selectedUser.id) {
            return { ...u, status: newStatus as User["status"] };
          }
          return u;
        })
      );

      toast({
        title: "User status updated",
        description: `${selectedUser.name}'s account is now ${newStatus}.`,
      });

      setStatusDialogOpen(false);
    } catch (error) {
      console.error("Error updating user status:", error);
      toast({
        title: "Error",
        description: "Failed to update user status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getRoleBadge = (role: User["role"]) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-500">Admin</Badge>;
      case "manager":
        return <Badge className="bg-blue-500">Manager</Badge>;
      case "customer":
        return <Badge variant="outline">Customer</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="text-start">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">View and manage user accounts.</p>
      </div>
      <div className="rounded-md border">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"></div>
            <p className="mt-2 text-sm text-muted-foreground">
              Loading users...
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                        />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "active" ? "default" : "secondary"
                      }
                    >
                      {user.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="default"
                        size="icon"
                        onClick={() => handleViewUser(user)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View {user.name}</span>
                      </Button>
                      <Button
                        variant="default"
                        size="icon"
                        onClick={() => handleToggleStatus(user)}
                      >
                        {user.status === "active" ? (
                          <Lock className="h-4 w-4" />
                        ) : (
                          <Unlock className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {user.status === "active" ? "Deactivate" : "Activate"}{" "}
                          {user.name}
                        </span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* View User Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="sm:max-w-[450px]">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>
                Detailed information about the user.
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4 py-2">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={selectedUser.avatar || "/placeholder.svg"}
                      alt={selectedUser.name}
                    />
                    <AvatarFallback>
                      {selectedUser.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">{selectedUser.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedUser.email}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Role</p>
                    <p className="capitalize">{selectedUser.role}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <p className="capitalize">{selectedUser.status}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Last Login</p>
                    <p>{selectedUser.lastLogin}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">User ID</p>
                    <p>#{selectedUser.id}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Toggle Status Dialog */}
        <AlertDialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {selectedUser?.status === "active" ? "Deactivate" : "Activate"}{" "}
                User Account
              </AlertDialogTitle>
              <AlertDialogDescription>
                {selectedUser?.status === "active"
                  ? `This will prevent ${selectedUser?.name} from accessing their account. They will not be able to log in until the account is reactivated.`
                  : `This will restore ${selectedUser?.name}'s access to their account. They will be able to log in again.`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmStatusChange}>
                {selectedUser?.status === "active" ? "Deactivate" : "Activate"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
