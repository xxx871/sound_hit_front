import { APIserver, mockRedirect } from "@/vitest-setup";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Profile from "@/app/profile/page";
import { errorProfileHandlers, setupProfileMock } from "@/test/mocks/userDataMock";

describe('プロフィールページ', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    APIserver.resetHandlers();
  });

  test("ログインしていない場合、ログインページにリダイレクトされる", async () => {
    APIserver.use(setupProfileMock("notLoggedIn"));
    render(await Profile());
    await waitFor(() => {
      expect(mockRedirect).toHaveBeenCalledWith("/login");
    });
  });

  test("APIエラー時にログインページにリダイレクトされる", async () => {
    APIserver.use(errorProfileHandlers);
    render(await Profile());
    await waitFor(() => {
      expect(mockRedirect).toHaveBeenCalledWith("/login");
    });
  });

  test("ユーザー情報が正しく表示される", async () => {
    APIserver.use(setupProfileMock("full"));
    render(await Profile());

    await waitFor(() => {
      expect(screen.getByText("プロフィール")).toBeInTheDocument();
      expect(screen.getByText("名前：test")).toBeInTheDocument();
      expect(screen.getByText("性別：男性")).toBeInTheDocument();
      expect(screen.getByText("音域高：ラ#5 (932 Hz)")).toBeInTheDocument();
      expect(screen.getByText("音域低：ド#3 (138 Hz)")).toBeInTheDocument();
      expect(screen.getByText("スコア")).toBeInTheDocument();
      expect(screen.getByText("モード：")).toBeInTheDocument();
      expect(screen.getByText("通常")).toBeInTheDocument();
      expect(screen.getByText("難易度：")).toBeInTheDocument();
      expect(screen.getByText("簡単")).toBeInTheDocument();
      expect(screen.getByText("スコア：")).toBeInTheDocument();
      expect(screen.getByText("4")).toBeInTheDocument();
    });
  });

  test("編集ボタンが正しく表示される", async () => {
    APIserver.use(setupProfileMock("full"));
    render(await Profile());

    await waitFor(() => {
      const editButton = screen.getByRole("link", { name: "編集" });
      expect(editButton).toBeInTheDocument();
      expect(editButton).toHaveAttribute("href", "/profile/edit");
    });
  });
});