import { isCurrentUserAdmin, LogOut } from "../actions";
import styles from "./navbar.module.css";

import Link from "next/link";

export default async function Navbar({ session }) {
	const admin = await isCurrentUserAdmin();
	const options = [
		{ href: "/users", label: "Names & Faces" },
		{ href: "/thursdays", label: "Thursdays" },
	];
	return (
		<nav className={styles.navbar}>
			<div className={styles.menu}>
				<Link key={"home"} href="/">
					SIM
				</Link>
			</div>
			<div className={styles.menu}>
				{options.map((option) => (
					<Link key={option.label} href={option.href}>
						{option.label}
					</Link>
				))}
				{admin ? (
					<Link key={"admin"} href={"/admin"}>
						Admin
					</Link>
				) : null}
				<Link key={"profile"} href={`/users/${session.user.username}`}>
					<img src={session.user.image} alt={`${session.user.name}'s Profile`} style={{ borderRadius: "50%" }} />
				</Link>
				<a onClick={LogOut}>
					<img src={"/power.png"} alt={"Sign Out"} style={{ height: "1.5rem" }} />
				</a>
			</div>
		</nav>
	);
}
