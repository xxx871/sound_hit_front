import { APIserver } from "@/vitest-setup";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { errorPasswordResetHandlers, passwordResetHandlers } from "./passwordResetMock";
import { render, screen, waitFor } from "@testing-library/react";
import PasswordReset from "@/app/password/page";
import userEvent from "@testing-library/user-event";

describe('パスワードリセットページ', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    APIserver.resetHandlers();
    APIserver.use(...passwordResetHandlers);
  });

  test("パスワードリセットフォームが表示されている", async () => {
    render(<PasswordReset />);
    expect(screen.getByRole('heading', { name: 'パスワードリセット申請' })).toBeInTheDocument();
    expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'フォーム送信' })).toBeInTheDocument();
  });

  test("パスワードリセットフォームが正しく送信される", async () => {
    render(<PasswordReset />);
    const emailInput = screen.getByLabelText('メールアドレス');
    const submitButton = screen.getByRole('button', { name: 'フォーム送信' });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('パスワードリセット申請が完了しました。')).toBeInTheDocument();
    });
  });

  test("無効なメールアドレスでフォームを送信するとエラーメッセージが表示される", async () => {
    render(<PasswordReset />);
    const emailInput = screen.getByLabelText('メールアドレス');
    const submitButton = screen.getByRole('button', { name: 'フォーム送信' });

    await userEvent.type(emailInput, "example");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('※適切なメールアドレスを入力してください。')).toBeInTheDocument();
    });
  });

  test("登録されていないメールアドレスでフォームを送信するとエラーメッセージが表示される", async () => {
    render(<PasswordReset />);
    const emailInput = screen.getByLabelText('メールアドレス');
    const submitButton = screen.getByRole('button', { name: 'フォーム送信' });

    await userEvent.type(emailInput, "example@example.com");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("メールアドレス 'example@example.com' のユーザーが見つかりません。")).toBeInTheDocument();
    });
  });

  test("APIエラー時にエラーメッセージが表示される", async () => {
    APIserver.use(errorPasswordResetHandlers);

    render(<PasswordReset />);
    const emailInput = screen.getByLabelText('メールアドレス');
    const submitButton = screen.getByRole('button', { name: 'フォーム送信' });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("サーバーエラーが発生しました。")).toBeInTheDocument();
    });
  });
});