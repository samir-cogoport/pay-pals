import React, { useContext } from 'react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { AuthContext } from './AuthProvider';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Button } from './ui/button';
import { useClientAuth } from '@/hooks/use-client-auth';

const Profile = () => {
	const auth = useContext(AuthContext);
  const handleAuth = useClientAuth()

	if (!auth) {
		throw new Error('Profile must be used within an AuthProvider');
	}

	const { store: { profile }, dispatch } = auth;

	if (!profile) {
		return null;
	}

	const initials = profile.name
		.trim()
		.split(/\s+/)
		.map((segment) => segment.charAt(0).toUpperCase())
		.slice(0, 2)
		.join('') || profile.email.charAt(0).toUpperCase();

	const handleLogout = () => {
    handleAuth('')
	};

	return (
		<div>
			<Popover>
				<PopoverTrigger asChild>
					<Avatar className="h-7 w-7 md:h-8 md:w-8 hover:cursor-pointer">
						<AvatarFallback className="bg-primary text-primary-foreground text-xs md:text-sm">
							{initials}
						</AvatarFallback>
					</Avatar>
				</PopoverTrigger>
				<PopoverContent className="w-52 mr-4 mt-2">
					<div className="grid gap-3">
						<div className="space-y-1">
							<h4 className="leading-none font-medium text-foreground">{profile.name}</h4>
							<p className="text-muted-foreground text-sm">{profile.email}</p>
						</div>
						<Button variant="outline" size="sm" onClick={handleLogout}>
							Log out
						</Button>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default Profile;
