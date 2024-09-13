import { http, HttpResponse } from "msw";

export const editProfileHandlers = http.put("/user", async ({ request }) => {
  return HttpResponse.json(request, { status: 200 });
});

export const errorEditProfileHandlers = http.put("/user", () => {
  return HttpResponse.json({ status: "error", message: "Server error" }, { status: 500 });
});