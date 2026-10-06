"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/Label";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { HorizontalRule } from "@/components/HorizontalRule";
import { Link } from "@/components/Link";
import { useAuth } from "@/contexts/AuthProvider";
import * as styles from "./LoginPage.css.js";

function LoginPage() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { user, login } = useAuth();

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = values;
    login(
      { email, password },
      {
        onSuccess: () => {
          router.push("/me");
        },
      },
    );
  }

  useEffect(() => {
    if (user) {
      router.push("/me");
    }
  }, [user, router]);

  return (
    <>
      <h1 className={styles.heading}>로그인</h1>
      <form onSubmit={handleSubmit}>
        <Label className={styles.label} htmlFor="email">
          이메일
        </Label>
        <Input
          id="email"
          className={styles.input}
          name="email"
          type="email"
          placeholder="이메일"
          value={values.email}
          onChange={handleChange}
        />
        <Label className={styles.label} htmlFor="password">
          비밀번호
        </Label>
        <Input
          id="password"
          className={styles.input}
          name="password"
          type="password"
          placeholder="비밀번호"
          value={values.password}
          onChange={handleChange}
        />
        <Button className={styles.button}>로그인</Button>
        <HorizontalRule className={styles.horizontalRule}>또는</HorizontalRule>
        <Button
          className={styles.googleButton}
          appearance="outline"
          as="a"
          href="/api/auth/google"
        >
          <img src="/assets/google.svg" alt="Google" />
          구글로 시작하기
        </Button>
        <div>
          회원이 아니신가요? <Link href="/register">회원가입하기</Link>
        </div>
      </form>
    </>
  );
}

export default LoginPage;
