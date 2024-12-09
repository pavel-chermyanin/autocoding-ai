import { NextResponse } from "next/server";
import { OPEN_QUESTION_BASE_URL } from "@/fsd/core/global.constants";

export async function GET(req) {
  const url = new URL(req.url); // Получаем URL запроса
  const targetUrl = `${OPEN_QUESTION_BASE_URL}${url.pathname.replace(
    "/api/open-question-proxy",
    ""
  )}`; // Формируем URL для прокси

  try {
    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        ...req.headers,
        "Content-Type": "application/json",
        "Accept-Language": "ru",
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Ошибка прокси:", error.message);
    return NextResponse.json(
      { error: "Ошибка сервера-прокси" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const url = new URL(req.url);
  // console.log(url)
  const targetUrl = `${OPEN_QUESTION_BASE_URL}${url.pathname.replace(
    "/api/open-question-proxy",
    ""
  )}`;

  // console.log(111)
  try {
    const body = await req.json(); // Читаем тело запроса
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        ...req.headers,
        "Content-Type": "application/json",
        "Accept-Language": "ru",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Ошибка прокси:", error.message);
    return NextResponse.json(
      { error: "Ошибка сервера-прокси" },
      { status: 500 }
    );
  }
}
