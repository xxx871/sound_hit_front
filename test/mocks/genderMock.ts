import { http, HttpResponse } from "msw";

const genders = [
  { id: 1, name: "男性" },
  { id: 2, name: "女性" },
];

export const genderHandlers = http.get("/genders", () => {
  return HttpResponse.json(genders, { status: 200 });
});