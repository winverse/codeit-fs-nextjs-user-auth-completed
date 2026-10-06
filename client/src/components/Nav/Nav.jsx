"use client";

import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/Button";
import { Link } from "@/components/Link";
import { useAuth } from "@/contexts/AuthProvider";
import * as styles from "./Nav.css.js";

export function PublicNav() {
  return (
    <header className={styles.container}>
      <nav className={`${styles.nav} ${styles.publicNav}`}>
        <Link href="/">
          <img className={styles.logo} src="/assets/logo.svg" alt="logo" />
        </Link>
      </nav>
    </header>
  );
}

function Nav() {
  const { user, logout } = useAuth();

  return (
    <header className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/">
          <img className={styles.logo} src="/assets/logo.svg" alt="logo" />
        </Link>
        <div className={styles.menu}>
          {user ? (
            <>
              {user.name}
              <Avatar src={user.avatar} size="small" />
              <div className={styles.divider} />
              <Button appearance="secondary" onClick={() => logout()}>
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Button as={Link} appearance="secondary" href="/login">
                로그인
              </Button>
              <Button as={Link} href="/register">
                회원가입
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Nav;
