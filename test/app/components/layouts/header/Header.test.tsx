import Header from "@/app/components/layouts/Header/Header";
import { getUserSession } from "@/lib/session";
import { modeHandlers } from "@/test/mocks/modeMock";
import { errorSessionHandlers, sessionHandlers } from "@/test/mocks/sessionMock";
import { APIserver } from "@/vitest-setup";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { logoutHandlers } from "./logoutMock";

describe('ヘッダー', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    APIserver.resetHandlers();
    APIserver.use(...modeHandlers, ...sessionHandlers, ...logoutHandlers);
  });

  test("ログインしていない場合、正しいリンクとボタンが表示される", async () => {
    APIserver.use(errorSessionHandlers);
    render(await Header());

    expect(await screen.findByText("おんぴしゃ")).toBeInTheDocument();
    expect(screen.getByText("遊び方")).toBeInTheDocument();
    expect(screen.getByText("ランキング")).toBeInTheDocument();
    expect(screen.getByText("ログイン")).toBeInTheDocument();
    expect(screen.queryByText("プロフィール")).not.toBeInTheDocument();
    expect(screen.queryByText("ログアウト")).not.toBeInTheDocument();
  });

  test("ログインしている場合、正しいリンクとボタンが表示される", async () => {
    render(await Header());

    expect(screen.getByText("おんぴしゃ")).toBeInTheDocument();
    expect(screen.getByText("遊び方")).toBeInTheDocument();
    expect(screen.getByText("ランキング")).toBeInTheDocument();
    expect(screen.getByText("プロフィール")).toBeInTheDocument();
    expect(screen.getByText("ログアウト")).toBeInTheDocument();
    expect(screen.queryByText("ログイン")).not.toBeInTheDocument();
  });

  test("'遊び方'ボタンをクリックするとモーダルが開く", async () => {
    render(await Header());

    await userEvent.click(screen.getByText("遊び方"));

    expect(screen.getByText("通常")).toBeInTheDocument();
    expect(screen.getByText("ハモり")).toBeInTheDocument();
    expect(screen.getByText("練習")).toBeInTheDocument();
  });

  test("'遊び方'モーダルで'通常'ボタンをクリックすると通常モードの説明が開く", async () => {
    render(await Header());
    await userEvent.click(screen.getByText("遊び方"));
    expect(screen.getByText("通常")).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: '通常' }));
    expect(screen.getByText("通常モード(選択画面)")).toBeInTheDocument();
  });

  test("'遊び方'モーダルで'ハモり'ボタンをクリックするとハモりモードの説明が開く", async () => {
    render(await Header());
    await userEvent.click(screen.getByText("遊び方"));
    expect(screen.getByText("ハモり")).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'ハモり' }));
    expect(screen.getByText("ハモりモード")).toBeInTheDocument();
  });

  test("'遊び方'モーダルで'練習'ボタンをクリックすると練習モードの説明が開く", async () => {
    render(await Header());
    await userEvent.click(screen.getByText("遊び方"));
    expect(screen.getByText("練習")).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: '練習' }));
    expect(screen.getByText("練習モード")).toBeInTheDocument();
  });

  test("ログアウトボタンをクリックするとログアウト処理が実行され、ログインボタンが表示される", async () => {
    render(await Header());
    const logoutButton = screen.getByRole('button', { name: 'ログアウト' });
    expect(logoutButton).toBeInTheDocument();

    await userEvent.click(logoutButton);

    await waitFor(() => {
      expect(screen.getByText("ログアウト")).toBeInTheDocument();
    });

    APIserver.use(errorSessionHandlers);
    render(await Header());
    await waitFor(() => {
      expect(screen.getByText("ログイン")).toBeInTheDocument();
    });
  });

  test("ヘッダーロゴをクリックするとホームページに遷移する", async () => {
    render(await Header());
    expect(screen.getByText("おんぴしゃ")).toHaveAttribute('href', '/');
  });

  test("ランキングリンクをクリックするとランキングページに遷移する", async () => {
    render(await Header());
    expect(screen.getByText("ランキング")).toHaveAttribute('href', "/ranking");
  });

    test("プロフィールリンクをクリックするとプロフィールページに遷移する", async () => {
    render(await Header());
    expect(screen.getByText("プロフィール")).toHaveAttribute('href', "/profile");
  });

    test("ログインボタンをクリックするとログインページに遷移する", async () => {
      APIserver.use(errorSessionHandlers);
    render(await Header());
    expect(screen.getByText("ログイン")).toHaveAttribute('href', "/login");
  });
});