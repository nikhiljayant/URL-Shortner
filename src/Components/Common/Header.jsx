import React from "react";
// Dependency
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  return (
    <nav className="py-4 flex justify-between items-center">
      <Link to="/">
        <img src="/logo.png" className="h-16" alt="Logo" />
      </Link>

      <div>
        {/* <Button onClick={() => navigate("/auth")}>Login</Button> */}

        <DropdownMenu>
          <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>NJ</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Nikhil Jayant</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LinkIcon className="mr-2 w-4 h-4" />
              My Links
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-400">
              <LogOut className="mr-2 w-4 h-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Header;
