import React, { useContext } from 'react';
import { ThemeToggle } from "@/components/ThemeToggle";
import Logo from "@/components/Logo";
import Link from 'next/link';
import { Button } from './ui/button';
import { useRouter } from 'next/router';
import { AuthContext } from './AuthProvider';
import Profile from './Profile';

interface NavbarProps {
	logoHeading?: string;
}

const NavBar = ({ logoHeading = 'PayPals' }: NavbarProps) => {
	const { pathname } = useRouter();
	const auth = useContext(AuthContext);

	if (!auth) {
		throw new Error('NavBar must be used within an AuthProvider');
	}

	const { store: { isAuthenticated } } = auth;

	return (
		<nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
			<div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Logo />
					<span className="text-lg md:text-xl font-bold text-foreground">{logoHeading}</span>
				</div>
				<div className="flex items-center gap-2 md:gap-4">
					<ThemeToggle />
					{pathname === '/' && (
						<>
							<Link href="/login">
								<Button variant="ghost" size="sm" className="text-sm md:text-base">Log in</Button>
							</Link>
							<Link href="/signup">
								<Button size="sm" className="bg-gradient-hero text-sm md:text-base">Sign up</Button>
							</Link>
						</>
					)}
					{isAuthenticated && <Profile />}
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
