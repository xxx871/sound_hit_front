import { http, HttpResponse } from "msw";

export const passwordResetHandlers = [
  http.post("/auth/password", async ({ request }) => {
    const { email } = await request.json() as { email: string };
    if (email === "test@example.com") {
      return HttpResponse.json({ status: 200, message: "パスワードリセット申請が完了しました。" });
    } else {
      return HttpResponse.json({ errors: [`メールアドレス '${email}' のユーザーが見つかりません。`] }, { status: 400 });
    }
  })
];

export const errorPasswordResetHandlers = http.post("/auth/password", () => {
  return HttpResponse.json({ status: "error", message: "サーバーエラーが発生しました。" }, { status: 500 });
});