"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api";
import { Label } from "@/components/Label";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { HorizontalRule } from "@/components/HorizontalRule";
import { Link } from "@/components/Link";
import { useToaster } from "@/contexts/ToasterProvider";
import { useAuth } from "@/contexts/AuthProvider";
import * as styles from "./RegisterPage.css.js";

function RegisterPage() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const router = useRouter();
  const toast = useToaster();
  const { user, login } = useAuth();

  const registerMutation = useMutation({
    mutationFn: (newUser) => register(newUser),
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (values.password !== values.passwordRepeat) {
      toast("warn", "비밀번호가 일치하지 않습니다.");
      return;
    }
    const { name, email, password } = values;
    registerMutation.mutate(
      { name, email, password },
      {
        onSuccess: () => {
          login(
            { email, password },
            {
              onSuccess: () => {
                router.push("/me");
              },
            },
          );
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
      <h1 className={styles.heading}>회원가입</h1>
      <Button
        className={styles.googleButton}
        appearance="outline"
        as="a"
        href="/api/auth/google"
      >
        <img src="/assets/google.svg" alt="Google" />
        구글로 시작하기
      </Button>
      <HorizontalRule className={styles.horizontalRule}>또는</HorizontalRule>
      <form onSubmit={handleSubmit}>
        <Label className={styles.label} htmlFor="name">
          이름
        </Label>
        <Input
          id="name"
          className={styles.input}
          name="name"
          type="text"
          placeholder="김링크"
          value={values.name}
          onChange={handleChange}
        />
        <Label className={styles.label} htmlFor="email">
          이메일
        </Label>
        <Input
          id="email"
          className={styles.input}
          name="email"
          type="email"
          placeholder="example@email.com"
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
        <Label className={styles.label} htmlFor="passwordRepeat">
          비밀번호 확인
        </Label>
        <Input
          id="passwordRepeat"
          className={styles.input}
          name="passwordRepeat"
          type="password"
          placeholder="비밀번호 확인"
          value={values.passwordRepeat}
          onChange={handleChange}
        />
        <Button className={styles.button}>회원가입</Button>
        <div>
          이미 회원이신가요? <Link href="/login">로그인하기</Link>
        </div>
      </form>
    </>
  );
}

export default RegisterPage;
